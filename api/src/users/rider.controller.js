'use strict';

import Rider from './rider.model';

const riderController = {};

riderController.add = () => {
    console.log('Hi! Adding a rider...');
};

riderController.getAll = (req, res) => {
    console.log('Hi! Getting all of the riders...');
    Rider.getAll((rows) => {
        res.json(rows);
    });

    // Load rider model
    /*Rider.getAll(() => {

     });*/
};

export default riderController;