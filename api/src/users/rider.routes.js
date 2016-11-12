'use strict';

import { Router } from 'express';

import riderController from './rider.controller';

const riderRouter = Router();

// Middleware needs auth or not (+ middlewares dedicated to these routes)
// router.user(auth);

riderRouter.post('/', riderController.add);
riderRouter.get('/', riderController.getAll);

export default riderRouter;