var crypto = require('crypto'),
    algorithm = 'aes-256-ctr',
password = 'd6F3Efeq';
var jwt = require('jsonwebtoken');
exports.encrypt =(text)=>{
    var cipher = crypto.createCipher('aes-256-cbc','d6F3Efeq')
    var crypted = cipher.update(text,'utf8','hex')
    crypted += cipher.final('hex');
    return crypted;
  }
  
  exports.decrypt = (text)=>{
    var decipher = crypto.createDecipher('aes-256-cbc','d6F3Efeq')
    var dec = decipher.update(text,'hex','utf8')
    dec += decipher.final('utf8');
    return dec;
  }
exports.getUserIdFromReq=(token)=>{
  if(token){
   // verify a token symmetric
     jwt.verify(token, 'secret', function(err, decoded) {
     console.log('Here'+decoded.userid)
     return decoded.userid;
  });
}
}
