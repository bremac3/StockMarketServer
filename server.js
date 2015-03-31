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

app.post('/companies', function(request, response){
    var company = new Companies({
        name: request.body.company.name,
        symbolURL: request.body.company.symbolURL,
        openPrice: request.body.company.openPrice,
        currentPrice: request.body.company.currentPrice,
        changeVolume: request.body.company.changeVolume,
        changeIcon: request.body.company.changeIcon,
        changePercentage: request.body.company.changePercentage,
        changeDirection: request.body.company.changeDirection,
        shareVolume: request.body.company.shareVolume
    });
    company.save(function(error){
       if(error) response.send(error);
       response.status(201).json({company: company});
    });
});

app.post('/buyOrders', function(request, response){
    var buyOrder = new BuyOrders({
        timeStamp: request.body.buyOrder.timeStamp,
        size: request.body.buyOrder.size,
        price: request.body.buyOrder.price
    });
    buyOrder.save(function(error){
        if(error) response.send(error);
        response.status(201).json({buyOrder: buyOrder});
    });
});

app.post('/saleOrders', function(request, response){
    var saleOrder = new SaleOrders({
        timeStamp: request.body.saleOrder.timeStamp,
        size: request.body.saleOrder.size,
        price: request.body.saleOrder.price
    });
    saleOrder.save(function(error){
        if(error) response.send(error);
        response.status(201).json({saleOrder: saleOrder});
    });
});

app.post('/transactions', function(request, response){
    
});

app.put('/companies/:company_id', function(request, response){

});

app.delete('/buyOrders/:buyOrder_id', function(request, response){

});

app.delete('/saleOrders/:saleOrder_id', function(request, response){

});

app.use(express.static('public'));

app.listen(3000, function(){
    console.log('Server running');
});
