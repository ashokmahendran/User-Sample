var MongoClient = require('mongodb').MongoClient;
const dbConfig = require('../config.js');
var logging = require(dbConfig.PATH+'/log/logging');
var utilities = require(dbConfig.PATH+'/utilities/utilities');
var Users = require(dbConfig.PATH+'/models/usermodel');
var jwt = require('jsonwebtoken');
exports.login= (req, res)=>{
    logging.info(`Inside Login Function `);
    let id=req.body.userid;
    let password=req.body.password;
    var query = { userid: id,
                  password:utilities.encrypt(password) };
    Users.findOne(query)
    .exec(function(err, result) {
        if (err) throw err;
        if(result){
       if(result.role =='Admin'){
        const path=dbConfig.PATH+ "/view/head.html"
        logging.info(`Inside Index Function Redirect to${path}`);
        res.sendFile(path);
       /* jwt.sign({ userid: req.body.userid }, 'secret', function(err, token) {
            if (err) { return next(err) };
            logging.info('Log In  Successfully with user ID'+req.body.userid);
                var cookie = req.cookies.jwtToken;
                console.log(cookie);
                if (!cookie) {
                  res.cookie('jwtToken', token, { maxAge: 900000, httpOnly: true });
                  const path=dbConfig.PATH+ "/view/head.html"
                  logging.info(`Inside Index Function Redirect to${path}`);
                  res.sendFile(path);
                } 
          });*/
       }
       else {
        const path=dbConfig.PATH+ "/view/user.html"
        logging.info(`Inside Index Function Redirect to${path}`);
        res.sendFile(path);
       }
    }else{
        res.render('login',{message:'Invalid Username/Password'});
       }
      });

}
exports.logout= (req, res)=>{
    /*var token = req.cookies.jwtToken;
    if(token){
      res.clearCookie("jwtToken");
    }*/
    res.redirect('/login');
}