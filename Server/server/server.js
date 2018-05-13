var express = require('express');
var path = require('path');
/* var config = require('../webpack.config.js');
 */
/* var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware'); */
var MongoClient = require('mongodb').MongoClient
var bodyParser = require('body-parser');
const dbconfig  = require('../config');
var Promise=require('promise');
var cors=require('cors');

var app = express();
app.use(cors());
var router=express.Router();

/* var compiler = webpack(config);
app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }));
app.use(webpackHotMiddleware(compiler)); */

var mongoose=require('mongoose')
mongoose.Promise=Promise;
/* app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use(function(req,res,next){
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Credentials','true');
    res.setHeader('Access-Control-Allow-Methods','GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers’, ‘Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');


}); */


/* var clientPath= path.join(__dirname, '..','client');
app.use(express.static(clientPath)); */
var str="";

require('./services/apiServices')(app);

/* app.get('*',(req,res)=>{
    res.sendFile(path.resolve('./index.html'));
}) */

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});
mongoose.connect(dbconfig.mongodb.defaultUri,{config:{autoIndex:false}});

var database=mongoose.connection;
database.on('error',console.error.bind(console,'connectin error'));
database.once('open',function(){
    console.log("connect to DB ar: "+dbconfig.mongodb.defaultUri+" successfully");
});


/* app.route('/NGEM').get(function(req, res) {
    //res.sendFile(path.resolve('client/index.html'));
    console.log(dbconfig.mongodb.defaultUri);
    MongoClient.connect(dbconfig.mongodb.defaultUri)
    .then(function(db){
        //if (error) {console.log(error);}
        //else{
            console.log("Connection established");
           // console.log(db.collection('tenants').find().toArray());
        //}
        var cursor=db.collection('tenants').find({}).toArray()
        .then(item=>{
                    console.log(item);
                    res.send(200,item);
                    //res.sendFile(path.resolve('client/index.html'));
                })
        .catch(err=>res.send(500,err))
        
        cursor.each(function(err,item){
            console.log(item);
            if(item!=null){
                console.log(item.tenantId);
                str=str+item.tenantId+" ";
            }
        })
        console.log("STRRR");
        //res.send(str);
    })
    .catch(
        err=>res.send(400,err)
    )

}); */


/* 
app.use('/layers', function(req, res) {
    let layers={};
    mdb.collection('layers').find({})
    .each((err,layer)=>{
        //assert.equal(null,err);

        if(!layer){
            console.log(layers);
            res.send(layers);
            return;
        }
        layers[layer.id]=layer;
    })
}); */



var port = 5000;
app.listen(port, function(error) {
    if (error) throw error;
    console.log("Express server listening on port", port);


});