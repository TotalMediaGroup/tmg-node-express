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
var inProd = (process.env.NODE_ENV === "production");

// Express Initialization
var express = require("express"), routes = require("./routes/all.js"),
  http = require("http"), path = require("path"),
  middlewares = require("./middlewares/all.js").middlewares,
  knoxClient = require("knox").createClient({
    key: process.env.AWS_ACCESS_KEY_ID, secret: process.env.AWS_SECRET_KEY, bucket: process.env.AWS_S3_BUCKET_CLIENT
  }),
  knoxData = require("knox").createClient({
    key: process.env.AWS_ACCESS_KEY_ID, secret: process.env.AWS_SECRET_KEY, bucket: process.env.AWS_S3_BUCKET_DATA
  })
  ;
var app = express();

// all environments
app.set('title','Total Media Group')
app.set('port', process.env.PORT || 8080);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon("./public/cdn/img/logo/favicon.ico"));
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.cookieParser());
app.use(express.methodOverride());
app.use(middlewares.allowCrossDomain);
app.use(middlewares.tmgDemos);
if (inProd) { app.use(middlewares.mainDomain); }
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

var dataIndex = {
  "home": {
    background_images: "home-backgrounds",
    tmg_rules: "home-rules"
  },
  "about": {
    background_images: "home-backgrounds",
    team: "about-team",
    company: "about-company",
    tmg_rules: "home-rules"
  },
  "work": {
    background_images: "home-backgrounds",
    work: "work",
    tmg_rules: "home-rules"
  },
  "work-single": {
    background_images: "home-backgrounds",
    work: "work",
    tmg_rules: "home-rules"
  },
  "video-test": {
    background_images: "home-backgrounds",
    work: "work",
    tmg_rules: "home-rules"
  },
  "client": {
    client: "client",
    background_images: "home-backgrounds",
    tmg_rules: "home-rules"
  }
};

var data = {}; for (i in dataIndex) { data[i] = {}; for (j in dataIndex[i]) { data[i][j] = require("./data/"+dataIndex[i][j]+".js").load(); } }
var dataDirectory = ""; for (i in require.cache) { if (i.indexOf("home-backgrounds.js") > -1) { dataDirectory = i.substr(0,i.indexOf("home-backgrounds.js")); } }
function reCache(page) { for (i in dataIndex[page]) { delete require.cache[dataDirectory+dataIndex[page][i]+'.js']; } for (i in dataIndex[page]) { data[page][i] = require("./data/"+dataIndex[page][i]+".js").load(); } }

app.get('/', function(req,res){
  if (!inProd) { reCache('home'); }
  res.render('home', routes.setJadeVars(process, req, data));
});
app.get('/about', function(req,res){
  if (!inProd) { reCache('about'); }
  res.render('about', routes.setJadeVars(process, req, data));
});
app.get('/work', function(req,res){
  if (!inProd) { reCache('work'); }
  res.render('work', routes.setJadeVars(process, req, data));
});
app.get('/work/:video_id', function(req,res){
  if (!inProd) { reCache('work-single'); }
  res.render('work-single', routes.setJadeVars(process, req, data));
});
app.get('/video-test/:video_id', function(req,res){
  if (!inProd) { reCache('video-test'); }
  res.render('video-test', routes.setJadeVars(process, req, data));
});
app.get('/client/:client_id', function(req,res){
  if (!inProd) { reCache('client'); }
  res.render('client', routes.setJadeVars(process, req, data));
});

app.post('/login', function(req,res){
  if (!inProd) { reCache('client'); }
  var d = { success: routes.checkLogin(req,data), login: req.body.login.toLowerCase(), token: null };
  if (d.success) {
    d.token = routes.generateLoginToken(process,req);
    res.cookie('token', d.token, { maxAge: 3*3600*1000, httpOnly: false});
  }
  res.send(d);
});

app.get('/logout', function(req,res){
  res.clearCookie('token');
  res.send([]);
});

app.get('/ajax/list/:client_id', function(req,res){
  var login = req.url_params.client_id;
  if (routes.verifyToken(process,req,data,login)) {
    knoxClient.list({prefix:login+'/'},function(err,data){
      var dataOut = [];
      for (i in data.Contents) {
        var d = data.Contents[i];
        if (d.Key !== login+'/') {
          dataOut.push({ key: d.Key, LastModified: d.LastModified, Size: d.Size });
        }
      }
      res.send(dataOut);
    });
  } else {
    res.send([]);
  } 
});

app.get("/health_check", routes.returnHealthCheck );

app.get('/web/', function(req,res){
  res.writeHead(302, { "Location": "/" } );
  res.end();
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
