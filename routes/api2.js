/*  header-comment
/*  file   : api2
/*  author : krishna
/*  date   : 2018-2-4 18:56:10
/*  last   : 2018-2-5 1:35:33
*/



var express = require('express');
var router = express.Router();
var user = require('../config/models');
var sql = require("mssql");




////==============================================
/// ===get all data==

router.get('/get_all_data', function(req, res) {

    sql.close();
    sql.connect(user.dbConfig, function(err) {
        if (err) console.log(err);

        // create Request object
        var request = new sql.Request();

        // query to the database and get the records
        request.query("select * from Users", function(err, finaldata) {
            if (err) console.log(err);


            res.send(finaldata.recordsets);
            console.log(finaldata.recordsets);

        });
    });


})

/// add data ====================================

router.get('/add_data', function(req, res) {
    console.log(req.query);
    var name = req.query.name;
    var email = req.query.email;

    sql.close();
    sql.connect(user.dbConfig, function(err) {
        if (err) console.log(err);

        // create Request object
        var request = new sql.Request();

        var adddetail = "INSERT INTO Users(name, email) VALUES ('" + name + "','" + email + "')";

        // query to the database and get the records
        request.query(adddetail, function(err, finaldata) {
            if (err) console.log(err);

            // send records as a response
            console.log(finaldata);
            // res.send(finaldata);
            // console.log(finaldata.rowsAffected[0]);
            if (finaldata.rowsAffected[0] == 1) {
                request.query("select * from Users", function(err, finaldata) {
                    if (err) console.log(err);

                    res.send(finaldata.recordsets);
                    console.log(finaldata.recordsets);
                });
            }


        });
    });

})

//=====delete data========================

router.get('/delete_data', function(req, res) {


        var userid = req.query.userid;

        sql.close();
        sql.connect(user.dbConfig, function(err) {
            if (err) console.log(err);

            // create Request object
            var request = new sql.Request();

            var adddetail = "DELETE FROM Users where userid ='" + userid + "'";

            // query to the database and get the records
            request.query(adddetail, function(err, finaldata) {
                if (err) console.log(err);

                // send records as a response

                res.send(finaldata);

            });
        });


    })
    ///===========================edit data================

router.get('/update_data', function(req, res) {

    var userid = req.query.userid;
    var name = req.query.name;
    var email = req.query.email

    sql.close();
    sql.connect(user.dbConfig, function(err) {
        if (err) console.log(err);

        // create Request object
        var request = new sql.Request();

        var adddetail = "UPDATE  Users SET name  ='" + name + "',email  ='" + email + "' where userid ='" + userid + "'";

        // query to the database and get the records
        request.query(adddetail, function(err, finaldata) {
            if (err) console.log(err);


            res.send(finaldata);

        });
    });

})

router.post('/uploadimage', function(req, res) {
    console.log(req.files);
    let sampleFile = req.files.file;
    console.log(sampleFile);
    let name = Date.now();
    console.log(name)
    sampleFile.mv(`uploads/${name}.jpg`, function(err) {
        if (err) return res.status(500).send(err);


        res.json({
            success: 1,
            msg: "File uploaded!"
        });
    });

})








module.exports = router;