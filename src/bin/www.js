#!/usr/bin/env node

/**
 * Module dependencies.
 */

import app from '../app';
import debugLib from 'debug';
import http from 'http';
import mongoose from 'mongoose'
import redis from 'redis'

const debug = debugLib('your-project-name:server');

/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || '5000');
app.set('port', port);

/**
 * Create HTTP server.
 */

var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

app.listen(port, (req,res) => {
  console.log(`This server is running on port: ${port}`)
})
server.on('error', onError);
server.on('listening', onListening);


//  mongoDB connection
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('mongodb connected')
});

var mongodUri = `mongodb://${process.env.MLAB_USER}:${process.env.MLAB_PASS}${process.env.MLAB_URL}`
mongoose.connect(mongodUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
// end mongoDB connection

// redis connection
const client = redis.createClient();
 
client.on("error", function (err) {
    console.log("Error " + err);
});
 
client.on("connect", runSample);
 
function runSample() {
  // Set a value
  // client.set(`string key`, "Hello World!", function (err, reply) {
  //     console.log(reply);
  // });
  // Get a value
  // client.get("string key", function (err, reply) {
  //     console.log(reply);
  // });

  //   client.del("string key", function (err, reply) {
  //     console.log(reply);
  // });
  // client.hmset("employees", { HR: "Anthony", MIS: " Clint", Accounting: "Mark" });
  // client.hgetall("employees", function(err, object) {
  //   console.log(object.HR);
  // });
  // client.expire(`string key`, 60, function(err, reply) {
  //   console.log(reply);
  // })

  // client.ttl(`string key`, function(err, reply) {
  //   console.log(`err`, err);
  //   console.log(`reply`, reply);
  // })
}
// end redis connection

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
  console.log(`Listening on ${bind}`);
  debug('Listening on ' + bind);
}
