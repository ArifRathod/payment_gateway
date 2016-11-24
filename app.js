var express = require('express'),
    http = require('http'),
    bodyParser = require("body-parser"),
    Charge = require('./routes/charge.js'),
    ManageCustomer = require('./routes/ManageCustomer.js'),
    StoreCard = require('./routes/StoreCard.js'),
    ProcessStoredCard = require('./routes/ProcessStoredCard.js'),
    ManageContract = require('./routes/ManageContract.js');

GLOBAL.getApiKey = "7E35FC46-C951-2D2F-FB42-7795F3D24C60";
GLOBAL.apiBase = 'http://demo.paycertify.net/';

var app = express();

app.use(bodyParser.urlencoded({
    extended: true
})); 

app.set('port', process.env.PORT || 9000);
app.use(bodyParser.json({limit: '5mb'}));
app.use(express.static(__dirname + '/public'));

app.all('/*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.post('/charge', Charge.create);
app.post('/ManageCustomer', ManageCustomer.create);
app.post('/StoreCard', StoreCard.create);
app.post('/ProcessStoredCard', ProcessStoredCard.create);
app.post('/ManageContract', ManageContract.create);

app.get('/charge', Charge.create);


var server = http.createServer(app);

server.listen(app.get('port'), function(){
	  console.log('Express server listening on port ' + app.get('port'));
});