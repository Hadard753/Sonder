import * as express from 'express';
import { getCurrentUser, login, register } from './controller';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/current-user', getCurrentUser);
module.exports = router;