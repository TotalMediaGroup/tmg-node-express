
var navItems = [
//  [ page-id, nav-title, uri-path, page-title, show-in-nav, is-isolated ]
    [ "home", "Home", "/", "Home", true, false ],
    [ "work", "Work", "/work", "Work", true, false ],
    [ "about", "About", "/about", "About", true, false ]
  ];

for (var i = 0; i < navItems.length; i++) { navItems[i][3] = "Total Media Group | "+navItems[i][3]; }

exports.setJadeVars = function(process, req, data) {

  var jV = {};
  for (var i = 0; i < navItems.length; i++) {
    if (req.route.path === navItems[i][2]) { jV.current_page = navItems[i]; break; }
  }

  var inProd = (process.env.NODE_ENV === "production");
  jV.app_version = process.env.productionVersionId;
  jV.node_env = process.env.NODE_ENV;
  jV.title += (inProd ? "" : (" ("+process.env.NODE_ENV+")"));
  jV.segment_io_client_id =  process.env.SEGMENT_IO_CLIENT_ID;
  jV.addthis_pubid = process.env.ADDTHIS_PUBID;
  jV.bootstrap_cdn = inProd ? "//netdna.bootstrapcdn.com" : "/vendor";
  jV.googlelibs_cdn = inProd ? "//ajax.googleapis.com/ajax/libs" : "/vendor";
  jV.videojs_cdn = inProd ? "//vjs.zencdn.net" : "/vendor/video.js"
  jV.cdnjs_cdn = inProd ? "//cdnjs.cloudflare.com/ajax/libs" : "/vendor";
  jV.tmg_cdn = inProd ? "//d3gq709nndn9uy.cloudfront.net/cdn" : "/cdn";
  jV.tmg_vendor_cdn = inProd ? "//d3gq709nndn9uy.cloudfront.net/vendor" : "/vendor";
  jV.tmg_static_cdn = inProd ? "//d4bl4mvczhn5i.cloudfront.net" : "//rfcx-static.s3.amazonaws.com";
  jV.nav_items = navItems;
  jV.data = data[jV.current_page[0]];
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
