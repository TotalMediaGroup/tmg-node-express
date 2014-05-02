var doc = document.documentElement.setAttribute('data-useragent', navigator.userAgent);

if (!$.support.transition)
  $.fn.transition = $.fn.animate;

var TMG = {
  currentPage: null,
  pageLoaded:new Date(),
  isIsolated: false,
  userLanguage: (window.navigator.userLanguage || window.navigator.language).substr(0,2).toLowerCase(),
  isHTTPS: (window.location.protocol.indexOf("https") > -1),
  fn: { load: {}, reactiveUi: {}, initializeUi: {}, video: {}, work: {},
    ui: {
      all: {}, 'work-single': {}, work: {}
    }
  },
  cdn: { tmg: null, tmgVendor: null, tmgStatic: null, bootstrap: null, cdnJs: null, videoJs: null },
  timer: { windowResize: null, windowScroll: null },
  bodyWidth: $('#tmg-container').innerWidth(),
  overflowMarginWidth: 250,
  renderForMobile: false,
  renderForTouch: $("html").hasClass("touch"),
  transitionAt: { intro: 418, about: 30, get_involved: 30, media: 30 },
  nodeEnv: null,
  appVersion: null,
  speedTest: { kB: 100, expireMinutes: 2 },
  snapJsObj: null,
  bgImages: {curr:null,next:null},
  slideShowDelay: 7000,
  slideShowTransitionSpeed: 4000,
  containerInfo: {left:0,padLeft:0,width:''},
  bgAspectRatio: 0,
  isotopeOptions: { itemSelector: '.video-browser-box', animationEngine: 'best-available', filter: '*', sortBy: '[data-sort] parseInt' },
//  bgImageDim: [$(".bg-static img").width(),$(".bg-static img").height()],
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
  TMG.fn.reactiveUi.modifyOverWidthElements();
  TMG.fn.initializeUi.onScroll();
  // TMG.fn.initializeUi.externalizeModalPopups();
  TMG.fn.reactiveUi.setOnOrientationChange();
  TMG.fn.initializeUi.hideMobileHeader();


  var footerBorderHeight = ((TMG.renderForMobile) ? 100 : 133);
  $(".page-design").each(function(){  
    $(".footer").css({borderTop:"solid "+footerBorderHeight+"px #cccccc",height:(footerBorderHeight+$(".footer").innerHeight())+"px"});
  });

  

});


TMG.fn.initializeUi.onResize = function() {
  if (!TMG.renderForMobile) {
    TMG.fn.reactiveUi.modifyOverWidthElements();
    $(window).resize(function(){
      clearTimeout(TMG.timer.windowResize);
      TMG.timer.windowResize = setTimeout(function(){
        TMG.fn.reactiveUi.modifyOverWidthElements();
      },30);
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
    // TMG.fn.insertCss(TMG.cdn.tmgVendor+"/snap.js/1.9.2/snap.css");
    // $.getScript(TMG.cdn.tmgVendor+"/snap.js/1.9.2/snap.min.js",function(){
    //   TMG.snapJsObj = new Snap({
    //     element: document.getElementById("tmg-container"),
    //     disable: "left"
    //   });
    // });
    // $(".masthead .menu-toggle").click(function(){
    //     TMG.snapJsObj.open("right");
    // });
  }
}

TMG.fn.initializeUi.externalizeModalPopups = function() {
  // $("#tmg-container .modal").each(function(){
  //   var modal = $(this).clone();
  //   $(modal).appendTo("body");
  //   $(this).remove();
  // });
}


TMG.fn.reactiveUi.scrollQueues = function() {
  var scrollTop = $(window).scrollTop();

  if (!TMG.renderForMobile && (TMG.currentPage == "work-single")) {
    // $(".back-to-menu").animate({opacity:0},100,function(){
    //   $(this).css({marginTop:scrollTop+"px"}).animate({opacity:1},1000);
    // });

    if (/*(parseInt($(".video-prev").css("margin-top")) > 0) || */((scrollTop) > 20)) {
      // $(".video-next").animate({opacity:0,right:"-70px"},250,function(){
      //     $(this).css({marginTop:( (scrollTop > 120) ? (scrollTop-120) : 0 )+"px"}).animate({opacity:1,right:"-20px"},250);
      // });
      // $(".video-prev").animate({opacity:0,left:"-70px"},250,function(){
      //     $(this).css({marginTop:( (scrollTop > 120) ? (scrollTop-120) : 0 )+"px"}).animate({opacity:1,left:"-20px"},250);
      // });
      // $(".video-prev, .video-next").animate({opacity:0},100,function(){
      //     $(this).css({marginTop:/*( (scrollTop > 88) ? (scrollTop-88) : 0 )*/scrollTop+"px"}).animate({opacity:1},1000);
      // });
      $(".video-prev img, .video-next img").animate({opacity:0.30},100);
    } else {
      $(".video-prev img, .video-next img").animate({opacity:1},100);
    }
  }
}

var bgStaticDim = [0,0];

var navHeight = $(".navbar-fixed-top").height();

TMG.fn.reactiveUi.modifyOverWidthElements = function() {
  var newWidth = TMG.bodyWidth+TMG.overflowMarginWidth+Math.floor(($('body').innerWidth()-TMG.bodyWidth)/2);
  $(".dynamic-crop-right").css("width",newWidth);

   var bodyWidth = parseInt($('body').width());
   $('.container').each(function(){
    TMG.containerInfo.left = parseInt($(this).offset().left);
    TMG.containerInfo.padLeft = parseInt($(this).css("padding-left"));
    if (bodyWidth >= 1400) { $(this).addClass("wide-container"); } else { $(this).removeClass("wide-container"); }
   });

  // if (TMG.currentPage === 'about') { 
  //   $(".bg-static").css({height:($(".footer").offset().top+300)+"px"});
  // }

  // if (TMG.currentPage === 'work-single') { 
  //   $(".header-corner").css({Math.floor($("#tmg-container").offset().left)+"px"});
  // }

  $(".page-video-bttm").css({
      left:(0-TMG.containerInfo.left-TMG.containerInfo.padLeft)+"px",
      width: (bodyWidth)+"px"
    }).each(function(){

      $(".bg-static img").each(function(){
        var bgStatic = $(this).parent(".bg-static").offset();
        bgStaticResize(this,parseInt($(this).css("left")),parseInt($(this).css("top")));
      });

      if ($(".video-bttm-secondary-layout-corner").length > 0) {
        var textHeight = $(this).find(".clmn-lf-tp").innerHeight();
        if (textHeight > 0) { $(this).find(".clmn-lf").css({height:textHeight+"px"}); }
      } else {
        var textHeight = $(this).find(".clmn-lf-tp").innerHeight();
        if (textHeight > 235) {
          $(this).find(".clmn-lf, .clmn-md, .clmn-rt").css({height:(420+textHeight-235)+"px"});
          $(this).find(".clmn-lf-bt>img, .clmn-md>img, .clmn-rt>img").each(function(){ setSquImg(this); });
        }
      }

    });

  $(".body-home .bg-static img, .body-work .bg-static img, .body-about .bg-static img").each(function(){
    if (this.complete) { setSquImg(this); }
  });

}

TMG.fn.reactiveUi.setOnOrientationChange = function() {
  window.onorientationchange = function() {
    TMG.fn.reactiveUi.modifyOverWidthElements();
    // if (TMG.renderForTouch) {
    //   TMG.fn.video.init();
    // }
  }
}

TMG.fn.insertCss = function(url) {
  var s = document.createElement("link");
  s.rel = "stylesheet"; s.type = "text/css"; s.async = true;
  var id = "css-"+Math.round(Math.random()*100000); s.id = id;
  s.href = url;
  var x = document.getElementsByTagName("head")[0]; x.appendChild(s);
}

TMG.fn.load.slideShowSetup = function(){

//  tmgRules.sort(randomSort);
//  tmgBackgrounds.sort(randomSort);

  $(".body-home, .body-work").each(function(){

    if ((TMG.currentPage === 'home') && (BrowserDetect.OS !== "Windows")) { 
      $('.rule-body').flowtype({ maxFont: 112, fontRatio: 10 });
    }

    TMG.cycleBgImage();

    $(".bg-fadeout-gradient").each(function(){
      $(this).remove();
      $("body").append("<div class=\"bg-fadeout-gradient gradient\"></div>");
    });

  });

  if (TMG.currentPage !== 'home') { 
    TMG.setCurrentRule();
    $(".footer .footer-rules").css({display:"block"});
  }


  $(".touch .body-work-single").each(function(){
    $.getScript(TMG.cdn.bootstrap+"/hammer.js/1.1.2/hammer.min.js",function(){
     
      var hammerLeft = Hammer(document.getElementById('body-work-single')).on("swipeleft", function(event) {
        $("#video-next-link").each(function(){
          window.location = $(this).attr("href");
        });
      });
      var hammerRight = Hammer(document.getElementById('body-work-single')).on("swiperight", function(event) {
        $("#video-prev-link").each(function(){
          window.location = $(this).attr("href");
        });
      });

    });
  });

}

TMG.fn.load.bootstrapJs = function(){
  $.getScript(TMG.cdn.bootstrap+"/bootstrap/3.1.1/js/bootstrap.min.js");
}

TMG.fn.load.jqueryAnimateScroll = function(){
  $.getScript(TMG.cdn.tmgVendor+"/jquery-animate-scroll/1.0.5/animatescroll.js");
}

TMG.fn.load.tmgClient = function(){
  if (TMG.currentPage === "client") {
    $.getScript(TMG.cdn.tmg+"/js/tmg-client.js",function(){
      TMG.fn.insertCss(TMG.cdn.tmg+"/css/tmg-client.css");
    });
  }
}

TMG.fn.load.jScrollPane = function(){
  if (TMG.currentPage === "about") {
    // TMG.fn.insertCss(TMG.cdn.tmgVendor+"/jscrollpane/2.0.19/jquery.jscrollpane.css");
    // $.getScript(TMG.cdn.tmgVendor+"/jscrollpane/2.0.19/mwheelIntent.js",function(){
    //   $.getScript(TMG.cdn.tmgVendor+"/jscrollpane/2.0.19/jquery.mousewheel.js",function(){
    //     $.getScript(TMG.cdn.tmgVendor+"/jscrollpane/2.0.19/jquery.jscrollpane.min.js",function(){
    //       $('.jscroll-pane').jScrollPane({
    //         showArrows: false
    //       });
    //       console.log("loaded jScrollPane");
    //     });
    //   });
    // });
  }
}



TMG.setCurrentBackground = function() {

  delete TMG.bgImages.curr;
  TMG.bgImages.curr = new Image();
  TMG.bgImages.curr.onload = function(){ setSquImg(this); };
  TMG.bgImages.curr.src = TMG.cdn.tmgStatic+'/web/slideshowpredarkened/'+tmgBackgrounds[tmgCurrentBg]+'.jpg?v='+TMG.appVersion;
  $("#bg-static img").addClass("curr").transition({opacity:0},TMG.slideShowTransitionSpeed,function(){ $(this).css({display:'none',width:'0px',height:'0px',zIndex:0}).each(function(){
     console.log("slideshow transitioned: "+$(this).css("z-index")); $(this).remove();
  }); });
  if (TMG.bgImages.curr.complete) { setSquImg(TMG.bgImages.curr); }
  document.getElementById('bg-static').appendChild(TMG.bgImages.curr);

  tmgCurrentBg++;
  if (tmgCurrentBg==tmgBackgrounds.length) { tmgCurrentBg=0; }


  delete TMG.bgImages.curr;
  TMG.bgImages.next = new Image();
  TMG.bgImages.next.src = TMG.cdn.tmgStatic+'/web/slideshowpredarkened/'+tmgBackgrounds[tmgCurrentBg]+'.jpg?v='+TMG.appVersion;
}

TMG.setCurrentRule = function() {
  if (TMG.renderForMobile && (tmgRules[tmgCurrentRule].rule.length > 30)) { tmgCurrentRule++; }
  if (BrowserDetect.OS === "Windows") {
    $(".rule-image").html("<img src=\""+TMG.cdn.tmgStatic+'/web/rules/'+tmgRules[tmgCurrentRule].img+'.png?v='+TMG.appVersion+"\" />");
    $(".rule-body, .rule-hr, .rule-number, .rule-footer").css({display:'none'});
  } else {
    $(".rule-image").css({display:'none'});
    $(".rule-number").html("Rule #"+tmgRules[tmgCurrentRule].num);
    $(".rule-body-inner").html(tmgRules[tmgCurrentRule].rule);
    $(".rule-footer").html(tmgRules[tmgCurrentRule].motto);
  }
  $(".home-rules").animate({opacity:0.95},Math.round(TMG.slideShowTransitionSpeed/2));
}

var tmgHomeRulesFirstRun = true;

TMG.cycleBgImage = function() {

  TMG.setCurrentBackground();

  if (TMG.currentPage === 'home') {

    TMG.bgFadeIn = setTimeout(function(){
      TMG.setCurrentRule();
    }, ( (tmgHomeRulesFirstRun) ? 20 : Math.round(TMG.slideShowTransitionSpeed/2) ) );
    tmgHomeRulesFirstRun = false;

    TMG.bgFadeOut = setTimeout(function(){
      $(".home-rules").animate({opacity:0},Math.round(TMG.slideShowTransitionSpeed/2),function(){
        tmgCurrentRule++;
        if (tmgCurrentRule==tmgRules.length) { tmgCurrentRule=0; }
      });
    }, (TMG.slideShowTransitionSpeed + TMG.slideShowDelay - Math.round(TMG.slideShowTransitionSpeed/2)));

  }

  TMG.bgNextImage = setTimeout(function(){
    TMG.cycleBgImage();
  }, (TMG.slideShowTransitionSpeed + TMG.slideShowDelay) );

}

TMG.incrementFooterRule = function() {
  $(".footer-rules").animate({opacity:0},Math.round(TMG.slideShowTransitionSpeed/6),function(){
    tmgCurrentRule++;
    if (tmgCurrentRule==tmgRules.length) { tmgCurrentRule=0; }
    if (TMG.renderForMobile && (tmgRules[tmgCurrentRule].rule.length > 30)) { tmgCurrentRule++; }
    $(".rule-number").html("Rule #"+tmgRules[tmgCurrentRule].num);
    $(".rule-body-inner").html(tmgRules[tmgCurrentRule].rule);
    $(".rule-footer").html(tmgRules[tmgCurrentRule].motto);
    $(".footer-rules").animate({opacity:0.95},Math.round(TMG.slideShowTransitionSpeed/6));
  });
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
//    TMG.video.forceYouTube;
    console.log("Bandwidth measurements not yet available. Defaulting to higher bandwidth (for now).");
  }
  return kb;
}


TMG.fn.ui['work-single'].initVideo = function(){
  TMG.fn.video.init();
  TMG.fn.video.prepare();
}



TMG.fn.video.init = function(){
   var videoJsVersion = "4.4.3";
   TMG.fn.insertCss(TMG.cdn.videoJs+"/"+videoJsVersion+"/video-js.css");
   $.getScript(TMG.cdn.videoJs+"/"+videoJsVersion+"/video.js",function(){
     if (TMG.cdn.videoJs.indexOf("//") == -1) { videojs.options.flash.swf = TMG.cdn.videoJs+"/"+videoJsVersion+"/video-js.swf"; } 
      $.getScript(TMG.cdn.tmgVendor+"/foresight.js/2.0.0/foresight.min.js",function(){
        TMG.fn.video.initUI();
      });
 
    });
}


TMG.fn.video.initUI = function(){
  $(".video-player").each(function(){
    // if (TMG.renderForTouch) {
    //   TMG.fn.video.place(this);
    // } else {
      $(this).find(".video-bttn").click(function(){ TMG.fn.video.place($(this).parent(".video-player")); });
    // }
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

  if ($(".video-player-inner").length > 0) {
    TMG.fn.video.ended();
  }

  var jqCont = $(containerObj);
  var vidDim = [jqCont.outerWidth(),jqCont.outerHeight()];
  var absDim = [vidDim[0],vidDim[1]];
  var vidPos = [0,0];
  // jqCont.css({width:vidDim[0]+"px",height:vidDim[1]+"px"});
  var vidId = jqCont.attr("data-video-id");
  var vidImg = jqCont.find(".poster-frame").attr("src");
  var hash = Math.round(Math.random()*10000000);

  if ((vidDim[0]/16) >= (vidDim[1]/9)) {
    //wider than 16x9
    vidPos[0] = 100*((vidDim[0]-((vidDim[1]/9)*16))/2)/vidDim[0];
    vidDim[0] = 100*((vidDim[1]/9)*16)/vidDim[0];
    vidPos[1] = 0;
    vidDim[1] = 100;
    absDim[0] = Math.round((vidDim[0]/100)*absDim[0]);
  } else {
    vidPos[1] = 100*((vidDim[1]-((vidDim[0]/16)*9))/2)/vidDim[1];
    vidDim[1] = 100*((vidDim[0]/16)*9)/vidDim[1];
    vidPos[0] = 0;
    vidDim[0] = 100;
    absDim[1] = Math.round((vidDim[1]/100)*absDim[1]);
  }

  jqCont.append("<div class=\"video-player-inner\" id=\"video-player-"+vidId+"-"+hash+"\""
           +" style=\"width:"+vidDim[0]+"%;height:"+vidDim[1]+"%;top:"+vidPos[1]+"%;left:"+vidPos[0]+"%;\""
        +"></div>"
        +"<div class=\"video-player-button video-player-button-fullscreen non-mobile-only\" onClick=\"TMG.video.obj.requestFullScreen()\"><i class=\"fa fa-arrows-alt\"></i>"/*+"FULL SCREEN"*/+"</div>"
//        +"<div class=\"video-player-button video-player-button-playback\" onClick=\"TMG.fn.video.ended()\">STOP<i class=\"fa fa-pause\"></i></div>"
        );

  jqCont.find("img, span, .video-bttn").animate({opacity:0},1000,function(){jqCont.find(".video-bttn, .bracket").css({display:"none"})});
  if (jqCont.parents(".page-video-bttm").length > 0) {
    jqCont.parents(".page-video").find(".page-video-bttm .fader-block, .page-video-bttm-row-2 .fader-block")
      .css({display:'block',opacity:0}).animate({opacity:0.75},1000);
    var fullScreenBttn = $(".video-player-button-fullscreen");
    fullScreenBttn.css({bottom:vidPos[1]+"px",right:vidPos[0]+"px",left:"auto",color:((vidPos[0] > 0) ? "transparent" : "#cccccc")});
  }
  jqCont.find(".video-player-button").css({opacity:0,display:'block'}).animate({opacity:0.9},1000);

  jqCont.find("#video-player-"+vidId+"-"+hash).html(""
    +"<video class=\"video-js vjs-default-skin video-js-"+vidId+"\" controls preload=\"auto\""
           +" id=\"video-player-"+vidId+"-"+hash+"-obj\""
           +" poster=\""+vidImg+"\""
           +" width=\""+absDim[0]+"\" height=\""+absDim[1]+"\""
           +" data-setup=\"{'autoplay':true,'techOrder':["
            + ((BrowserDetect.OS==="Windows") ? "" : "'html5',")
            +"'flash']}\""
           +">"
      +"<source src=\""
        +"https:"+TMG.cdn.tmgStatic+"/video/"+vidId+"/"+jqCont.attr("data-video-hd")+".mp4"
      +"\" type=\"video/mp4\" />"
    +"</video>");

    TMG.video.id = vidId;

    videojs("video-player-"+vidId+"-"+hash+"-obj").ready(function(){
        TMG.video.obj = this;
        TMG.video.obj.on("pause", function(){ TMG.fn.video.paused(); });
        TMG.video.obj.on("ended", function(){ TMG.fn.video.ended(); });
        analytics.track("video_play", { label: TMG.video.id });
        devLog("video-loaded");
        TMG.video.obj.play();
        if (TMG.renderForMobile) { TMG.video.obj.requestFullScreen(); }
     });

    $(document).bind('keyup',function(pressed){
      if (pressed.which == 27) {
        pressed.preventDefault();
        TMG.fn.video.ended();
      }
    });

}

TMG.fn.video.controls = function() {

}

TMG.fn.video.ended = function() {
    $(document).unbind('keyup');
    $(".video-js-"+TMG.video.id).parents(".video-player").each(function(){
      $(this).find(".video-player-inner").remove();
      $(this).find("img, span, .video-bttn").css({display:"block"}).animate({opacity:1},500);
      $(this).parents(".page-video").find(".page-video-bttm .fader-block, .page-video-bttm-row-2 .fader-block")
        .animate({opacity:0},500,function(){ $(this).css({display:'none'}); });
      $(this).find(".video-player-button").animate({opacity:0},500,function(){$(this).remove();});
    });
    TMG.fn.video.reset();
}

TMG.fn.video.paused = function() {
  analytics.track("video_pause", { label: TMG.video.id });
  if (TMG.renderForTouch && !TMG.fn.video.isFullScreen()){
//    $(".video-box-page").each(function(){ $(this).html(RFCX.video.previousHtml); });
  }
}

TMG.fn.video.reset = function() {
  if (TMG.video.obj != null) {
    analytics.track("video_stop", { label: TMG.video.id });
    if (typeof TMG.video.obj.dispose != "undefined") { TMG.video.obj.dispose(); }
    TMG.video.obj = null;
  } else {
    analytics.track("video_stop", { label: TMG.video.id });
  }
}


TMG.fn.video.isFullScreen = function() {
  var rtrn = false;
  if (TMG.renderForTouch) {
    $("video").each(function(){
      rtrn = this.webkitDisplayingFullscreen;
    });
  }
  return rtrn;
}

TMG.fn.video.percentComplete = function() {
  var currTime = 1, duration = 1, pct = 0;
  if (typeof TMG.video.obj.currentTime != "undefined") {
    currTime = TMG.video.obj.currentTime();
    duration = TMG.video.obj.duration();
  } else if (typeof TMG.video.obj.getCurrentTime != "undefined") {
    currTime = TMG.video.obj.getCurrentTime();
    duration = TMG.video.obj.getDuration();
  }
  pct = Math.round(100*currTime/duration);
  return pct;
}

TMG.fn.ui.work.setupVideoMenu = function() {

  $(window).bind('hashchange', function(event){
    var hashOptions = $.deparam.fragment();
    for (i in hashOptions) {
      TMG.isotopeOptions.filter = ((i==="*") ? "" : ".")+i;
    }

    $(".page-work-nav a").removeClass("active");

    if (TMG.isotopeOptions.filter == ".search") {
      $(".page-work-nav .filter-search").addClass("active");
      if ($("#work-search").val().length < 3) {
        TMG.isotopeOptions.filter = "*";
      }
    } else if (TMG.isotopeOptions.filter !== "*") {
      $(".page-work-nav .filter-"+TMG.isotopeOptions.filter.substr(1)).addClass("active");
      TMG.fn.workSearch(false);
    } else {
      $(".page-work-nav .filter-all").addClass("active");
      TMG.fn.workSearch(false);
    }

    $('.page-work').isotope(TMG.isotopeOptions);
    TMG.fn.reactiveUi.modifyOverWidthElements();
  }).trigger('hashchange');

  $('.page-work').isotope(TMG.isotopeOptions);
  $(".page-work-nav a").removeClass("active");
  TMG.fn.reactiveUi.modifyOverWidthElements();
}

TMG.fn.workSearchFocus = function(onOff) {
  
  if (onOff) {

  } else if ($("#work-search").val().length < 3) {
//    TMG.fn.workSearch(false);
  }

}


// TMG.fn.work.filterVideos = function(filter) {

//   $(".page-work-nav a").removeClass("active");

//   if ((filter== null) || (filter == 'reset')) {
//     $('.page-work').isotope(TMG.isotopeOptions); 
//   } else {
//     $(".page-work-nav .filter-"+filter).addClass("active");
//     $('.page-work').isotope(TMG.isotopeOptions);
//   }

//   TMG.fn.reactiveUi.modifyOverWidthElements();

// }

// TMG.aboutTeamSmallHeight = 0;

// TMG.fn.aboutTeamExpand = function(obj) {
//   var target = $(obj).parent(".team-member").find(".team-body");

//   if (parseInt(target.css('height')) > 64) {
//     target.css({height:TMG.aboutTeamSmallHeight+'px'});
//     $(obj).css('top','0px').find("span").html("MORE");
//     $(obj).find(".fa").replaceWith("<i class=\"fa fa-caret-down\"></i>");
//   } else {
//     TMG.aboutTeamSmallHeight = parseInt(target.css('height'));
//     target.css({height:'auto'});
//     $(obj).css('top','-36px').find("span").html("LESS");
//     $(obj).find(".fa").replaceWith("<i class=\"fa fa-caret-up\"></i>");
//   }
// }

var workSearchSet = false;

TMG.fn.workSearch = function(onOff) {
  if (onOff) {
    if (!workSearchSet) {
      $("#work-search").keyup(function(pressed){
        if (pressed.which == 13) {
          pressed.preventDefault();
        } else if (pressed.which == 27) {
          pressed.preventDefault();
          TMG.fn.workSearch(false);
          window.location.hash = "#*";
          $(window).trigger('hashchange');
        } else {
          var val = $(this).val().toLowerCase();
          if (val.length >= 1) { $(".work-search-clear").css({opacity:1}); }
          if (val.length >= 3) {
            $(".video-browser-box").each(function(){
              var domObj = $(this);
              domObj.removeClass("search");
              var id = domObj.attr("id");
              var cnt = ( 0
                + ( 10 * S(domObj.attr("data-title")).count(val) )
                + ( 7 * S(domObj.attr("data-one-liner")).count(val) )
                + ( 3 * S(domObj.attr("data-primary-text")).count(val) )
                + ( 2 * S(domObj.attr("data-misc")).count(val) )
                + ( 1 * S(domObj.attr("data-secondary-text")).count(val) )
                );
              
              if (cnt > 0) {
                domObj.addClass("search");
              }
              domObj.attr("data-sort",""+(9999-cnt));
            });
          }
          window.location.hash = "#search";
          $(window).trigger('hashchange');

        }
      });
    }

    $(".work-search-label .fa-search").animate({right:"-16px"},"fast",function(){
      $(".work-search-label").addClass("work-search-label-active");
    });

    $(".work-search").animate({opacity:0.5});
    $(".page-work-nav a").removeClass("active");
    $(".page-work-nav a.filter-search").addClass("active");

  } else {
    $(".work-search-label .fa-search").animate({right:"-8px"},"fast",function(){
      $(".work-search-label").removeClass("work-search-label-active");
    });
    $(".work-search, .work-search-clear").animate({opacity:0});
    $("#work-search").val("");
  }
}

TMG.fn.aboutPopup = function(onOff, profileId) {
  if (onOff) {
    $(".tmg-popup-lf").html(""
      +"<span class=\"bracket-popup\">[</span>"
      +"<img src=\""+TMG.cdn.tmgStatic+"/web/portraits/"+profileId+"-candid.jpg?v="+TMG.appVersion+"\" class=\"tmg-popup-img\" />"
      +"<p class=\"tmg-popup-name-lf\">"+$("#team-member-"+profileId+" .team-name").html()+"</p>"
      +"<p class=\"tmg-popup-title-lf\">"+$("#team-member-"+profileId+" .team-title").html()+"</p>"
      +"<p class=\"tmg-popup-bracket-lf\"><span>[</span></p>"
      +"<a class=\"tmg-popup-email-lf\" target=\"_blank\" href=\""+$("#team-member-"+profileId+" .team-email").attr("href")+"\">"+$("#team-member-"+profileId+" .team-email").attr("href").substr(7)+" <i class=\"fa fa-envelope\"></i></a>"
      +""
      );
    $(".tmg-popup-rt").html(""
      +"<p class=\"tmg-popup-name\">"+$("#team-member-"+profileId+" .team-name").html()+"</p>"
      +"<p class=\"tmg-popup-body\">"+$("#team-member-"+profileId+" .team-body").html()+"</p>"
      );

    $(".tmg-popup-container, .tmg-popup-bg").css({display:"block",opacity:0});
    $(".tmg-popup-container").animate({opacity:1},250);
    $(".tmg-popup-bg").animate({opacity:0.5},250);
    
    $(document).bind('keyup',function(pressed){
      if (pressed.which == 27) {
        pressed.preventDefault();
        TMG.fn.aboutPopup(false);
      }
    });

  } else {
    $(".tmg-popup-container, .tmg-popup-bg").animate({opacity:0},250,function(){
      $(this).css({display:"none",opacity:0});
      $(document).unbind('keyup');
    });
  }
}

var iWebkit;if(!iWebkit){iWebkit=window.onload=function(){function fullscreen(){var a=document.getElementsByTagName("a");for(var i=0;i<a.length;i++){if(a[i].className.match("noeffect")){}else{a[i].onclick=function(){window.location=this.getAttribute("href");return false}}}}function hideURLbar(){window.scrollTo(0,0.9)}iWebkit.init=function(){fullscreen();hideURLbar()};iWebkit.init()}}


