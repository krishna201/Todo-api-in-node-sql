/*  header-comment
/*  file   : app
/*  author : krishna
/*  date   : 2018-2-4 18:56:49
/*  last   : 2018-2-5 1:5:11
*/


/**
 * Module dependencies.
 */
var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var methodOverride = require('method-override');
var morgan = require('morgan');
var fileUpload = require('express-fileupload');
var example = require('./config/models');
var cors = require('cors');


var port = process.env.PORT || 8088;
var app = express();


app.use(cors());


// Configuration
app.use(fileUpload());
app.use(express.static(__dirname + '/public'));

app.use(cookieParser());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ 'extended': 'true' }));
app.use(bodyParser.json());

app.use(methodOverride());






// Routes

// require('./routes/routes.js')(app);


var api2 = require('./routes/api2');
app.use('/api2', api2);



app.listen(port);

console.log('server in running on', ':' + port);
console.log('The App runs on port ' + port);