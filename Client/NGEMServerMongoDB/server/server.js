var express = require('express');
var path = require('path');
var config = require('../webpack.config.js');
var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var bodyParser = require('body-parser');
var cors=require('cors');


var app = express();
var clientPath= path.join(__dirname, '..','client');
app.use(express.static(clientPath));

app.use(cors());


var compiler = webpack(config);
app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }));
app.use(webpackHotMiddleware(compiler));

app.get('*',(req,res)=>{
    res.sendFile(path.resolve('client/index.html'));
})

var port = 3000;
app.listen(port, function(error) {
    if (error) throw error;
    console.log("React JS server listening on port", port);
});