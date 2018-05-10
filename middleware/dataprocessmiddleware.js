
const dbConfig = require('../config.js');
const controller=require("../controllers/usercontroller.js");
const Users = require(dbConfig.PATH+'/models/usermodel');
const utilities = require(dbConfig.PATH+'/utilities/utilities');
const _ = require('lodash');

//Validation for Insert data
exports.validationForInsert=(req,res)=>{ 
    let isInsert=true;
    let user=dataValidator(req,res); 
    controller.insert(req,res,user);
}
//Validation for update data 
exports.validationForUpdate=(req,res)=>{
    let user=dataValidator(req,res);  
    controller.update(req,res,user);
}

//This fi=unction is used to validate and return the required values
function dataValidator(req,res,isInsert){
    let user;
    req.assert('firstname', 'Name is required').notEmpty();  //Validate Firstname  
    req.assert('firstname', 'Name is Incorrect').isAlpha();  //Validate Firstname
    //req.assert('userid', 'Valid email is required').isEmail(); //Validate Email
    req.assert('lastname', 'LastName is Incorrect').isAlpha(); //Validate Lastname
    req.assert('phonenumber').notEmpty(); //Validate phonenumber
    req.assert('phonenumber').isNumeric(); //Validate phonenumber
    req.assert('age').isNumeric(); //Validate age
    let errors = req.validationErrors();
    if(errors){  // If errors found return the errors,
        res.json({'message':errors});
        res.end();
        return;
    }
    else{
          //Seperate the required data from the request object
          let userValues=_.pick(req.body,['userid','firstname','lastname','phonenumber','password','role','age']);
          //encrypt the password
          if(isInsert){
          userValues.password=utilities.encrypt(userValues.password);
          }
          //Assign the value to the User Mongo Schema
          user = new Users(userValues);
          return user;
    }
   
}