'use strict';

const express = require('express');
const parser = require('body-parser');
const cors = require('cors');
const _ = require('lodash');
const app = express();
const PORT = 3000;

let addresses = require('./mocks/data.json');

app.use(cors());
app.use(parser.json());
app.use('/', express.static(__dirname + '/dist'));

app.get('/addresses', (req, res) => {
    res.json(addresses);
});

app.get('/addresses/:id', (req, res) => {
    let addressId = parseInt(req.params.id),
        matched;

    addresses.forEach((address) => {
        if (address.id === addressId) {
            matched = address;
            console.log(matched);
        }
    });

    if (matched) {
        res.json(matched);
    } else {
        res.status(404).send();
    }
});

app.delete('/addresses/:id', (req, res) => {
    let addressId = parseInt(req.params.id),
        matched;

    addresses.forEach((address) => {
        if (address.id === addressId) {
            matched = address;
        }
    });

    if (matched) {
        addresses = _.without(addresses, matched);
        console.log(addresses);
        res.json(matched);
    } else {
        res.status(404).send();
    }

});

app.post('/addresses', (req, res) => {
    let body = req.body;
    addresses.push(body);
    res.json(body);
});

app.put('/addresses/:id', (req, res) => {
    let
        addressId = parseInt(req.params.id),
        attributes = {},
        body = _.pick(req.body, 'name'),
        matched = _.find(addresses, {id: addressId});

    if (!matched) {
        return res.status(404).send();
    }

    if (body.hasOwnProperty('name')) {
        attributes.name = body.name;
    }

    _.extend(matched, attributes);
    res.json(matched);

});

app.listen(PORT, () => {
    console.log('listening on port ' + PORT);
});