'use strict';

import { Router } from 'express';

import authController from './auth.controller';

const authRouter = Router();

authRouter.post('/token', authController.post);

export default authRouter;
