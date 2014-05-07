exports.middlewares = {

  allowCrossDomain: function(req, res, next) {
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers","X-Requested-With");
    next();
  },

  tmgDemos: function(req, res, next) {
    
    if (req.path.substr(0,7) === "/demos/") {
      console.log("redirecting to demos.tmgcreative.tv");
      res.writeHead(302, { "Location": "http://demos.tmgcreative.tv"+req.path } );
      res.end();
    } else {
      next();
    }
  },

  mainDomain: function(req, res, next) {
    
    if (req.host!=="rfcx.org") {
      res.writeHead(302, { "Location": "http://tmgcreative.tv"+req.path } );
      res.end();
    } else {
      next();
    }
  }

}