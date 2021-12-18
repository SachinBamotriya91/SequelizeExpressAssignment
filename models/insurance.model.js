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
//insurance table

let insurance = sequelize.define('insurance', {
    policyNumber : {
    primaryKey : true,
    type : Sequelize.INTEGER
    },
    policyHolderName : Sequelize. STRING,
    policyAmount : Sequelize. INTEGER,
    maturityAmount : Sequelize. INTEGER,
    nominee : Sequelize. STRING
    }, {
    timestamps : false,
    freezeTableName : true
    });
    //creating the table
  /* insurance.sync()
    .then( ()=>{
        console.log("Table created successfully!");
    })
    .catch( (error)=> {
    console.log(error);
    })
    .finally( ( )=>{
    sequelize.close();
    });
    */
    
    app.get("/", function (req, res) {
        console.log("At GET of http://localhost:8001");
        res.send("Hello...");
    })
    
    //Retrieves data ..
    app.get("/getAllPolicies", function (req, res) {
        insurance.findAll({ raw: true })
            .then(data => {
                console.log(data);
                res.status(200).send(data)
            })
            .catch(err => {
                console.error(" error: " + err);
                res.status(400).send(err);
            })
    })
    
 
    app.get("/getPoliciesById/:id", function (req, res) {
        var id=req.params.id;
        insurance.findByPk(id)
            .then(data => {
                console.log(data);
                res.status(200).send(data)
            })
            .catch(err => {
                console.error(" error: " + err);
                res.status(400).send(err);
            })
    })
    
    
    app.post("/insertPolicy", (req, res) => {
        var policyNumber = req.body.policyNumber;
        var policyHolderName = req.body.policyHolderName;
        var policyAmount = req.body.policyAmount;
        var maturityAmount = req.body.maturityAmount;
        var nominee = req.body.nominee;
        
        var policy = insurance.build({
            policyNumber: policyNumber,
            policyHolderName: policyHolderName,
            deppolicyAmountt: policyAmount,
            maturityAmount: maturityAmount,
            nominee:nominee
        })
        policy.save()
            .catch(err => {
                console.log(err);
            })
    
        res.send("Data Inserted ");
    
    })
    
    app.put("/updatePolicy", function (req, res) {
        var policyNumber = req.body.policyNumber;
        var policyHolderName = req.body.policyHolderName;
        var policyAmount = req.body.policyAmount;
        var maturityAmount = req.body.maturityAmount;
        var nominee = req.body.nominee;
        insurance.update(
            {
                policyNumber: policyNumber,
                policyHolderName: policyHolderName,
                deppolicyAmountt: policyAmount,
                maturityAmount: maturityAmount,
                nominee:nominee
            },
            {
                where: { policyNumber: policyNumber }
            }
        )
            .then(data => {
                console.log(data);
                var strmsg = "Record updated successfully..";
                res.status(201).send(strmsg);
            })
            .catch(err => {
                console.error("There is an error updating table : Reason :" + err)
                res.status(400).send(err);
            })
    
    });
    
    
    app.delete("/deletePoliciyByPolicyNum/:pNum", function (req, res) {
        var pNum = req.params.pNum;
        insurance.destroy({ where: { policyNumber: pNum } })
            .then(data => {
                console.log(data);
                var strMsg = "Record deleted successfully...";
                res.status(200).send(strMsg);
            })
    })
        app.listen(8001, () => {
        console.log("Listening at 8001");
    })
    
    
    
    