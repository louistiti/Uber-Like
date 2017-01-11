'use strict';

import { Router } from 'express';

import { regex } from '../helpers/validator';

import deviceController from './device.controller';

const deviceRouter = Router();

// Middlewares dedicated to these routes here

deviceRouter.patch(`/:uuid(${regex.uuid})`, deviceController.patch);

export default deviceRouter;
