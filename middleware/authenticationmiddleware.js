const dbConfig = require('../config.js');
const controller=require("../controllers/authenticationcontroller.js");
const Users = require(dbConfig.PATH+'/models/usermodel');
const utilities = require(dbConfig.PATH+'/utilities/utilities');
const _ = require('lodash');

exports.loginDataValidation=(req,res)=>{
    req.assert('password', 'Password is required').notEmpty();  //Validate Firstname  
    req.assert('userid', 'Valid email is required').notEmpty(); //Validate Email/UserID
    let errors = req.validationErrors();
    
    if(errors){  // If errors found return the errors as JSON 
        res.json({'message':errors});
        res.end();
    }
    else{
          //Seperate the required data from the request object
          let userValues=_.pick(req.body,['userid','password']);
          //Encrypt the password
          userValues.password=utilities.encrypt(userValues.password);
          controller.login(req,res,userValues);
    }
}