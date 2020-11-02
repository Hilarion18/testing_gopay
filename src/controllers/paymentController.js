import User from '../models/user.js'
import Juice from '../models/juice'

class PaymentController {
  static getUser(req,res) {
    User.find({})
    .then((data) => {
      res.status(200).json({
        data,
        message: `get user`
      })
    })
    .catch((err) => {
      res.status(500).json({
        err,
        message: `data failure to get`
      })
    })
  }

  static payProduct(req,res) {
      
  }

}

module.exports = PaymentController