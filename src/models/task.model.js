'user strict';
var dbConn = require('./../../config/db.config');

//Employee object create
var Task = function(task){
    this.name = task.name;
    this.description = task.description;
};
Task.create = function (newTask, result) {
    dbConn.query("INSERT INTO Tasks set ?", newTask, function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            console.log(res.insertId);
            result(null, res.insertId);
        }
    });           
};
Task.findById = function (id, result) {
    dbConn.query("Select * from Tasks where id = ? ", id, function (err, res) {             
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            result(null, res);
        }
    });   
};
Task.findAll = function (result) {
    dbConn.query("Select * from Tasks", function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
            console.log('task : ', res);  
            result(null, res);
        }
    });   
};
Task.update = function (id, task, result) {
    dbConn.query("UPDATE Tasks SET name=?,description=? WHERE id = ?", [task.name, task.description, id], function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }else{   
            result(null, res);
        }
    }); 
};
Task.delete = function(id, result){
     dbConn.query("DELETE FROM Tasks WHERE id = ?", [id], function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
            result(null, res);
        }
    }); 
};

module.exports= Task;