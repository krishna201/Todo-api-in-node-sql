/*  header-comment
/*  file   : models
/*  author : krishna
/*  date   : 2018-2-4 18:56:20
/*  last   : 2018-2-4 18:56:24
*/



var sql = require("mssql");

// config for your database
exports.dbConfig = {
    "user": "sa",
    "password": "krishna",
    "database": "demodb",
    'server': 'localhost\\SQLEXPRESS',
    "dialect": "mssql",
    "port": 1433,
    "dialectOptions": {
        "instanceName": "SQLEXPRESS"
    },

};