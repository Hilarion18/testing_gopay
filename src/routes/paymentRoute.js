
import express from 'express';
import { payProduct } from '../controllers/paymentController'
const router = express.Router();

router.post('/', payProduct);


export default router
