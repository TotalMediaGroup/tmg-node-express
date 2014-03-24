
var data = [

  { title: "Best Client Ever",
    login: "my-client",
    password: "password"
  },


  { title: "VMWare",
    login: "vmware",
    password: "password"
  },








["",""]];

exports.load = function() {
  var rtrn = []; for (var i = 0; i < (data.length-1); i++) { rtrn[i] = data[i]; }
  return rtrn;
}