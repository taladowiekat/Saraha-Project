import {Router} from 'express';
import * as MessageConroller from './message.controller.js';
import auth from '../../middleware/auth.middleware.js';
import { asyncHandler } from '../../utils/errorHandeling.js';

const router = Router();

router.get('/',auth,asyncHandler(MessageConroller.getMessages))

router.post('/:receiverId', asyncHandler(MessageConroller.sendMessage))

export default router ; 