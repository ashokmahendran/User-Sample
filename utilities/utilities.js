var crypto = require('crypto'),
    algorithm = 'aes-256-ctr',
password = 'd6F3Efeq';
// Function used to encrypt the password
exports.encrypt =(text)=>{
    var cipher = crypto.createCipher('aes-256-cbc','d6F3Efeq')
    var crypted = cipher.update(text,'utf8','hex')
    crypted += cipher.final('hex');
    return crypted;
  }
  // Function used to decrypt the password
  exports.decrypt = (text)=>{
    var decipher = crypto.createDecipher('aes-256-cbc','d6F3Efeq')
    var dec = decipher.update(text,'hex','utf8')
    dec += decipher.final('utf8');
    return dec;
  }

