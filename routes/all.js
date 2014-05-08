
var navItems = [
//  [ page-id, nav-title, uri-path, page-title, show-in-nav, is-isolated ]
    [ "home", "HOME", "/", "HOME", false, false ],
    [ "work", "WORK", "/work", "WORK", true, false ],
    [ "about", "ABOUT", "/about", "ABOUT", true, false ],
    [ "work-single", "VIDEO", "/work/:video_id", "WORK", false, false ],
    // [ "video-test", "Video test", "/video-test/:video_id", "Video test", false, false ],
    [ "client", "CLIENT WORKSPACE", "/client/:client_id", "CLIENT WORKSPACE", false, false ],
    [ "client-login", "CLIENT ACCESS", "http://ftp2.tmgcreative.tv/", "CLIENT ACCESS", true, false ]
  ];

for (var i = 0; i < navItems.length; i++) { navItems[i][3] = "TMG CREATIVE | "+navItems[i][3]; }

exports.setJadeVars = function(process, req, data) {
  var jV = {};
  for (var i = 0; i < navItems.length; i++) {
    if (req.route.path === navItems[i][2]) { jV.current_page = navItems[i]; break; }
  }

  var inProd = (process.env.NODE_ENV === "production");
  jV.app_version = process.env.productionVersionId;
  jV.node_env = process.env.NODE_ENV;
  jV.segment_io_client_id =  process.env.SEGMENT_IO_CLIENT_ID;
  jV.addthis_pubid = process.env.ADDTHIS_PUBID;
  jV.bootstrap_cdn = /*inProd ? "//netdna.bootstrapcdn.com" :*/ "/vendor";
  jV.googlelibs_cdn = inProd ? "//ajax.googleapis.com/ajax/libs" : "/vendor";
  jV.videojs_cdn = /*inProd ? "//vjs.zencdn.net" :*/ "/vendor/video.js"
  jV.cdnjs_cdn = inProd ? "//cdnjs.cloudflare.com/ajax/libs" : "/vendor";
  jV.tmg_direct = "/cdn";
  jV.tmg_cdn = inProd ? "//d2y7n9uehnvsti.cloudfront.net/cdn" : "/cdn";
  jV.tmg_vendor_cdn = /*inProd ? "//d2y7n9uehnvsti.cloudfront.net/vendor" :*/ "/vendor";
  jV.tmg_static_cdn = inProd ? "//d3pgh9vr58m8p8.cloudfront.net" : "//totalmediagroup.s3.amazonaws.com";
  jV.nav_items = navItems;
  jV.data = data[jV.current_page[0]];
  jV.url_params = req.url_params;

  jV.title = jV.current_page[3];
  if (jV.current_page[0] === "work-single") {
    for (i in data['work-single'].work) {
      if (data['work-single'].work[i].id == jV.url_params.video_id) {
        jV.title += " | "+data['work-single'].work[i].client_page.toUpperCase() +" | "+data['work-single'].work[i].title.toUpperCase();
      }
    }
  }

  jV.title += (inProd ? "" : (" ("+process.env.NODE_ENV+")"));

  return jV;
}

exports.redirectToHomePage = function(req,res) {
  res.writeHead(302, { "Location": "/" } );
  res.end();
};

exports.returnHealthCheck = function(req,res) {
  var sendString = "tmg";
  if (req.query.headers==="1") { sendString += "<br />"+JSON.stringify(req.headers); }
  res.send(sendString);
};

exports.checkLogin = function(req,data) {
  var rtrn = false;
  if ((req.body.login.toLowerCase() != null) && (req.body.password != null)) {
    for (c in data.client.client) {
      if ((req.body.login.toLowerCase() === data.client.client[c].login) && (req.body.password === data.client.client[c].password)) {
        rtrn = true;
        break;
      }
    }
  }
  return rtrn;
}

function generateInsecureToken(productionVersionId,login,password) {
  var token = require('crypto').createHash('md5')
    .update(productionVersionId+login.toLowerCase()+password)
    .digest("hex");
  return token;
}

exports.generateLoginToken = function(process,req) {
  return generateInsecureToken(process.env.productionVersionId,req.body.login,req.body.password);
}

exports.generateInsecureToken = function(productionVersionId,login,password) {
  return generateInsecureToken(productionVersionId,login,password);
}

exports.verifyToken = function(process,req,data,login) {
  var token = req.cookies.token, password = null;
  for (c in data.client.client) { if (data.client.client[c].login===login) { password = data.client.client[c].password; break; } }
  return token === generateInsecureToken(process.env.productionVersionId,login,password);
}


