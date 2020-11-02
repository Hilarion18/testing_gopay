import express from 'express';
import UserRoute from './userRoute'
import PaymentRoute from './paymentRoute'
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  res.status(200).json({
    message: `index page`
  })
});
router.use('/profile', UserRoute)
router.use('/payment', PaymentRoute)

export default router;