'use strict';

import { Router } from 'express';

import riderController from './rider.controller';

import riderGuardMidd from '../middlewares/riderGuard';

const riderRouter = Router();

// Middlewares dedicated to these routes here

riderRouter.post('/', riderController.create);
riderRouter.get('/', riderGuardMidd, riderController.getAll);

export default riderRouter;
