module.exports =(app) =>{
    const controller=require("../controllers/controller.js");
    const auth=require("../controllers/authenticationcontroller.js");
    //Used to redirect to the index page 
    app.get('/', controller.index );
    //Used to redirect to the index page 
    app.get('/add', controller.add );
    // Insert the New User
    app.post('/user', controller.insert);
    //Get the all users data
    app.get('/retrive', controller.getData);
    //To Delete 
    app.get('/delete', controller.delete );
    //Redirect to delete page
    app.get('/deleteIndex', controller.deleteIndex );
      //To Update the existing data
    app.post('/update', controller.update );
    //Redirect to Update Page
    app.get('/updateIndex', controller.updateIndex );
    //To Login 
    app.post('/login',auth.login);
    //T redirect login page
    app.get('/login',controller.index);
    //To Logout 
    app.get('/logout',auth.logout);
}