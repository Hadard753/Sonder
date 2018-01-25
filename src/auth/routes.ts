import * as express from 'express';
import { getCurrentUser, login } from './controller';

const router = express.Router();

router.get('/current-user', getCurrentUser);
router.post('/login', login);

module.exports = router;