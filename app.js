// check for environmental variable file and load if present
var fs = require("fs");
if (fs.existsSync("./config/env_vars.js")) {
  var env = require("./config/env_vars.js").env;
  for (i in env) { process.env[i] = env[i]; }
} else {
  var env = require("./config/env_vars.js.sample").env;
  for (i in env) { if (process.env[i] == null) { process.env[i] = env[i]; } }
}

// Load Production Version ID
process.env.productionVersionId = require("./config/version.js").productionVersionId;

// Express Initialization
var express = require("express"), routes = require("./routes/all.js"),
  http = require("http"), path = require("path"),
  middlewares = require("./middlewares/all.js").middlewares,
  knox = require("knox").createClient({
    key: process.env.AWS_ACCESS_KEY_ID, secret: process.env.AWS_SECRET_KEY, bucket: process.env.AWS_S3_BUCKET
  });
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
app.use(middlewares.tmgDemos);
app.use(app.router);
app.use(express.compress());
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.param("video_id",function(req,res,next,video_id){
  req.url_params = {"video_id":video_id}; next();
});

app.param("client_id",function(req,res,next,client_id){
  req.url_params = {"client_id":client_id}; next();
});

var data = {
  "home": {
    background_images: require("./data/home-backgrounds.js").load(),
    tmg_rules: require("./data/home-rules.js").load()
  },
  "about": {
    background_images: require("./data/home-backgrounds.js").load(),
    team: require("./data/about-team.js").load(),
    company: require("./data/about-company.js").load(),
    tmg_rules: require("./data/home-rules.js").load()
  },
  "work": {
    background_images: require("./data/home-backgrounds.js").load(),
    video: require("./data/video.js").load(),
    tmg_rules: require("./data/home-rules.js").load()
  },
  "work-single": {
    video: require("./data/video.js").load(),
    tmg_rules: require("./data/home-rules.js").load()
  }
};

app.get('/', function(req,res){
  res.render('home', routes.setJadeVars(process, req, data ));
});
app.get('/about', function(req,res){
  res.render('about', routes.setJadeVars(process, req, data ));
});
app.get('/work', function(req,res){
  res.render('work', routes.setJadeVars(process, req, data ));
});
app.get('/work/:video_id', function(req,res){
  res.render('work-single', routes.setJadeVars(process, req, data ));
});

app.get('/ajax/list/:client_id', function(req,res){
  var prefix = req.url_params.client_id+'/';
  knox.list({prefix:prefix},function(err,data){
    var dataOut = [];
    for (i in data.Contents) {
      var d = data.Contents[i];
      if (d.Key !== prefix) {
        dataOut.push({ key: d.Key, LastModified: d.LastModified, Size: d.Size });
      }
    }
    res.send(dataOut);
  });  
});

app.get("/health_check", routes.returnHealthCheck );

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
