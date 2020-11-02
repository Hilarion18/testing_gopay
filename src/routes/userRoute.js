
import express from 'express';
import { getUser, register, login, fillBio } from '../controllers/userController'
import { validateEmail } from '../middleware/validateEmail'
import { setExpire, checkExpired, removeSession } from '../middleware/jwtRedis'
const router = express.Router();

router.get('/', getUser);
router.get('/check-session', checkExpired);
router.post('/clear-session', removeSession);
router.post('/register', validateEmail, setExpire, register);
router.post('/login', validateEmail, setExpire, login);
// router.post('/', fillBio);


export default router
