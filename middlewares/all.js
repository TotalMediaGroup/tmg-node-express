exports.middlewares = {

  allowCrossDomain: function(req, res, next) {
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers","X-Requested-With");
    next();
  },

  tmgDemos: function(req, res, next) {
    
    if (req.path.substr(0,7) === "/demos/") {
      console.log("redirecting to demos.totalmediagroup.com");
      res.writeHead(302, { "Location": "http://demos.totalmediagroup.com"+req.path } );
      res.end();
    } else {
      next();
    }
  },

}