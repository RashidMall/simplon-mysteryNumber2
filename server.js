/* Nombre mystère
Il faut deviner le nombre choisi par l'ordinateur
Choisir un nombre entre 0 et 9
Le programme dit si le nombre mystère est plus ou moins
Après 3 tentatives, la partie est perdue
Bonus
Pouvoir choisir les nombres min et max
Pouvoir choisir le nombre de tentatives */

var express = require('express');
var bodyParser = require('body-parser');
var lodash = require('lodash');
var urlencodedParser = bodyParser.urlencoded({extended: false});

var app = express();

var randomNb = lodash.random(0, 9);
var message = "";
var userNb = "unknown";
var count = 3;

app.get('/', function(req, res){
    res.render('index.ejs', {message: message, userNb: userNb});
});

app.post('/try',urlencodedParser, function(req, res){
    userNb = req.body.number_try;
    count--;

    if(userNb == randomNb){
        res.render('uwon.ejs', {});
    }else if(count == 0){
        res.render('ulose.ejs', {});
    }else if(userNb > randomNb){
        message = "less than";
        res.redirect('/');
    }else if(userNb < randomNb){
        message = "greater than";
        res.redirect('/');
    }
});

app.use(function(req, res, next){
    res.redirect('/');
})

.listen(8080);