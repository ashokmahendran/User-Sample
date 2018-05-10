
const dbConfig = require('../config.js');
const logging = require(dbConfig.PATH+'/log/logging');
const utilities = require(dbConfig.PATH+'/utilities/utilities');
const Users = require(dbConfig.PATH+'/models/usermodel');


//This function used to insert the data into the UserModel
exports.insert = (req, res,user) => {
    logging.info('Inside Insert Function');
    user.save(function (err) {
        if (err) { 
            user.password=utilities.decrypt(user.password);
            logging.error('Insert Failed'+err.message);
            res.render('index', { users:user,message: err.message });
            return;
        }    
            logging.info('Inside Insert Function'+JSON.stringify(user));
            res.json({'message':'Inserted Successfully'});
    });

};

//This function is used to retrive the data from UserModel
exports.getData = (req, res) => {
    logging.info('Inside getData Function');
    Users.find()
      .exec(function (err, user) {
            if (err) { return next(err); }
            res.render('dataview', { title: 'User List', user_list: user });
      });
};

//This function is used to delete the data from the UserModel
exports.delete = (req, res) => {
    let userid=req.query.userid;
    var obj={
        userid:req.query.userid
        }
    Users.remove(obj, function(err) {
          if (err) throw err;
            logging.info( req.query.userid+'User Detail Deleted successfully');
            res.json({"message": "Deleted Successfully ."});
        });
       
};
//This Function is used to Update the in the UserModel 
exports.update = (req, res,user) => {
    let myquery = { userid: user.userid};
    console.log(myquery);
    let newvalues = {
        $set:{
        firstname:user.firstname,
        lastname:user.lastname,
        password:user.password,
        age:user.age,
        phonenumber:user.phonenumber
        }
    }
    Users.updateOne(myquery, newvalues, function(err, result) {
      if (err) throw err;
      logging.info('User Detail Updated successfully'+JSON.stringify(myquery));
      res.json({"message": "Updated Successfully ."});
    });
  
}
