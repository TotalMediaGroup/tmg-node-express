
var data = [

  { title: "Best Client Ever",
    login: "my-client",
    password: "password"
  },

    { title: "Best Client Ever",
    login: "vmware",
    password: "password"
  },








["",""]];

exports.load = function() {
  var rtrn = []; for (var i = 0; i < (data.length-1); i++) { rtrn[i] = data[i]; }
  return rtrn;
}