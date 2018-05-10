module.exports =(app) =>{
  
    const controller=require("../controllers/usercontroller.js");
    var middleware = require('../middleware/dataprocessmiddleware');
    const authmiddleware=require("../middleware/authenticationmiddleware");
    const auth=require("../controllers/authenticationcontroller");
    const flow=require("../controllers/flowcontroller.js");

    //Used to redirect to the index page 
    app.get('/', flow.index );
    //Used to redirect to the index page 
    app.get('/add', flow.add );
    // Insert the New User
    app.post('/user', middleware.validationForInsert);
    //Get the all users data
    app.get('/retrive', controller.getData);
    //To Delete 
    app.get('/delete', controller.delete );
    //Redirect to delete page
    app.get('/deleteIndex', flow.deleteIndex );
    //To Update the existing data
    app.post('/update', middleware.validationForUpdate );
    //Redirect to Update Page
    app.get('/updateIndex', flow.updateIndex );
    //To Login data validation 
    app.post('/login',authmiddleware.loginDataValidation);
    //T redirect login page
    app.get('/login',flow.index);
    //To Logout 
    app.get('/logout',auth.logout);
    //Redirect to Admin Home Page
    app.get('/adminhome', flow.adminhome);
    //Redirect to User Home Page
    app.get('/userhome', flow.userhome);
}