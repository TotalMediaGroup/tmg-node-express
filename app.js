// check for environmental variable file and load if present
var fs = require("fs");
if (fs.existsSync("./config/env_vars.js")) {
  var env = require("./config/env_vars.js").env;
  for (i in env) { process.env[i] = env[i]; }
}

// Load Production Version ID
process.env.productionVersionId = require("./config/version.js").productionVersionId;

// Express Initialization
var express = require("express"), routes = require("./routes/all.js"),
  http = require("http"), path = require("path")
  middlewares = require("./middlewares/all.js").middlewares;
var app = express();

// all environments
app.set('title','Total Media Group')
app.set('port', process.env.PORT || 8080);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon("./public/cdn/img/logo/favicon.ico"));
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(middlewares.allowCrossDomain);
app.use(app.router);
app.use(express.compress());
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

var data = {
  home: {
    background_images: require("./data/home-backgrounds.js").load(),
    tmg_rules: require("./data/home-rules.js").load()
  },
  about: {
    team: require("./data/about-team.js").load(),
    company: require("./data/about-company.js").load()
  }
};

app.get('/', function(req,res){
  res.render('home', routes.setJadeVars(process, req, data ));
});
app.get('/about', function(req,res){
  res.render('about', routes.setJadeVars(process, req, data ));
});
app.get('/reels', function(req,res){
  res.render('reels', routes.setJadeVars(process, req, data ));
});

app.get("/health_check", routes.returnHealthCheck );

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
