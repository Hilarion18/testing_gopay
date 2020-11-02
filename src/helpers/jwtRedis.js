import redis from 'redis'
import {calculating} from './calculateHour'

const client = redis.createClient();
 
client.on("error", function (err) {
    console.log("Error " + err);
});

class RedisHelper {
    constructor() {
        isExpired = false
    }
    
    static setExpire(req,res,next) {
        client.set(`user_token`, "logged in", function (err, reply) {
            console.log(`set`, reply);
        });

        client.expire(`user_token`, 3600, function(err, reply) {
            console.log(`expire`, reply);
        })
        next()
    }

    static checkExpired(req,res,next) {
        client.ttl(`user_token`, function(err, reply) {
          console.log(`timeleft reply`, reply);
          const timeleft = calculating(reply)
            if (reply < 1) {
                this.isExpired = true
                res.status(401).json({
                    message: `Login session expired, please relogin again`
                })
            } else {
                res.status(200).json({
                    expired: `expired in ${timeleft.min} minutes and ${timeleft.sec} second`
                })
            }
        })
    }

    static removeSession(req,res,next) {
        client.del("user_token", function (err, reply) {
            console.log(reply);
            res.status(200).json({
                expired: `Login session timeout, please relogin again`
            })
        });
    }
}

module.exports = RedisHelper