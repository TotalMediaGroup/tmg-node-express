var TMG = {
  currentPage: null,
  pageLoaded:new Date(),
  isIsolated: false,
  userLanguage: (window.navigator.userLanguage || window.navigator.language).substr(0,2).toLowerCase(),
  isHTTPS: (window.location.protocol.indexOf("https") > -1),
  fn: { load: {}, reactiveUi: {}, initializeUi: {}, video: {},
    ui: {
      all: {}/*, intro: {}, about: {}, get_involved: {}, team:{}, media: {}, video: {}*/
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

$(function(){
  
  $.ajaxSetup({ cache:true });
  
  TMG.setDevMode();

  TMG.renderForMobile = (parseInt($("body").css("min-width")) < 512);

  for (i in TMG.fn.load) { TMG.fn.load[i](); }
  for (i in TMG.fn.ui[TMG.currentPage]) { TMG.fn.ui[TMG.currentPage][i](); }
  for (i in TMG.fn.ui.all) { TMG.fn.ui.all[i](); };

  // TMG.fn.initializeUi.setupMobileMenu();
  // TMG.fn.initializeUi.onResize();
  // TMG.fn.initializeUi.onScroll();
  // TMG.fn.initializeUi.externalizeModalPopups();
  // TMG.fn.reactiveUi.setOnOrientationChange();

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
        fontRatio: 12
        // maximum : 1200
      });
    }

    TMG.jqueryGalleria[0].on('image', function(e) {
      if (typeof tmgRules !== "undefined") {
        TMG.cycleBgImage();
      }
    });

    $(".galleria-bg").css({width:TMG.bodyWidth+"px"});
    TMG.jqueryGalleria[0].run('.galleria-bg');
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
  $(".home-rules").animate({opacity:0.9},500);
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









$(".page-work .col-lg-12").isotope({
      itemSelector : '.video-browser-box',
      masonry : {
        columnWidth : 270
      },
      masonryHorizontal : {
        rowHeight: 320
      },
      cellsByRow : {
        columnWidth : 240,
        rowHeight : 240
      },
      cellsByColumn : {
        columnWidth : 240,
        rowHeight : 240
      },
      // getSortData : {
      //   symbol : function( $elem ) {
      //     return $elem.attr('data-symbol');
      //   },
      //   category : function( $elem ) {
      //     return $elem.attr('data-category');
      //   },
      //   number : function( $elem ) {
      //     return parseInt( $elem.find('.number').text(), 10 );
      //   },
      //   weight : function( $elem ) {
      //     return parseFloat( $elem.find('.weight').text().replace( /[\(\)]/g, '') );
      //   },
      //   name : function ( $elem ) {
      //     return $elem.find('.name').text();
      //   }
      // }
    });
    
    
      // var $optionSets = $('#options .option-set'),
      //     $optionLinks = $optionSets.find('a');

      // $optionLinks.click(function(){
      //   var $this = $(this);
      //   // don't proceed if already selected
      //   if ( $this.hasClass('selected') ) {
      //     return false;
      //   }
      //   var $optionSet = $this.parents('.option-set');
      //   $optionSet.find('.selected').removeClass('selected');
      //   $this.addClass('selected');
  
      //   // make option object dynamically, i.e. { filter: '.my-filter-class' }
      //   var options = {},
      //       key = $optionSet.attr('data-option-key'),
      //       value = $this.attr('data-option-value');
      //   // parse 'false' as false boolean
      //   value = value === 'false' ? false : value;
      //   options[ key ] = value;
      //   if ( key === 'layoutMode' && typeof changeLayoutMode === 'function' ) {
      //     // changes in layout modes need extra logic
      //     changeLayoutMode( $this, options )
      //   } else {
      //     // otherwise, apply new options
      //     $container.isotope( options );
      //   }
        
      //   return false;
      // });


    
      // change layout
      // var isHorizontal = false;
      // function changeLayoutMode( $link, options ) {
      //   var wasHorizontal = isHorizontal;
      //   isHorizontal = $link.hasClass('horizontal');

      //   if ( wasHorizontal !== isHorizontal ) {
      //     // orientation change
      //     // need to do some clean up for transitions and sizes
      //     var style = isHorizontal ? 
      //       { height: '80%', width: $container.width() } : 
      //       { width: 'auto' };
      //     // stop any animation on container height / width
      //     $container.filter(':animated').stop();
      //     // disable transition, apply revised style
      //     $container.addClass('no-transition').css( style );
      //     setTimeout(function(){
      //       $container.removeClass('no-transition').isotope( options );
      //     }, 100 )
      //   } else {
      //     $container.isotope( options );
      //   }
      // }


    
      // change size of clicked element
    //   $container.delegate( '.element', 'click', function(){
    //     $(this).toggleClass('large');
    //     $container.isotope('reLayout');
    //   });

    //   // toggle variable sizes of all elements
    //   $('#toggle-sizes').find('a').click(function(){
    //     $container
    //       .toggleClass('variable-sizes')
    //       .isotope('reLayout');
    //     return false;
    //   });


    
    //   $('#insert a').click(function(){
    //     var $newEls = $( fakeElement.getGroup() );
    //     $container.isotope( 'insert', $newEls );

    //     return false;
    //   });

    //   $('#append a').click(function(){
    //     var $newEls = $( fakeElement.getGroup() );
    //     $container.append( $newEls ).isotope( 'appended', $newEls );

    //     return false;
    //   });


    // var $sortBy = $('#sort-by');
    // $('#shuffle a').click(function(){
    //   $container.isotope('shuffle');
    //   $sortBy.find('.selected').removeClass('selected');
    //   $sortBy.find('[data-option-value="random"]').addClass('selected');
    //   return false;
    // });


  });


