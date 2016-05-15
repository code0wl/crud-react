'use strict';

import React, {Component} from 'react';
import {render} from 'react-dom';
import AddressEditForm from '../../address-form/js/AddressEditForm';
import AddressForm from '../../address-form/js/AddressForm';
import AddressList from '../../address-list/js/AddressList';
import AddressMap from '../../address-map/js/AddressMap';
import ModalMenu from '../../modal-menu/js/ModalMenu';
import '../../../styles/main';
import '../css/modal';
import 'whatwg-fetch';
import '../../model/model';

export default class AdressPlotComponent extends Component {

    constructor(props) {
        super();

        fetchModel().then((response) => {
            this.loadApp(response);
        });

        this.state = {
            users: [],
            markers: [],
            userView: true,
            listView: false,
            defaultCenterMap: {lat: 52.3702, lon: 4.8952}
        };

        this.editForm = this.editForm.bind(this);
        this.setListView = this.setListView.bind(this);
        this.setUserView = this.setUserView.bind(this);
        this.closeDialog = this.closeDialog.bind(this);
        this.selectLocation = this.selectLocation.bind(this);
        this.submit = this.submit.bind(this);
        this.cancel = this.cancel.bind(this);
        this.loadApp = this.loadApp.bind(this);
        this.removeAddress = this.removeAddress.bind(this);
    };

    loadApp(data) {
        console.log('app ready');
        window.addressModel = data;

        this.setState({
            users: window.addressModel,
            markers: [{
                position: window.addressModel.reduce((acc, value, i) => {
                    let gPos = new google.maps.LatLng(value.position.lat, value.position.lon);
                    acc.push(gPos);
                    return acc;
                }, [])
            }]
        })
    }

    selectLocation(e) {
        if (e) {
            const
                currentTarget = e.currentTarget,
                coors = currentTarget.querySelector('[data-coors]').getAttribute('data-coors').split(','),
                lists = [].slice.call(currentTarget.parentElement.querySelectorAll('li'));

            lists.map((list) => {
                list.classList.remove('item-selected');
            });

            currentTarget.classList.add('item-selected');

            this.setState({
                defaultCenterMap: coors.reduce((acc) => {
                    acc.lat = Number(coors[1]);
                    acc.lon = Number(coors[0]);
                    return acc;
                }, {})
            });
        }
    }

    editForm(element) {
        let id = element.target.id;
        console.log(id)
    }

    removeAddress(element) {

        let id = element.target.id;

        fetch('/addresses/' + id, {
            method: 'DELETE',
            mode: 'cors',
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }).then(() => {
            fetchModel().then((response) => {
                this.loadApp(response);
            });
        });
    }

    updateModel(model) {
        fetch('/addresses/', {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify(model),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }).then(() => {
            fetchModel().then((response) => {
                this.loadApp(response);
            });
        });
    }

    onPlacesChanged() {
        window.userLocationBuffer = this.refs.searchBox.getPlaces();
    }

    closeDialog() {
        alert('Removes dialog, Feature not implemented yet');
    }

    submit(e) {
        e.preventDefault();
        if (window.userLocationBuffer !== undefined) {
            let
                d = document,
                buffer = window.userLocationBuffer[0],
                lat = buffer.geometry.location.lat(),
                lon = buffer.geometry.location.lng(),
                newUser = {
                    id: window.addressModel.length,
                    name: {
                        first: d.querySelector('#user-firstname').value,
                        last: d.querySelector('#user-lastname').value
                    },
                    position: {lat, lon},
                    picture: 'http://lorempixel.com/40/40/',
                    type: d.querySelector('#user-type').value,
                    address: buffer.formatted_address
                };

            this.updateModel(newUser);

            d.querySelector('#new-address').reset();
            d.querySelector('.google-search').value = '';
        }
    }

    cancel(e) {
        e.preventDefault();
        this.setState({
            userView: false,
            listView: false
        });
    }

    setListView() {
        this.setState({
            userView: false,
            listView: true
        });
    }

    setUserView() {
        this.setState({
            userView: true,
            listView: false
        })
    }

    render() {

        let inView = this.state.userView ? 'user-view-focussed' : 'user-list-focussed';

        return (
            <div className="modal-container">
                <div className="modal">
                    <div className="grid-row">
                        <div className="col-4-12--sm">
                            <div className={inView}>

                                 <ModalMenu setUserView={this.setUserView} setListView={this.setListView} closeDialog={this.closeDialog} count={this.state.users.length}  />

                                <AddressForm
                                    submit={this.submit}
                                    cancel={this.cancel}
                                    modalTitle="Add a new user"
                                />

                                <AddressList
                                    editForm={this.editForm}
                                    setLoc={this.selectLocation}
                                    removeAddress={this.removeAddress}
                                    users={this.state.users}
                                    modalTitle="Addresses"
                                />

                                <AddressEditForm
                                    modalTitle="Edit Address"
                                />

                            </div>
                        </div>
                        <AddressMap
                            markers={this.state.markers}
                            selectLocation={this.selectLocation}
                            change={this.onPlacesChanged}
                            users={this.state.users}
                            defaultCenter={this.state.defaultCenterMap}
                        />
                    </div>
                </div>
            </div>
        );
    }
}
