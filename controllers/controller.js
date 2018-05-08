

const dbConfig = require('../config.js');
var logging = require(dbConfig.PATH+'/log/logging');
var utilities = require(dbConfig.PATH+'/utilities/utilities');
var Users = require(dbConfig.PATH+'/models/usermodel');
var formidable = require('formidable');
var fs = require('fs');

exports.insert = (req, res, next) => {
    logging.info('Inside Insert Function');
    console.log(req.photo);
   new Promise(function(resolve,reject){
    var user = new Users(
        {
            userid:req.body.userid,
            firstname:req.body.firstname,
            lastname:req.body.lastname,
            password:utilities.encrypt(req.body.password),
            age:req.body.age,
            phonenumber:req.body.phonenumber,
            role:req.body.role
        });
        resolve(user);
   }).then((user)=>{
        user.save(function (err) {
        if (err) { return next(err); }
        logging.info('Inside Insert Function'+JSON.stringify(user));
        res.json({'message':'Inserted Successfully'});
    });
   });
};

exports.index = (req, res) => {
    res.render('login');
};

exports.add = (req, res) => {
    logging.info(`Inside Index Function Redirect to index.pug`);
    res.render('index');
};

exports.getData = (req, res) => {
    logging.info('Inside getData Function');
    Users.find()
      .exec(function (err, user) {
        if (err) { return next(err); }
        //Successful, 
        res.render('dataview', { title: 'User List', user_list: user });
      });
};

/*exports.updateIndex = (req, res) => {
    let results;
    var id;
    logging.info(`Inside updateIndex Function Redirect `);
    new Promise(function(resolve,reject){
         id=utilities.getUserIdFromReq(req.cookies.jwtToken);
        resolve(id);
    }).then((id)=>{
        console.log(id);
        var query = { userid: id };
        Users.find(query)
        .exec(function(err, result) {
        results=result;
        if (err) throw err;
        logging.info('Inside Update Function'+JSON.stringify(result)); 
        res.render('update', { title: 'User Update', Results : results.firstname} );
      });
    })
};*/
exports.updateIndex = (req, res) => {
    logging.info(`Inside updateIndex Function Redirect `);
        var query = { userid: 'aspire@123' };
        Users.findOne(query)
        .exec(function(err, result) {
        
        if (err) throw err;
        logging.info('Inside Update Function'+JSON.stringify(result)); 
        res.render('update', { title: 'User Update', users : result} );
      });
 
};
exports.deleteIndex = (req, res) => {

    Users.find()
      .exec(function (err, user) {
        if (err) { return next(err); }
        console.log(user);
        logging.info(`Inside deleteIndex Function Redirect to delete.pug page`);
        res.render('delete',{title:'User Delete Enter User Id to Delete'});
      });
    
    
};

exports.delete = (req, res) => {
    let userid=req.query.userid;
    console.log(userid);
    var obj={
        userid:req.query.userid
    }
        Users.remove(obj, function(err) {
          if (err) throw err;
          logging.info( req.query.userid+'User Detail Deleted successfully');
          res.json({"message": "Deleted Successfully ."});
        });
       
};

exports.update = (req, res) => {
    var myquery = { userid: req.body.userid};
    var newvalues = {
        $set:{
        firstname:req.body.firstname,
        lastname:req.body.lastname,
        password:req.body.password,
        age:req.body.age,
        age:req.body.phonenumber
        }
    }
    Users.updateOne(myquery, newvalues, function(err, re) {
      if (err) throw err;
      logging.info('User Detail Updated successfully'+JSON.stringify(myquery));
      res.json({"message": "Updated Successfully ."});
    });
  
}
