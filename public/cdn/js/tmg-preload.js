
function setSquImg(inputObj,baseline){

  if (typeof $ === "undefined") {
    var wait = setTimeout(function(){setSquImg(inputObj,baseline)},333);
  } else {
    var obj = $(inputObj);
    var divObj = obj.parent('div.tmg-thmb');
    var objDim = {/*lf:0,tp:0,*/wd:parseInt(obj.width()),ht:parseInt(obj.height()),padLf:0,padTp:0};
    var divDim = {/*lf:0,tp:0,*/
        wd:parseInt(divObj.outerWidth()), ht:parseInt(divObj.outerHeight()),
        padLf:parseInt(divObj.css("padding-left")), padTp:parseInt(divObj.css("padding-top"))
      };
    objDim.rat = objDim.wd/objDim.ht;
    divDim.rat = divDim.wd/divDim.ht;
    if (baseline == null) {
      if ((objDim.rat >= 1) && (divDim.rat >= 1)) {
        baseline = (objDim.rat > divDim.rat) ? 'ht' : 'wd';
      } else if ((objDim.rat < 1) && (divDim.rat < 1)) {
        baseline = (objDim.rat > divDim.rat) ? 'wd' : 'ht';
      } else {
        baseline = (objDim.rat >= divDim.rat) ? 'ht' : 'wd';
      }
    }
    if (obj.css("visibility")==="hidden") { obj.css({opacity:0}); }
    if (baseline == "ht") {
        var newWidth = divDim.ht*objDim.wd/objDim.ht;
        obj.css({height:divDim.ht+"px",top:(0-divDim.padTp)+"px",width:newWidth+"px"});
        obj.css({left:Math.round(0-(((newWidth-divDim.wd)/2)+divDim.padLf))+"px"});
    } else {
        var newHeight = divDim.wd*objDim.ht/objDim.wd;
        obj.css({width:(divDim.wd+divDim.padLf)+"px",left:(0-divDim.padLf)+"px",height:newHeight+"px"});
        obj.css({top:Math.round(0-(((newHeight-divDim.ht)/2)+divDim.padTp))+"px"});
    }
    obj.css({visibility:"visible"}).animate({opacity:1},500);
  }
}

