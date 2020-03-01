var express = require('express');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 7034);


app.get('/home', function(reg,res){
     var inputlist = [];
     for(var i in reg.query){
         inputlist.push({'v1':i,'v2':reg.query[i]});
     }
     var Obj = {};
     Obj.item = inputlist;
     Obj.met = "GET";
    res.render('home',Obj);

});


app.post('/home', function(reg,res){
    var inputlist = [];
    for(var i in reg.body){
        inputlist.push({'v1':i,'v2':reg.body[i]});
    }
    console.log(inputlist);
    console.log(reg.body);
    var Obj = {};
    Obj.item = inputlist;
    Obj.met = "POST";
   res.render('home',Obj);


});



app.use(function(req,res){
    res.status(404);
    res.render('404');
  });
  
  app.use(function(err, req, res, next){
    console.error(err.stack);
    res.type('plain/text');
    res.status(500);
    res.render('500');
  });
  
  app.listen(app.get('port'), function(){
    console.log('Express started on Port:' + app.get('port') + '; press Ctrl-C to terminate.');
  });