'use strict';

import React, {Component} from 'react';
import {GoogleMapLoader, GoogleMap, Marker, SearchBox} from 'react-google-maps';
import '../css/map';

export default class AddressMap extends Component {

    constructor(props) {
        super();
    }

    componentDidMount() {
        function waitForIt() {
            if (!document.querySelectorAll('.undefined').length) {
                window.setTimeout(waitForIt, 100);
            } else {
                const
                    googleSearch = document.querySelector('.undefined'),
                    form = document.querySelector('#new-address');

                googleSearch.classList.add('google-search');
                form.querySelector('#user-address').parentElement.appendChild(googleSearch);
            }
        }

        waitForIt();
    }

    render() {
        let markerRender = [];

        this.props.markers.map((marker) => {
            marker.position.map((pos, index) => {
                markerRender.push(<Marker key={index} position={pos}/>)
            })
        });

        return (
            <section>
                <GoogleMapLoader
                    containerElement={<div className="map"></div>}
                    googleMapElement={
                        <GoogleMap
                            onCenterChanged={this.props.selectLocation}
                            defaultZoom={7}
                            center={{lat: this.props.defaultCenter.lat, lng: this.props.defaultCenter.lon}}>
                            return (
                                {markerRender}
                                <SearchBox
                                    ref="searchBox"
                                    onPlacesChanged={this.props.change.bind(this, this.props)}
                                    controlPosition={google.maps.ControlPosition.TOP_LEFT}
                                    placeholder="Address"
                                />
                            );
                        </GoogleMap>
                    }
                />
            </section>
        );
    }
}