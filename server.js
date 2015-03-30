var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var app = express();

mongoose.connect('mongodb://localhost/StockMarket');

var companySchema = mongoose.Schema({
    name: String,
    symbolURL: String,
    openPrice: String,
    currentPrice: Number,
    changeVolume: Number,
    changeIcon: String,
    changePercentage: Number,
    changeDirection: Number,
    shareVolume: Number
    //buyOrders: ,
    //sellOrders:,
    //transactions:
});

var buyOrderSchema = mongoose.Schema({
    timeStamp: Date,
    size: Number,
    price: Number
    //company
});

var saleOrderSchema = mongoose.Schema({
    timeStamp: Date,
    size: Number,
    price: Number
    //COMPANY
});

var Companies = mongoose.model('Companies', companySchema);
var BuyOrders = mongoose.model('BuyOrders', buyOrderSchema);
var SaleOrders = mongoose.model('SaleOrders', saleOrderSchema);

var logger = require('./logger');

app.use(logger);
app.use(bodyParser.json());

app.get('/companies', function(request, response){
    Companies.find(function(error, companies){
        if(error) response.send(error);
        response.json({company: companies});
        console.log(companies);
    });
});

app.get('/buyOrders', function(request, response){
    BuyOrders.find(function(error, buyOrders){
        if(error) response.send(error);
        response.json({buyOrder: buyOrders});
        console.log(buyOrders);
    });
});

app.get('/saleOrders', function(request, response){
    SaleOrders.find(function(error, saleOrders){
        if(error) response.send(error);
        response.json({saleOrder: saleOrders});
        console.log(saleOrders);
    });
});

app.use(express.static('public'));

app.listen(3000, function(){
    console.log('Server running');
});
