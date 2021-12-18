var express = require ("express");
var Sequelize = require ("sequelize");
var dbConfig = require ("../config/db.config")
var app = express();
app.use(express.json());


const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect : dbConfig.dialect,
    pool : {
    max : dbConfig.pool.max,
    min : dbConfig.pool.min,
    acquire : dbConfig.pool.acquire,
    idle : dbConfig.pool.idle
    }
});

//userTable
let users = sequelize.define('users', {
    userId : {
    primaryKey : true,
    type : Sequelize. INTEGER
    },
    password : Sequelize. STRING,
    role : Sequelize. STRING
    }, {
    timestamps : false,
    freezeTableName : true
    });
/*
    users.sync().then( ( )=>{
    console.log("Table created successfully!");
    })
    .catch( (error)=>{
    console.log(error);
    })
    .finally( ()=>{
    sequelize.close();
    });
    */
    
    app.post('/register', (req, res) =>{
        users.create({
        userId : req.body.userId,
        password : req.body.password,
        role : req.body.role
        })
        .then(()=>{
        res.status (200).send("User Registered successfully!");
        })
        
        .catch( (error)=>{
        console.log(error);
        res.status (400).send(error);
        });
        });
    
        app.post('/login', (req, res)=>{
            
            var userId = req.body.userId ;
            var password = req.body.password;
            var flag=false;
            users.findAll({raw:true})
            .then( (userObj)=>{
                for(var i=0; i<userObj.length; i++) {
                if(userObj[i].userId == req.body.userId  && userObj[i].password ==  req.body.password)
                    {
                        console.log("User Valid " );
                        flag = true;
                        break;
                    }
            }
        })
        if(flag==true){
            console.log("Valid User!");
            res.status (200).send("Valid user!");
        }
        else{
            console.log("invalid User");
            res.status (401).send("invalid user");
            }
        })
    app.listen(8000,()=>{
        console.log("Hey I'm here at 8090");
    })
    