const dbConfig = require('../config.js');
const logging = require(dbConfig.PATH+'/log/logging');
const utilities = require(dbConfig.PATH+'/utilities/utilities');
const Users = require(dbConfig.PATH+'/models/usermodel');
const jwt = require('jsonwebtoken');

//This function is used to redirect to the login page
exports.index = (req, res) => {
    res.render('login');
};

//This function is used to redirect to the admin home page
exports.adminhome=(req, res)=>{
    const path=dbConfig.PATH+ "/view/head.html"
    logging.info(`Inside Index Function Redirect to${path}`);
    res.sendFile(path);
}

//This function is used to redirect to the user home page
exports.userhome=(req, res)=>{
    const path=dbConfig.PATH+ "/view/user.html"
    logging.info(`Inside Index Function Redirect to${path}`);
    res.sendFile(path);
}

//This function is used to redirect to the index add page
exports.add = (req, res) => {
    logging.info(`Inside Index Function Redirect to index.pug`);
    res.render('index');
}

//This function is used to redirect to the update page
exports.updateIndex = (req, res) => {
    logging.info(`Inside updateIndex Function Redirect `);
    let token = req.cookies.jwtToken;
    let userid;
    if(token){
        // verify a token symmetric
          jwt.verify(token, 'secret', function(err, decoded) {
          userid=decoded.userid;
       });
        var query = { userid:userid  };
        Users.findOne(query)
        .exec(function(err, result) {
        if (err) throw err;
        logging.info('Inside Update Function'+JSON.stringify(result)); 
        res.render('update', { title: 'User Update', users : result} );
      });
    }
}

//This function is used to redirect to the delete page
exports.deleteIndex = (req, res) => {
    Users.find()
      .exec(function (err, user) {
        if (err) { return next(err); }
        console.log(user);
        logging.info(`Inside deleteIndex Function Redirect to delete.pug page`);
        res.render('delete',{title:'User Delete Enter User Id to Delete'});
      });
}
