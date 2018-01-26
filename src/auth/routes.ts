import * as express from 'express';
import { getCurrentUser, login, register } from './controller';
import {isAuthenticate} from './middleware';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/current', isAuthenticate, getCurrentUser);

module.exports = router;