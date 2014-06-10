
var data = [

  /* load images below */

  ["abbot1"],
  ["bobo-looks-up"],
  ["salix_butterflies"],
  ["Butterflys2"],
  ["Butterflys3"],
  ["cells"],
  ["city"],
  ["connections_blurred"],
  ["employee-award"],
  ["employee-proud"],
  ["it-diagram"],  
  ["it-globe"],
  ["levator"],
  ["line"],
  ["meeting"],
  ["network"],
  ["old-tech"],
  ["old-tv"],
  ["paper-plane"],
  ["pc-power"],
  ["pig-on-board"],
  ["polyphone"],
  ["salix_john_t"],
  ["ring"],
  ["ruckus-phones"],
  ["simplicity"],
  ["slide"],
  ["smarter"],
  ["agua-kid"],
  ["agua-kids"],
  ["agua-walker"],
  ["boardroom"],
  ["delivery"],
  ["exterminator"],
  ["lincvolt"],
  ["medium"],
  ["wall"],
  ["dolby1"],

[""]];

exports.load = function() {
  var rtrn = []; for (var i = 0; i < (data.length-1); i++) { rtrn[i] = data[i]; }
  return rtrn;
}