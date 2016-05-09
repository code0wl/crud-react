'use strict';

import React from 'react';
import {render} from 'react-dom';
import AddressPlotComponent from './components/modal/js/Modal.jsx';

initComponent();

function initComponent() {
    const component = document.querySelector('.address-plotmap-component');
    render(<AddressPlotComponent/>, component);
}

