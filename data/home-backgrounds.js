
var data = [

  /* load images below */

  ["abbot1"],
  ["bobo-looks-up"],
  ["boids"],
  ["butterflies"],
  ["Butterflys1"],
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
  ["meeting-2"],
  ["meeting"],
  ["network"],
  ["old-tech"],
  ["old-tv"],
  ["paper-plane"],
  ["pc-power"],
  ["pig-on-board"],
  ["polyphone"],
  ["psych-guy"],
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

[""]];

exports.load = function() {
  var rtrn = []; for (var i = 0; i < (data.length-1); i++) { rtrn[i] = data[i]; }
  return rtrn;
}