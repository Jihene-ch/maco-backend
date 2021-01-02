var mysql = require('mysql');
const express = require('express');
var app = express();
const bodyparser= require('body-parser');

app.use(bodyparser.json());

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: 'root',
    password: "",
    database: "maco",
    multipleStatements: true
})

connection.connect(function(err) {
    if (err) throw err;
    console.log("mysql connected");
})

module.exports = connection;
app.listen(3000,()=> console.log('Express server is unning on 3000'));

//Get all users
app.get('/users',(req,res)=>{
    connection.query('SELECT * FROM Person',(err,rows,fields)=>{
        if(!err)
        res.send(rows);
        else console.log(err);
    })
}
);

//Get one user
app.get('/users/:id',(req,res)=>{
    connection.query('SELECT * FROM Person WHERE personID= ?',[req.params.id],(err,rows,fields)=>{
        if(!err)
        res.send(rows);
        else console.log(err);
    })
}
);

//Delete user (try with postman later)
app.delete('/users/:id',(req,res)=>{
    connection.query('DELETE FROM Person WHERE personID= ?',[req.params.id],(err,rows,fields)=>{
        if(!err)
        res.send('Deleted successfully');
        else console.log(err);
    })
}
);

//Insert a user
app.post('/users', (req, res) => {
    let per = req.body;
    var sql = "SET @personID = ?;SET @lastName = ?;SET @firstName = ?;SET @email=?;SET @password =?;SET @status = ?; \
    CALL personAddorEdit(@personID,@lastName,@firsttName,@email,@password,@status);";
    mysqlConnection.query(sql, [per.personID, per.lastName,per.firstName, per.email, per.password, per.status], (err, rows, fields) => {
        if (!err)
            rows.forEach(element => {
                if(element.constructor == Array)
                res.send('Inserted personid : '+element[0].personID);
            });
        else
            console.log(err);
    })
});

//Update a user
app.put('/users', (req, res) => {
    let per = req.body;
    var sql = "SET @personID = ?;SET @lastName = ?;SET @firstName = ?;SET @email=?;SET @password =?;SET @status = ?; \
    CALL personAddorEdit(@personID,@lastName,@firsttName,@email,@password,@status);";
    mysqlConnection.query(sql, [per.personID, per.lastName,per.firstName, per.email, per.password, per.status], (err, rows, fields) => {
        if (!err)
        res.send('Updated successfully');
        else
            console.log(err);
    })
});