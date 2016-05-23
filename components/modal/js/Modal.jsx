'use strict';

import React, {Component} from 'react';
import {render} from 'react-dom';
import AddressEditForm from '../../address-form/js/AddressEditForm';
import AddressForm from '../../address-form/js/AddressForm';
import AddressList from '../../address-list/js/AddressList';
import AddressMap from '../../address-map/js/AddressMap';
import ModalMenu from '../../modal-menu/js/ModalMenu';
import '../../../styles/main';
import 'whatwg-fetch';
import { createStore } from 'redux';
import '../../model/model';
import NotificationSystem from 'react-notification-system';
import '../css/modal';

export default class AdressPlotComponent extends Component {

    constructor(props) {
        super();

        fetchModel().then((response) => {
            let data = loadApp(response);
            this.setState({
                users: data.users,
                markers: data.markers,
            });
        });

        this.state = {
            users: [],
            markers: [],
            inView: 'user-list-focussed',
            inEdit: false,
            defaultCenterMap: {lat: 52.3702, lon: 4.8952}
        }

        this.editUser = this.editUser.bind(this);
        this.setListView = this.setListView.bind(this);
        this.setUserView = this.setUserView.bind(this);
        this.selectLocation = this.selectLocation.bind(this);
        this.submit = this.submit.bind(this);
        this.setEditView = this.setEditView.bind(this);
        this.cancel = this.cancel.bind(this);
        this.removeAddress = this.removeAddress.bind(this);
        this.addNotification = this.addNotification.bind(this);
        this.notificationSystem = null;

    };

    addNotification() {
        this.notificationSystem.addNotification({
            message: `user was added successfully`,
            level: 'success'
        });
    }

    componentDidMount() {
        this.notificationSystem = this.refs.notificationSystem;
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

    editUser(e) {
        e.preventDefault();

        if (window.userLocationBuffer !== undefined) {
            let
                d = document,
                buffer = window.userLocationBuffer[0],
                lat = buffer.geometry.location.lat(),
                lon = buffer.geometry.location.lng(),
                user = {
                    name: {
                        first: d.querySelector('#edit-address #user-firstname').value,
                        last: d.querySelector('#edit-address #user-lastname').value
                    },
                    position: {lat, lon},
                    type: d.querySelector('#edit-address #user-type').value,
                    address: buffer.formatted_address
                };

            this.updateModel(`/addresses/${this.state.inEdit[0].id}`, 'PUT', user);

            d.querySelector('#edit-address').reset();
            d.querySelector('.google-search').value = '';

        }
    };

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
                let data = loadApp(response);
                this.setState({
                    users: data.users,
                    markers: data.markers,
                });
            });
        });
    }

    updateModel(url, method, data) {
        fetch(url, {
            method,
            mode: 'cors',
            body: JSON.stringify(data),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }).then(() => {
            fetchModel().then((response) => {
                let data = loadApp(response);
                this.setState({
                    users: data.users,
                    markers: data.markers,
                });
            });
        });
    }

    onPlacesChanged() {
        window.userLocationBuffer = this.refs.searchBox.getPlaces();
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

            this.updateModel('/addresses/', 'POST', newUser);

            d.querySelector('#new-address').reset();
            d.querySelector('.google-search').value = '';

            this.addNotification();
        }
    }

    cancel(e) {
        e.preventDefault();
        this.setState({ inView: 'user-list-focussed' });
    }

    setListView() {
        this.setState({ inView: 'user-list-focussed' });
    }

    setEditView(e) {
        //refactor
        const googleSearch = document.querySelector('.google-search');
        document.querySelector('#edit-address #user-address').parentElement.appendChild(googleSearch);

        let p = new Promise(resolve => {
            resolve(this.state.users.filter(x => x.id == e.target.id))
        });

        p.then((data) => {
            this.setState({
                inView: 'user-edit-focussed',
                inEdit: data
            });
        });
    }

    setUserView() {
        //refactor
        const googleSearch = document.querySelector('.google-search');
        document.querySelector('#user-address').parentElement.appendChild(googleSearch);

        this.setState({
            inView: 'user-view-focussed'
        })
    }

    render() {

        return (
            <div className="modal-container">
                <div className="modal">
                    <div className="grid-row">
                        <div className="col-4-12--sm">

                            <div className={this.state.inView}>

                                <ModalMenu
                                    setUserView={this.setUserView}
                                    setListView={this.setListView}
                                    count={this.state.users.length}
                                />
                                <AddressForm
                                    submit={this.submit}
                                    cancel={this.cancel}
                                    modalTitle="Add a new user"
                                />

                                <AddressList
                                    setEditView={this.setEditView}
                                    setLoc={this.selectLocation}
                                    removeAddress={this.removeAddress}
                                    users={this.state.users}
                                    modalTitle="Addresses"
                                />

                                <AddressEditForm
                                    modalTitle="Edit Address"
                                    cancel={this.cancel}
                                    submit={this.editUser}
                                    credentials={this.state.inEdit}
                                />

                            </div>
                        </div>

                        <NotificationSystem ref="notificationSystem" />

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
