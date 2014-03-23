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
  isotopeOptions: { itemSelector: '.video-browser-box', animationEngine: 'best-available', filter: '*' },
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
      },50);
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
    $(".back-to-menu").animate({opacity:0},100,function(){
      $(this).css({marginTop:scrollTop+"px"}).animate({opacity:1},1000);
    });

    if ((parseInt($(".video-prev").css("margin-top")) > 0) || ((scrollTop-190) > 0)) {
      $(".video-prev, .video-next").animate({opacity:0},100,function(){
          $(this).css({marginTop:( (scrollTop > 190) ? (scrollTop-190) : 0 )+"px"}).animate({opacity:1},1000);
      });
    }
  }
}

TMG.fn.reactiveUi.modifyOverWidthElements = function() {
  var newWidth = TMG.bodyWidth+TMG.overflowMarginWidth+Math.floor(($('body').innerWidth()-TMG.bodyWidth)/2);
  $(".dynamic-crop-right").css("width",newWidth);

   var bodyWidth = parseInt($('body').width());
   $('.container').each(function(){
    TMG.containerInfo.left = parseInt($(this).offset().left);
    TMG.containerInfo.padLeft = parseInt($(this).css("padding-left"));
    if (bodyWidth >= 1400) { $(this).addClass("wide-container"); } else { $(this).removeClass("wide-container"); }
   });


  $(".page-video-bttm").css({
      left:(0-TMG.containerInfo.left-TMG.containerInfo.padLeft)+"px",
      width: (bodyWidth)+"px"
    }).each(function(){

      $(".bg-static img").each(function(){
        var bgStatic = $(this).parent(".bg-static").offset();
        bgStaticResize(this,bgStatic.left,bgStatic.top);
      });

      if ($(".video-bttm-secondary-layout-corner").length > 0) {
        var textHeight = $(this).find(".clmn-lf-tp").innerHeight();
        if (textHeight > 0) { $(this).find(".clmn-lf").css({height:textHeight+"px"}); }
      }
      $(this).find(".tmg-thmb img.video-frame-secondary").each(function(){
        setSquImg(this);
      });
    });

  // if (TMG.currentPage == "work") {
  //   $(".page-work").css({minHeight:parseInt($(".galleria-container").innerHeight()-$(".page-work-nav").innerHeight()-88-90)+"px"});
  // }

  $(".body-home .bg-static img, .body-work .bg-static img, .body-about .bg-static img").each(function(){
    setSquImg(this);
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

  tmgRules.sort(TMG.randomSort); tmgRules.sort(TMG.randomSort); tmgRules.sort(TMG.randomSort);
  tmgBackgrounds.sort(TMG.randomSort); tmgBackgrounds.sort(TMG.randomSort); tmgBackgrounds.sort(TMG.randomSort);

  $(".body-home, .body-work").each(function(){

    if (TMG.currentPage === 'home') { 
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

}

TMG.fn.load.bootstrapJs = function(){
  $.getScript(TMG.cdn.bootstrap+"/bootstrap/3.1.1/js/bootstrap.min.js");
}

TMG.fn.load.jqueryAnimateScroll = function(){
  $.getScript(TMG.cdn.tmgVendor+"/jquery-animate-scroll/1.0.5/animatescroll.js");
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

TMG.setCurrentBackground = function() {

  TMG.bgImages.curr = new Image();
  TMG.bgImages.curr.onload = function(){ setSquImg(this); };
  TMG.bgImages.curr.src = TMG.cdn.tmgStatic+'/web/slideshowpredarkened/'+tmgBackgrounds[tmgCurrentBg]+'.jpg?v='+TMG.appVersion;
  $("#bg-static img").addClass("curr").animate({opacity:0},TMG.slideShowTransitionSpeed,function(){$(this).remove();});
  document.getElementById('bg-static').appendChild(TMG.bgImages.curr);

  tmgCurrentBg++;
  if (tmgCurrentBg==tmgBackgrounds.length) { tmgCurrentBg=0; }

  TMG.bgImages.next = new Image();
  TMG.bgImages.next.src = TMG.cdn.tmgStatic+'/web/slideshowpredarkened/'+tmgBackgrounds[tmgCurrentBg]+'.jpg?v='+TMG.appVersion;
}

TMG.setCurrentRule = function() {
  if (TMG.renderForMobile && (tmgRules[tmgCurrentRule].rule.length > 30)) { tmgCurrentRule++; }
  $(".rule-number").html("Rule #"+tmgRules[tmgCurrentRule].num);
  $(".rule-body-inner").html(tmgRules[tmgCurrentRule].rule);
  $(".rule-footer").html(tmgRules[tmgCurrentRule].motto);
  $(".home-rules").animate({opacity:0.95},Math.round(TMG.slideShowTransitionSpeed/2));
}

TMG.cycleBgImage = function() {

  TMG.setCurrentBackground();

  if (TMG.currentPage === 'home') {
    
    TMG.bgFadeIn = setTimeout(function(){
      TMG.setCurrentRule();
    }, Math.round(TMG.slideShowTransitionSpeed/2) );

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
        +"<div class=\"video-player-button video-player-button-fullscreen\" onClick=\"TMG.video.obj.requestFullScreen()\"><i class=\"fa fa-arrows-alt\"></i>FULL SCREEN</div>"
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
           +" data-setup=\"{'autoplay':true,'techOrder':['html5','flash']}\""
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
     });


}

TMG.fn.video.controls = function() {

}

TMG.fn.video.ended = function() {
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
    if (TMG.isotopeOptions.filter !== "*") {
      $(".page-work-nav .filter-"+TMG.isotopeOptions.filter.substr(1)).addClass("active");
    }
    $('.page-work').isotope(TMG.isotopeOptions);
    TMG.fn.reactiveUi.modifyOverWidthElements();
  }).trigger('hashchange');

  $('.page-work').isotope(TMG.isotopeOptions);
  TMG.fn.reactiveUi.modifyOverWidthElements();
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

TMG.aboutTeamSmallHeight = 0;

TMG.fn.aboutTeamExpand = function(obj) {
  var target = $(obj).parent(".team-member").find(".team-body");

  if (parseInt(target.css('height')) > 64) {
    target.css({height:TMG.aboutTeamSmallHeight+'px'});
    $(obj).css('top','0px').find("span").html("MORE");
    $(obj).find(".fa").replaceWith("<i class=\"fa fa-caret-down\"></i>");
  } else {
    TMG.aboutTeamSmallHeight = parseInt(target.css('height'));
    target.css({height:'auto'});
    $(obj).css('top','-36px').find("span").html("LESS");
    $(obj).find(".fa").replaceWith("<i class=\"fa fa-caret-up\"></i>");
  }
}

TMG.fn.aboutPopup = function(onOff, profileId) {
  if (onOff) {
    $(".tmg-popup-lf").html(""
      +"<img src=\""+TMG.cdn.tmgStatic+"/web/portraits/"+profileId+"-candid.jpg?v="+TMG.appVersion+"\" class=\"tmg-popup-img\" />"
      +"<a class=\"tmg-popup-email-lf\" target=\"_blank\" href=\""+$("#team-member-"+profileId+" .team-email").attr("href")+"\"><i class=\"fa fa-envelope\"></i></a>"
      +"<p class=\"tmg-popup-name-lf\">"+$("#team-member-"+profileId+" .team-name").html()+"</p>"
      +"<p class=\"tmg-popup-title-lf\">"+$("#team-member-"+profileId+" .team-title").html()+"</p>"
      +""
      );
    $(".tmg-popup-rt").html(""
      +"<p class=\"tmg-popup-name\">"+$("#team-member-"+profileId+" .team-name").html()+"</p>"
      +"<p class=\"tmg-popup-body\">"+$("#team-member-"+profileId+" .team-body").html()+"</p>"
      );

    $(".tmg-popup-container, .tmg-popup-bg").css({display:"block",opacity:0});
    $(".tmg-popup-container").animate({opacity:1},250);
    $(".tmg-popup-bg").animate({opacity:0.5},250);
  } else {
    $(".tmg-popup-container, .tmg-popup-bg").animate({opacity:0},250,function(){
      $(this).css({display:"none",opacity:0});
    });
  }
}

