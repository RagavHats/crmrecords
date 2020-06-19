const router = require('express').Router();
let mysql  = require('mysql');
let config = require('../config.js');
let connection = mysql.createConnection(config);
var bcrypt = require('bcrypt');
const saltRounds = 10;

// ADDING A NEW USER WITH PASSWORD WAS ENCRYPTED (hash)
router.route('/add').post((req,res) =>{
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const email = req.body.email;
    const password = req.body.password;

    bcrypt.hash(password, saltRounds, function(err, hash) {
        // Store hash in your password DB.
        // insert statment
        let sql = `INSERT INTO users (firstname,lastname,email , password)
                VALUES('${firstname}','${lastname}','${email}','${hash}')`;
        // execute the insert statment
        connection.query(sql);
        res.send('user added')
    });

});

///Validation for login with hash password ....

router.route('/login').post((req,res) =>{
    const email = req.body.email;
    const password = req.body.password;
    if (email && password) {

        
        connection.query('SELECT * FROM users WHERE email = ?', [email], async function(error, results, fields) {

            let user = results[0];
            const match = await bcrypt.compare(password, user.password);
            
                if(match) {
                    //login
                    res.send('sucess');
                }else{
                    res.send('Incorrect Username and/or Password!');
                }

        });
    } else {
        res.send('Please enter Username and Password!');
    }

   
});



// pagination ..

router.route('/categories/:id/:condition').post((req,res) =>{
        //To calculate Total Count use MySQL count function
    var id = req.params.id;
    var condition = req.params.condition;
    var orderCondition ='';
    if(condition === "categoriesname")
    {
        orderCondition = "categories.categoriesname";
    }else if(condition === "projectname")
    {
        orderCondition = "projects.projectname";
    }else if(condition === "username"){
        orderCondition = "users.email";
    }
    
    var startlimt =id;
    
    var query = "SELECT projects.projectname , users.email , categories.categoriesname FROM users INNER JOIN projects ON projects.user_id = users.user_id "+
                "LEFT JOIN categories  on categories.project_id = projects.project_id"+
                " Order By "+orderCondition+" ASC limit "+ startlimt +",2"; 
    connection.query(query, async function(error, results, fields) {
        let user = results;
        res.send(user)
    });
});








module.exports = router;