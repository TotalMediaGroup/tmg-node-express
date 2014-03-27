
function setSquImg(inputObj){

  if ((typeof $ === "undefined") && (inputObj.complete)) {
    var wait = setTimeout(function(){setSquImg(inputObj)},333);
  } else {
    var obj = $(inputObj);
//    obj.css("visibility","hidden");
    var divObj = obj.parent('div.tmg-thmb');
    var objDim = {/*lf:0,tp:0,*/wd:parseInt(obj.width()),ht:parseInt(obj.height()),padLf:0,padTp:0};
    var divDim = {/*lf:0,tp:0,*/
        wd:parseInt(divObj.outerWidth()), ht:parseInt(divObj.outerHeight()),
        padLf:parseInt(divObj.css("padding-left")), padTp:parseInt(divObj.css("padding-top"))
      };
    objDim.rat = objDim.wd/objDim.ht;
    divDim.rat = divDim.wd/divDim.ht;

    var baseline = 'wd';
    if ((objDim.rat >= 1) && (divDim.rat >= 1)) {
      baseline = (objDim.rat > divDim.rat) ? 'ht' : 'wd';
    } else if ((objDim.rat < 1) && (divDim.rat < 1)) {
      baseline = (objDim.rat > divDim.rat) ? 'wd' : 'ht';
    } else {
      baseline = (objDim.rat >= divDim.rat) ? 'ht' : 'wd';
    }

//    console.log(inputObj.src+" - "+inputObj.complete+" - "+obj.css("visibility")+" - "+baseline);

    if (obj.css("visibility")=="hidden") { obj.css({opacity:0}); }
    if (baseline == "ht") {
        var newWidth = divDim.ht*objDim.wd/objDim.ht;
        obj.css({height:Math.round(divDim.ht)+"px",top:Math.round(0-divDim.padTp)+"px",width:Math.round(newWidth)+"px"});
        obj.css({left:Math.round(0-(((newWidth-divDim.wd)/2)+divDim.padLf))+"px"});
    } else {
        var newHeight = divDim.wd*objDim.ht/objDim.wd;
        obj.css({width:Math.round(divDim.wd+divDim.padLf)+"px",left:Math.round(0-divDim.padLf)+"px",height:Math.round(newHeight)+"px"});
        obj.css({top:Math.round(0-(((newHeight-divDim.ht)/2)+divDim.padTp))+"px"});
    }
    obj.css({visibility:"visible"}).animate({opacity:1},500);
  }
}

var allowTMGbgresize = true;

function bgStaticResize(inputObj,left,top){
  if ((typeof $ === "undefined") && (inputObj.complete)) {
    var wait = setTimeout(function(){bgStaticResize(inputObj,left,top)},333);
  } else if (allowTMGbgresize) {
    // var obj = $(inputObj);
    // var div = obj.parent(".bg-static");
    // var objDim = {lf:0,tp:0,wd:parseInt(inputObj.width),ht:parseInt(inputObj.height),padLf:0,padTp:0};
    // var divDim = {wd:$(window).width(),ht:$(window).height(),padLf:0,padTp:0};
    // divDim.lf = parseInt((left/100)*divDim.wd);
    // divDim.tp = parseInt((top/100)*divDim.ht);
    // objDim.rat = objDim.wd/objDim.ht;

    // var topPos = $(".page-video-bttm").offset().top;
    // if ((objDim.ht-divDim.tp) < topPos) {
    //   obj.css({width:Math.round((topPos+divDim.tp)*objDim.rat+divDim.lf)+"px",minWidth:Math.round((topPos+divDim.tp)*objDim.rat+divDim.lf)+"px",visibility:"visible"});
    // } else {

    // }
  }
}

function randomSort(a,b) {
    var temp = parseInt( Math.random()*10 );
    var isOddOrEven = temp%2;
    var isPosOrNeg = temp>5 ? 1 : -1;
    return( isOddOrEven*isPosOrNeg );
}
