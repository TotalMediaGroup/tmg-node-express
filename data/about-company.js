
var data = [

  [ ["<span style=\"color:red;\">TMG Creative</span> Is a creative agency and full-service production studio.  We create visual media for tv, web and live events. We put a strong emphasis on great design and well crafted stories. We know all the latest tricks, but never rely on them. We are a close-knit team of experienced directors, producers and artists who are passionate about the art of visual storytelling and thrive on collaborative relationships.","","We're based in South San Francisco, just over the hill from the city and right near the airport. Close enough to have lunch on the Embarcadero and far enough to miss the traffic going home.","","The creative energy that drives San Francisco is infectious. Anyone who lives and works here is affected by it.","We grew up here. We work here,","we raise our families here.","We live and breathe creative.","It's what we do. It's who we are."],
  ],




["",""]];

exports.load = function() {
  var rtrn = []; for (var i = 0; i < (data.length-1); i++) { rtrn[i] = data[i]; }
  return rtrn;
}