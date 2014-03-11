var TMG = {
  currentPage: null,
  pageLoaded:new Date(),
  isIsolated: false,
  userLanguage: (window.navigator.userLanguage || window.navigator.language).substr(0,2).toLowerCase(),
  isHTTPS: (window.location.protocol.indexOf("https") > -1),
  fn: { load: {}, reactiveUi: {}, initializeUi: {}, video: {},
    ui: {
      all: {}, 'work-single': {}
    }
  },
  cdn: { tmg: null, tmgVendor: null, tmgStatic: null, bootstrap: null, cdnJs: null, videoJs: null },
  timer: { windowResize: null, windowScroll: null },
  bodyWidth: $('.container').innerWidth(),
  overflowMarginWidth: 250,
  renderForMobile: false,
  renderForTouch: $("html").hasClass("touch"),
  transitionAt: { intro: 418, about: 30, get_involved: 30, media: 30 },
  nodeEnv: null,
  appVersion: null,
  speedTest: { kB: 100, expireMinutes: 2 },
  snapJsObj: null,
  jqueryGalleria: [],
  slideShowDelay: 10000,
  slideShowTransitionSpeed: 2000,
  scrollQueues: {
//    loadFollowButtons: {
//      whenVisible: { intro: "#mce-EMAIL" },
//      position: 1000, mobilePosition: 1000, isLoaded: false },
  },
  social: {
    addThis: { pubId: "", env: [ "production", "development" ] },
    followButtons: { env: [ "production", "development" ] }
  }
};

TMG.video = {
  offset: [0, 0, 0], obj: null, id: null, version: null, forceYouTube: false, posterUri: "", sizes: [
      [1920,1080,5500], [1280,720,2500], [854,480,1100], [640,360,600]
    ], mobileSize: 3, followUp: { excludePaths: [ "" ] }
};

$(function(){
  
  $.ajaxSetup({ cache:true });
  
  TMG.setDevMode();

  TMG.renderForMobile = (parseInt($("body").css("min-width")) < 512);

  for (i in TMG.fn.load) { TMG.fn.load[i](); }
  for (i in TMG.fn.ui[TMG.currentPage]) { TMG.fn.ui[TMG.currentPage][i](); }
  for (i in TMG.fn.ui.all) { TMG.fn.ui.all[i](); };

  // TMG.fn.initializeUi.setupMobileMenu();
  TMG.fn.initializeUi.onResize();
  // TMG.fn.initializeUi.onScroll();
  // TMG.fn.initializeUi.externalizeModalPopups();
  // TMG.fn.reactiveUi.setOnOrientationChange();

  $(".video-prev, .video-next").each(function(){ $(this).parent("a").appendTo("body"); });

});


TMG.fn.initializeUi.onResize = function() {
  if (!TMG.renderForMobile) {
    TMG.fn.reactiveUi.modifyOverWidthElements();
    $(window).resize(function(){
      clearTimeout(TMG.timer.windowResize);
      TMG.timer.windowResize = setTimeout(function(){
        TMG.fn.reactiveUi.modifyOverWidthElements();
      },100);
    });
  }
}

TMG.fn.initializeUi.onScroll = function() {
    $(window).scroll(function(){
      clearTimeout(TMG.timer.windowScroll);
      TMG.timer.windowScroll = setTimeout(function(){
        TMG.fn.reactiveUi.scrollQueues();
      },50);
    });
}

TMG.fn.initializeUi.hideMobileHeader = function() {
  setTimeout(function(){ window.scrollTo(0, 1); }, 50);
}

TMG.fn.initializeUi.setupMobileMenu = function() {
  if (TMG.renderForMobile) {
    TMG.fn.insertCss(TMG.cdn.tmgVendor+"/snap.js/1.9.2/snap.css");
    $.getScript(TMG.cdn.tmgVendor+"/snap.js/1.9.2/snap.min.js",function(){
      TMG.snapJsObj = new Snap({
        element: document.getElementById("tmg-container"),
        disable: "left"
      });
    });
    $(".masthead .menu-toggle").click(function(){
        TMG.snapJsObj.open("right");
    });
  }
}

TMG.fn.initializeUi.externalizeModalPopups = function() {
  $("#tmg-container .modal").each(function(){
    var modal = $(this).clone();
    $(modal).appendTo("body");
    $(this).remove();
  });
}


TMG.fn.reactiveUi.scrollQueues = function() {
  var scrollPosition = $(window).scrollTop() + $(window).height();
  for (func in TMG.scrollQueues) {
    if  (!TMG.scrollQueues[func].isLoaded) {
      var runAtPosition = (TMG.scrollQueues[func].whenVisible[TMG.currentPage]!=null) ? $(TMG.scrollQueues[func].whenVisible[TMG.currentPage]).offset().top : ((TMG.renderForMobile) ? TMG.scrollQueues[func].position : TMG.scrollQueues[func].mobilePosition);
      if (scrollPosition >= runAtPosition) {
        TMG.fn.reactiveUi[func]();
        TMG.scrollQueues[func].isLoaded = true;
      }
    }
  }
}

TMG.fn.reactiveUi.modifyOverWidthElements = function() {
  var newWidth = TMG.bodyWidth+TMG.overflowMarginWidth+Math.floor(($('body').innerWidth()-TMG.bodyWidth)/2);
  $(".dynamic-crop-right").css("width",newWidth);

   var bodyWidth = parseInt($('body').width());
   var containerLeft = parseInt($('.container').offset().left)+parseInt($('.container').css("padding-left"));

  $(".page-video-bttm").css({
      left:(0-containerLeft)+"px",
      width: (bodyWidth)+"px"
    })
    .find(".tmg-thmb img.video-frame-secondary").each(function(){
      var offset = $(this).position();
      if (offset.left !== offset.top) {
        if (offset.top > offset.left) { setSquImg(this,'ht'); } else { setSquImg(this,'wd'); }
      }
  });



  // var container = $("#tmg-container");
  // var margins = [parseInt(container.css("margin-left")),parseInt(container.css("margin-right"))];

  // if (margins[0] > 88) {
  //   $(".container").css("margin-left","88px");
  // } else if (margins[1] < 88) {
  //   $(".container").css("margin-left",margins[1]+"px");
  // }

}

TMG.fn.reactiveUi.setOnOrientationChange = function() {
  window.onorientationchange = function() {
    if (TMG.renderForTouch) {
      TMG.fn.video.init();
    }
  }
}

TMG.fn.insertCss = function(url) {
  var s = document.createElement("link");
  s.rel = "stylesheet"; s.type = "text/css"; s.async = true;
  var id = "css-"+Math.round(Math.random()*100000); s.id = id;
  s.href = url;
  var x = document.getElementsByTagName("head")[0]; x.appendChild(s);
}

TMG.fn.load.jqueryGalleria = function(){
  $.getScript(TMG.cdn.tmgVendor+"/galleria/1.3.5/galleria.min.js",function(){
    TMG.jqueryGalleria[0] = Galleria;
    TMG.jqueryGalleria[0].loadTheme(TMG.cdn.tmgVendor+"/galleria/1.3.5/themes/fullscreen/galleria.fullscreen.min.js");
    TMG.jqueryGalleria[0].configure({
        //imageCrop: true,
        transition: 'fade',
        transitionSpeed: TMG.slideShowTransitionSpeed,
        dataSort: 'random',
        autoplay: TMG.slideShowDelay,
        carousel: false
    });
    if (typeof tmgRules !== "undefined") {
      tmgRules.sort(TMG.randomSort);
      $('.rule-body').flowtype({
  //      minFont : 72,
        maxFont: 112,
        fontRatio: 10
        // maximum : 1200
      });
    }

    TMG.jqueryGalleria[0].on('image', function(e) {
      if (typeof tmgRules !== "undefined") {
        TMG.cycleBgImage();
      }
    });

    $(".bg-fadeout-gradient").each(function(){
      $(this).remove();
      $("body").append("<div class=\"bg-fadeout-gradient gradient\"></div>");
    });

    $(".bg-static").each(function(){
      $("body").append("<div class=\"bg-static\"><img src=\""+$(this).find("img").attr("src")+"\" /></div>");
      $(this).remove();
    });

    $(".galleria-bg").each(function(){
      $(this).css({width:TMG.bodyWidth+"px"});
      TMG.jqueryGalleria[0].run('.galleria-bg');
    });

  });
}

TMG.fn.load.bootstrapJs = function(){
  $.getScript(TMG.cdn.bootstrap+"/bootstrap/3.1.1/js/bootstrap.min.js");
}

TMG.fn.load.jqueryAnimateScroll = function(){
  $.getScript(TMG.cdn.tmgVendor+"/jquery-animate-scroll/1.0.5/animatescroll.js");
}

TMG.fn.load.browserDetect = function() {
  if (!TMG.renderForMobile) {
    $.getScript(TMG.cdn.tmgVendor+"/browser-detect/browser-detect.min.js",function(){
      if (BrowserDetect.browser==="Explorer") {
        if (BrowserDetect.version <= 8) {
          TMG.video.forceYouTube = true;
        }
        if (BrowserDetect.version <= 7) {
          TMG.regressFontAwesome();
        }
      }
  });}
}

TMG.cycleBgImage = function() {
  $(".rule-number").html("Rule #"+tmgRules[tmgCurrentRule].num);
  $(".rule-body-inner").html(tmgRules[tmgCurrentRule].rule);
  $(".rule-footer").html(tmgRules[tmgCurrentRule].motto);
  $(".home-rules").animate({opacity:0.90},500);
  var fadeOut = setTimeout(function(){
    $(".home-rules").animate({opacity:0},1000,function(){
      tmgCurrentRule++;
      if (tmgCurrentRule==tmgRules.length) { tmgCurrentRule=0; }
      tmgRules.sort(TMG.randomSort);
    });
  },TMG.slideShowDelay-1000);  
}

TMG.randomSort = function(a,b) {
    var temp = parseInt( Math.random()*10 );
    var isOddOrEven = temp%2;
    var isPosOrNeg = temp>5 ? 1 : -1;
    return( isOddOrEven*isPosOrNeg );
}

// TMG.toggleAddThis = function(onOff) {
//   var newDisplay = "none";
//   if (onOff) { newDisplay = "block"; }
//   $(".addthis-smartlayers-desktop").css("display",newDisplay);
// }

TMG.setDevMode = function() {
  if (typeof window.console === "undefined") { window.console = function(msg){ }; }
  window.devLog = function(msg){ if (TMG.nodeEnv!=="production") { console.log(msg); } };
  if (typeof window.analytics === "undefined") {
    window.analytics = { track: function(name,opt){ console.log("analytics: "+name); } }
  }
}

TMG.regressFontAwesome = function() {
  $("#font-awesome-4").remove();
  TMG.fn.insertCss(TMG.cdn.bootstrap+"/font-awesome/3.2.1/css/font-awesome.min.css");
  TMG.fn.insertCss(TMG.cdn.bootstrap+"/font-awesome/3.2.1/css/font-awesome-ie7.min.css");
  var classPairs = [
    ["fa-play-circle-o","icon-play-circle"],["fa-play","icon-play"],["fa-facebook-square","icon-facebook-sign"],
    ["fa-twitter-square","icon-twitter-sign"],["fa-google-plus-square","icon-google-plus-sign"],
    ["fa-instagram","icon-instagram"],["fa-linkedin-square","icon-linkedin-sign"],["fa-flickr","icon-flickr"],
    ["fa-github-square","icon-github-sign"],["fa-sort-up","icon-sort-up"]
  ];
  for (var i = 0; i < classPairs.length; i++) {
    $("."+classPairs[i][0]).addClass(classPairs[i][1]).removeClass("fa");    
  }
}


TMG.getBandwidthKb = function() {
  var kb = 0;
  if ((typeof foresight != "undefined") && (typeof foresight.connKbps != "undefined")) {
    var kb = Math.round(foresight.connKbps);
    if (kb==(TMG.speedTest.kB*8)) { kb = 0; }
    console.log("Bandwidth measured to be "+((kb==0) ? "very high" : (kb+"Kb/s")));
    analytics.track("bandwidth_test", { label: TMG.speedTest.kB+"KB_download", value: kb });
  } else {
    TMG.video.forceYouTube;
    console.log("Bandwidth measurements not yet available. Defaulting to higher bandwidth (for now).");
  }
  return kb;
}


TMG.fn.ui['work-single'].initVideo = function(){
  TMG.fn.video.init();
  TMG.fn.video.prepare();
}



TMG.fn.video.init = function(){
  // var videoJsVersion = "4.2.2";
  // TMG.fn.insertCss(TMG.cdn.videoJs+"/"+videoJsVersion+"/video-js.css");
  // $.getScript(TMG.cdn.videoJs+"/"+videoJsVersion+"/video.js",function(){
  //   if (TMG.cdn.videoJs.indexOf("//") == -1) { videojs.options.flash.swf = TMG.cdn.videoJs+"/"+videoJsVersion+"/video-js.swf"; }
    $.getScript("//jwpsrv.com/library/NG6cYIrNEeOAdyIACi0I_Q.js",function(){
 
      $.getScript(TMG.cdn.tmgVendor+"/foresight.js/2.0.0/foresight.min.js",function(){
        TMG.fn.video.initUI();
      });
 
    });
  // });
}


TMG.fn.video.initUI = function(){
  $(".video-player").each(function(){
    if (TMG.renderForTouch) {
      TMG.fn.video.place(this);
    } else {
      // var gPos = $(this).offset();
      // TMG.video.offset = [gPos.top, gPos.left, parseInt($(this).width())];
      $(this).find(".video-bttn").click(function(){ TMG.fn.video.place($(this).parent(".video-player")); });
    }
  });
}

TMG.fn.video.prepare = function() {

    // var refBox = $(".video-box-page");
    // $((RFCX.renderForMobile) ? "#rfcx-container" : "body").append(
    //     "<div class=\"video-box video-box-outer\""
    //       +" data-video-id=\""+refBox.attr("data-video-id")+"\""
    //       +" data-video-version=\""+refBox.attr("data-video-version")+"\""
    //       +" data-video-youtube=\""+refBox.attr("data-video-youtube")+"\""
    //       +" data-video-cc=\""+refBox.attr("data-video-cc")+"\""
    //       +" data-video-run-followup=\""+refBox.attr("data-video-run-followup")+"\""
    //       +">"
    //     +"<img src=\""+RFCX.cdn.rfcx+"/img/intro/16x9.16.gif\" class=\"rfcx-trans-50 video-box-bg\">"
    //     +"<i class=\"fa fa-play-circle-o\"></i>"
    //     +"</div>"
    //     +"<div class=\"video-box-outer-backdrop rfcx-trans-0\"></div>"
    //   );
    // $("#rfcx-container").append("<div class=\"video-box video-box-followup rfcx-trans-0 rfcx-crnr-10\"></div>");
    // RFCX.fn.video.followUp(false);
}


TMG.fn.video.place = function(containerObj) {

  var jqCont = $(containerObj);
  var vidDim = [jqCont.width(),jqCont.height()];
  var vidPos = [0,0];
  jqCont.css({width:vidDim[0]+"px",height:vidDim[1]+"px"});
  var vidId = jqCont.attr("data-video-id");
  var vidImg = jqCont.find(".poster-frame").attr("src");
  var hash = Math.round(Math.random()*10000000);

  if ((vidDim[0]/16) >= (vidDim[1]/9)) {
    //wider than 16x9
    vidPos[0] = Math.round((vidDim[0]-((vidDim[1]/9)*16))/2);
    vidDim[0] = Math.round((vidDim[1]/9)*16);
  } else {
    vidPos[1] = Math.round((vidDim[1]-((vidDim[0]/16)*9))/2);
    vidDim[1] = Math.round((vidDim[0]/16)*9);
  }

  jqCont.prepend("<style type=\"text/css\"> #video-player-"+vidId+"-"+hash+" { width:"+vidDim[0]+"px !important;height:"+vidDim[1]+"px !important;top:"+vidPos[1]+"px !important;left:"+vidPos[0]+"px !important; } </style>");

  jqCont.append("<div class=\"video-player-inner\" id=\"video-player-"+vidId+"-"+hash+"\"></div>");

  // var vidSources = [];
  // if (jqCont.attr("data-video-hd") != null) {
  //   vidSources[vidSources.length] = 
  // }

  if (!TMG.renderForTouch) {
    jwplayer("video-player-"+vidId+"-"+hash).setup({
      playlist: [{
        image: vidImg,
        sources: [{ 
          file: TMG.cdn.tmgStatic+"/video/"+vidId+"/"+jqCont.attr("data-video-hd")+".mp4",
          label: "720p HD"
        },{
          file: TMG.cdn.tmgStatic+"/video/"+vidId+"/"+jqCont.attr("data-video-sd")+".mp4",
          label: "360p SD"
        }]
      }],
      width: vidDim[0],
      height: vidDim[1],
      image: vidImg,
      autostart: true
    }).onComplete(function(){
      var id = $(this).attr("id");
      $("#"+id).remove();
      jqCont.find("img").animate({opacity:1},500);
    });

    jqCont.find("img").animate({opacity:0},1000);
  
  } else {

    // jqCont.find("#video-player-"+vidId+"-"+hash).html(""
    //   +"<video class=\"video-js vjs-default-skin\" controls preload=\"auto\">"

    //   +"</video>"
    //   );

  }



  // TMG.video.version = jqCont.attr("data-video-version");
  // TMG.video.cc = parseInt(jqCont.attr("data-video-cc"));
  // var wndw = [parseInt(jqCont.width()),Math.round(9*parseInt(jqCont.width())/16)];
  // var offset = [0,0];
  // if ((typeof jqCont.attr("data-video-height") != "undefined")) {
  //   wndw[1] = parseInt(jqCont.attr("data-video-height"));
  //   offset[0] = Math.round((16*wndw[1]/9-wndw[0])/2);
  //   wndw[0] = Math.round(16*wndw[1]/9);
  //   jqCont.css("overflow","hidden");
  // }
  // if ((typeof jqCont.attr("data-video-controls") != "undefined")) {
  //   TMG.video.controls = (parseInt(jqCont.attr("data-video-controls"))==1);
  // } else { TMG.video.controls = true; }
  // if ((typeof jqCont.attr("data-video-run-followup") != "undefined")) {
  //   TMG.video.runFollowUp = (parseInt(jqCont.attr("data-video-run-followup"))===1);
  // } else { TMG.video.runFollowUp = false; }

  // var sz = TMG.video.sizes, vidSz = sz[sz.length-1], bw = TMG.getBandwidthKb();
  // TMG.video.posterUri = TMG.cdn.tmgStatic+"/video/"+TMG.video.id+"/"+RFCX.video.id+"-poster.jpg?v="+RFCX.appVersion;
  // // set video size based on window width (or smallest for mobile devices)
  // if (RFCX.renderForMobile) { vidSz = sz[RFCX.video.mobileSize];
  // } else { for (var i = sz.length-1; i >= 0; i--) { if ((1.1 * sz[i][0]) >= wndw[0]) { vidSz = sz[i]; break; } } }
  // // Check bandwidth against bitrate of chosen size
  // if ((bw>0) && ((bw*1.33) <= vidSz[2])) {
  //   for (var i = 0; i < sz.length; i++ ) {
  //     if ((bw*1.33) > sz[i][2]) { vidSz = sz[i]; break; } else if (i==(sz.length-1)) { RFCX.video.forceYouTube = true; }
  //   }
  // }

     // var uriBase = RFCX.cdn.rfcxStatic+"/video/"+RFCX.video.id
     //     +"/v"+RFCX.video.version+"/"+RFCX.video.id+"-v"+RFCX.video.version+".",
     //     vidUri = uriBase + vidSz[1];
//     var vidUri = "//totalmediagroup.s3.amazonaws.com/video/shakey-neil-young-archives/Neil_Young_Archives_HD";

//     // console.log("window width: "+wndw[0]+" -> playing: "+vidSz[0]+"x"+vidSz[1]+" ("+vidSz[2]+"kb/s)");
//     var vttPreUri = "";
//     var playerHtml = "<video class=\"video-js vjs-default-skin\" controls preload=\"auto\""
//             +" id=\"tmg-video-player-"+TMG.video.id+"\""
//         //    +" poster=\""+RFCX.video.posterUri+"\""
//             +" width=\""+wndw[0]+"\" height=\""+wndw[1]+"\""
//             +" style=\"width:"+wndw[0]+"px;height:"+wndw[1]+"px;left:-"+offset[0]+"px;\""
//             +">"
//  //       +"<source src=\"//www.youtube.com/watch?v="+jqCont.attr("data-video-youtube")+"\" type=\"video/youtube\" />"
//         +"<source src=\""+vidUri+".mp4\" type=\"video/mp4\" />"
// //        +"<source src=\""+vidUri+".webm\" type=\"video/webm\" />"
// //        +"<source src=\""+vidUri+".flv\" type=\"video/flv\" />"
// //        +"<source src=\""+uriBase+"240.3gp\" type=\"video/3gp\" />"
//         +((RFCX.video.cc==0) ? "" : RFCX.fn.video.vttTags(["en"]))
//         +"</video>";
//     RFCX.video.previousHtml = jqCont.html();
//     jqCont.html(playerHtml);

//     videojs("rfcx-video-player-"+RFCX.video.id, { "techOrder": ["html5","flash","youtube"], "preload": "auto", "autoplay":true, "controls":RFCX.video.controls }).ready(function(){
//       RFCX.video.obj = this;
//       RFCX.video.obj.on("pause", function(){ RFCX.fn.video.paused(); });
//       RFCX.video.obj.on("ended", function(){ RFCX.fn.video.ended(); });
//       analytics.track("video_play", { label: RFCX.video.id });
//       devLog("video-loaded");
//     });


  // if (RFCX.video.runFollowUp) {
  //   RFCX.fn.video.htmlClose(jqCont);
  // }
}

