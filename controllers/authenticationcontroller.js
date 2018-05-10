const dbConfig = require('../config.js');
const logging = require(dbConfig.PATH+'/log/logging');
const Users = require(dbConfig.PATH+'/models/usermodel');
const jwt = require('jsonwebtoken');

// This function used to check the entered user id exist or not
exports.login= (req, res,userData)=>{
    logging.info(`Inside Login Function `);
    console.log(userData);
    Users.findOne(userData)
    .exec(function(err, result) {
        if (err) throw err;
            if(result){  
                    //create token with user id of user
                    jwt.sign({ userid: userData.userid }, 'secret', function(err, token) {
                        if (err) { return next(err) };
                            logging.info('Log In  Successfully with user ID'+req.body.userid);
                            var cookie = req.cookies.jwtToken;
                                if (!cookie) {
                                    //Send the token with the response cookies
                                    res.cookie('jwtToken', token, { maxAge: 900000, httpOnly: true });
                                        if(result.role =='Admin'){
                                            res.redirect('/adminhome');
                                        }
                                        else {
                                            res.redirect('/userhome');
                                        }
                                } 
                    });
            }else{
                res.render('login',{message:'Invalid Username/Password'});
            }
      });

}
//This method used to logout and clear the token in the response cookies
exports.logout= (req, res)=>{
    var token = req.cookies.jwtToken;
        if(token){
            //Clear the cookies
            res.clearCookie("jwtToken");
        }
    res.redirect('/login');
}