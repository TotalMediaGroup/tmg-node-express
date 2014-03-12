
function setSquImg(inputObj,baseline){
  if (baseline === null) { var baseline = "ht"; }
  if (typeof $ === "undefined") {
    var wait = setTimeout(function(){setSquImg(inputObj,baseline)},333);
  } else {
    var obj = $(inputObj);
    if (obj.css("visibility")==="hidden") { obj.css({opacity:0}); }
    var divObj = obj.parent('div.tmg-thmb');
    if (baseline == "ht") {
        var newWidth = parseInt(divObj.outerHeight())*parseInt(obj.width())/parseInt(obj.height());
        obj.css({height:parseInt(divObj.outerHeight())+"px",top:(0-parseInt(divObj.css("padding-top")))+"px",width:newWidth+"px"});
        obj.css({left:Math.round(0-((parseInt(obj.width())-parseInt(divObj.outerWidth()))/2)+parseInt(divObj.css("padding-left")))+"px"});
    } else {
        var newHeight = parseInt(divObj.outerWidth())*parseInt(obj.height())/parseInt(obj.width());
        obj.css({width:(parseInt(divObj.outerWidth())+parseInt(divObj.css("padding-left")))+"px",left:(0-parseInt(divObj.css("padding-left")))+"px",height:newHeight+"px"});
        obj.css({top:Math.round(0-((parseInt(obj.height())-parseInt(divObj.outerHeight()))/2)+parseInt(divObj.css("padding-top")))+"px"});
    }
    obj.css({visibility:"visible"}).animate({opacity:1},500);
  }
}