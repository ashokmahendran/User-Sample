var mongoose = require('mongoose');
const Config = require('./config');
var logging = require(Config.PATH+'/log/logging');
var mongoDB =  "mongodb://localhost:27017/Users";
mongoose.connect(mongoDB);
logging.info('DB Connected Successfully with ' + mongoDB);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

module.exports = mongoose;
