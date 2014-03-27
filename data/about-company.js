
var data = [

  [ ["Total Media Group, Is a creative agency and full-service production studio.","We create visual media for television, web and live events and place strong emphasis on design and crafted storytelling.&nbsp;&nbsp;Our team consists of producers, directors and artists who embrace both visual art and collaborative teamwork.&nbsp;&nbsp;Based in South San Francisco, we are close enough to have lunch on the Embarcadero, but far enough away to miss the end of day traffic.","","The creative energy driving San Francisco is Infections.&nbsp;&nbsp;Anyone who lives and works in the Bay Area is Affected by it.","","We live, work and raise our families here-living and breathing creative.","","It's what we do.&nbsp;&nbsp;It's who we are."],
  ],




["",""]];

exports.load = function() {
  var rtrn = []; for (var i = 0; i < (data.length-1); i++) { rtrn[i] = data[i]; }
  return rtrn;
}