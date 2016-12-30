'use strict';

import { Router } from 'express';

import riderController from './rider.controller';

const riderRouter = Router();

// Middlewares dedicated to these routes here

riderRouter.post('/', riderController.add);
riderRouter.post('/authenticate', riderController.authenticate);
riderRouter.get('/', riderController.getAll);

export default riderRouter;
