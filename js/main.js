// ELEMENTS

var bodyEl = $('body');
var htmlEl = $('html');
var touchActive;
if (htmlEl.hasClass('touchevents')) {
	touchActive = 'active';
}
var is_chrome;
var dataPage = $('body').attr('data-page');
var jsScrollingContent = $('.js-scrolling-content');

// BASE VARS
var handCursorX = 0;
var handCursorY = 0;
var windowWidth;
var windowHeight;
var halfWindowWidth;
var halfWindowHeight;

// ALL PAGE ELEMENTS
var jsReturnToTop 		= $('.js-return-to-top');
var pageOutLoad 		= $('.page-out-load');

// RECENT WORK ON HOME
var recentWorkMask1 	= $('.js-sliced-img-mask-1');
var recentWorkMask2 	= $('.js-sliced-img-mask-2');
var recentWorkMask1Img 	= $('.js-sliced-img-mask-1 .sliced-img');
var recentWorkMask2Img 	= $('.js-sliced-img-mask-2 .sliced-img');
var recentWorkBgImg 	= $('.bg-img-wrap .bg-img');
var jsRecentProjects = $('.recent-work-carousel');
var jsPrevRecentProject = $('.js-prev-recent-project');
var jsNextRecentProject = $('.js-next-recent-project');
var activeRecentProject = 1;
var totalRecentProjects = 3;

// MOB MENUS
var jsMobNavBtn = $('.js-mob-nav-btn');
var jsMobNav 	= $('.js-mob-nav');

// HOME MOUNTAIN SCENE
var jsHomeScene 		= $('.home-scene');
var jsHomeFadeout		= $('.js-home-fadeout');
var jsHomeSceneBG 		= $('.home-scene-bg');
var jsHomeSceneMidGround = $('.home-scene-mid-ground');
var jsHomeSceneMidMountains = $('.home-scene-mid-mountains');
var jsHomeSceneMountains = $('.home-scene-mountains');
var homeHeaderScrollGap;
var homeSceneFadeBuffer;
var homeSceneFadeStart;
var jsScrollDown = $('.js-scroll-down');
var jsScrollWrap = $('.js-scroll-wrap');

// GENERIC CAROUSEL OF IMAGES
var jsImgCarousel = $('.js-image-carousel');
var totalImgCarouselImgs;
var jsNextCarouselImg = $('.js-next-carousel-img');
var jsPrevCarouselImg = $('.js-prev-carousel-img');
var jsCurrentCarouselImg = 1;
var jsSwipeCarousel = $('.js-swipe-carousel');

var jsImgCarousel2 = $('.js-image-carousel-2');
var totalImgCarousel2Imgs;
var jsNextCarousel2Img = $('.js-next-carousel-2-img');
var jsPrevCarousel2Img = $('.js-prev-carousel-2-img');
var jsCurrentCarousel2Img = 1;
var jsCarousel2NavBtn = $('.js-carousel-2-nav a');
var jsSwipeCarousel2 = $('.js-swipe-carousel-2');

var jsCaseStudyCarouselImg = 1;
var jsPrevStudyCarousel = $('.js-prev-study-carousel');
var jsNextStudyCarousel = $('.js-next-study-carousel');
var jsCaseStudyCarouselNavBtn = $('.js-carousel-nav a');
var jsActiveOnScroll = $('.js-active-on-scroll');
var jsSwipeCaseStudy = $('.js-swipe-case-study');

if (dataPage == 'cases') {
	var jsViewProject = $('.js-view-project');
}

if (dataPage == 'project') {
	var jsProjectElement = $('.js-project-element');
	var projectHeaderBGimg = $('.project-header-bg-img');
	projectScrollInterval();
}

var queue = new createjs.LoadQueue(true);
var scrollcontainer = document.getElementById('ps-scroll-container');
Ps.initialize(scrollcontainer);

$(document).ready(function() {

	loadSite();
	detectBrowser();
	sizeHandler();

	if (jsImgCarousel.length) {
		totalImgCarouselImgs = $('.js-carousel-count li').length;
		$('.js-carousel-nav li').each(function() {
			thisIndex = $(this).index() + 1;
	      	if (thisIndex > totalImgCarouselImgs) {
	      		
	      		$(this).remove();
	      	}
	    });
	}

	if (jsImgCarousel2.length) {
		totalImgCarousel2Imgs = $('.js-carousel-2-count li').length;
		$('.js-carousel-2-nav li').each(function() {
			thisIndex = $(this).index() + 1;
	      	if (thisIndex > totalImgCarousel2Imgs) {
	      		
	      		$(this).remove();
	      	}
	    });
	}

	if (dataPage == 'home') {
		if ( touchActive == 'active' ) {
			mobHomeScrollInterval();
		} else {
			mouseCursorFollowerInterval();
			homeScrollInterval();
		}
	}

	if (dataPage == 'about') {
		if ( touchActive == 'active' ) {
		} else {
			aboutCursorFollowerInterval();
		}	
	}

	if (dataPage == 'contact' || dataPage == "about" || dataPage == "cases") {
		genericScrollInterval();
	}

	if (dataPage == 'cases') {
		jsViewProject.on('mouseenter', function(e){
			$(this).closest('.cases-project-slide').addClass('hover');
		});
		jsViewProject.on('mouseleave', function(e){
			$(this).closest('.cases-project-slide').removeClass('hover');
		});
	}

	if (dataPage == 'project') {
		projectScrollInterval();
	}

	if ( touchActive == 'active' ) {
		mobNavScrollInterval();
	}

	// BUTTONS

	$('a').click(function(e) {
		thisTarget = $(this).attr('target');
		thisHref = $(this).attr('href');
		if (thisTarget!="_blank" && thisHref.indexOf('mailto') == -1 && thisHref.indexOf('tel:') == -1) {
			e.preventDefault();
			if (thisHref!='#') {
				pageLinkTransition(thisHref);
			}
		}
	}); 

	jsMobNavBtn.on('click', function(e){
		if (jsMobNav.attr('data-active') == "off") {
			dataActiveOn(jsMobNav);
			dataActiveOn($(this));
		} else {
			dataActiveOff(jsMobNav);
			dataActiveOff($(this));
		}
	});

	jsScrollDown.on('click', function(e){
		scrollToElement = '.' + $(this).attr('data-scroll-to-element');
		scrollSpeed = parseInt($(this).attr('data-scroll-speed'));
		scrollToVal = $(scrollToElement).offset().top - (windowHeight * 0.3);

	    if ( touchActive == 'active' ) {
			setTimeout(function(){
				jsScrollingContent.animate({
			        scrollTop: scrollToVal
			    }, scrollSpeed, 'easeInOutCirc');
		    }, 10);
		} else {
			jsScrollingContent.animate({
		        scrollTop: scrollToVal
		    }, scrollSpeed, 'easeInOutCirc');
		}
	});

	jsReturnToTop.on('click', function(e){
		scrollToVal = 0;
		jsScrollingContent.animate({
	        scrollTop: scrollToVal
	    }, 1050, 'easeInOutCirc');
	});

	jsPrevRecentProject.on('click', function(e){
		activeRecentProject -= 1;
		if (activeRecentProject < 1) {
			activeRecentProject = totalRecentProjects;
		}
		jsRecentProjects.attr('data-active-project', activeRecentProject);
	});

	jsNextRecentProject.on('click', function(e){
		activeRecentProject += 1;
		if (activeRecentProject > totalRecentProjects) {
			activeRecentProject = 1;
		}
		jsRecentProjects.attr('data-active-project', activeRecentProject);
	});

	// ---------

	jsPrevStudyCarousel.on('click', function(e){
		jsCaseStudyCarouselImg -= 1;
		if (jsCaseStudyCarouselImg < 1) {
			jsCaseStudyCarouselImg = 5;
		}
		jsImgCarousel.attr('data-active-case-carousel-img', jsCaseStudyCarouselImg);
	});

	jsNextStudyCarousel.on('click', function(e){
		jsCaseStudyCarouselImg += 1;
		if (jsCaseStudyCarouselImg > 5) {
			jsCaseStudyCarouselImg = 1;
		}
		jsImgCarousel.attr('data-active-case-carousel-img', jsCaseStudyCarouselImg);
	});
 
	jsPrevCarouselImg.on('click', function(e){
		prevCarouselImg();
	});

	jsNextCarouselImg.on('click', function(e){
		nextCarouselImg();
	});

	jsCaseStudyCarouselNavBtn.on('click', function(e){
		caseStudyCarouselNo = $(this).attr('data-active-case');
		jsCaseStudyCarouselImg = caseStudyCarouselNo;
		jsImgCarousel.attr('data-active-case-carousel-img', caseStudyCarouselNo);
	});

	// ----- CAR 2

	jsPrevCarousel2Img.on('click', function(e){
		jsCurrentCarousel2Img -= 1;
		if (jsCurrentCarousel2Img < 1) {
			jsCurrentCarousel2Img = totalImgCarousel2Imgs;
		}
		jsImgCarousel2.attr('data-active-case-carousel-img', jsCurrentCarousel2Img);
	});

	jsNextCarousel2Img.on('click', function(e){
		jsCurrentCarousel2Img += 1;
		if (jsCurrentCarousel2Img > totalImgCarousel2Imgs) {
			jsCurrentCarousel2Img = 1;
		}
		jsImgCarousel2.attr('data-active-case-carousel-img', jsCurrentCarousel2Img);
	});

	jsCarousel2NavBtn.on('click', function(e){
		caseStudyCarousel2No = $(this).attr('data-active-case');
		jsCaseStudyCarousel2Img = caseStudyCarousel2No;
		jsImgCarousel2.attr('data-active-case-carousel-img', caseStudyCarousel2No);
	});

	if (dataPage == 'home' || dataPage == "about" || dataPage == "project") {
		jsSwipeCarousel.swipe( {
		    swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
				if (direction =="left") {
					nextCarouselImg();
				} else if (direction =="right") {
					prevCarouselImg();
				}
			}
		});
	}

	

	jsSwipeCaseStudy.swipe( {

	    swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
			if (direction =="left") {
				activeRecentProject += 1;
				if (activeRecentProject > totalRecentProjects) { 
					activeRecentProject -= 1; 
				} else {
					jsRecentProjects.attr('data-active-project', activeRecentProject);
				}
				
			} else if (direction =="right") {
				activeRecentProject -= 1;
				if (activeRecentProject < 1) {
					activeRecentProject += 1
				} else {
					jsRecentProjects.attr('data-active-project', activeRecentProject);
				}
			}
		}
	});

});

function sizeHandler() {
	windowWidth = $(window).innerWidth();
	windowHeight = $(window).height();
	halfWindowWidth = windowWidth / 2;
	halfWindowHeight = windowHeight / 2;
	homeHeaderScrollGap = $('.js-home-header-gap').height();

	innerWindowHeight = $(window).innerHeight();
	$('.js-full-height').each(function() {
      	$(this).css({ 
		    'height' : innerWindowHeight
	    });
    });

    if ( touchActive == 'active' ) {
		arrowTop = innerWindowHeight - 70;
		$('.js-scroll-wrap').css({ 
		    'top' : arrowTop
	    });
	}

	// LOWER BLENDS SOONER
	homeSceneFadeBuffer = homeHeaderScrollGap / 5; // THE DISTANCE COVERED BY THE FADE OUT

	// LOWER BLENDS SLOWER
	homeSceneFadeStart = homeHeaderScrollGap - (homeSceneFadeBuffer*3); // THE NUMBER NEEDED TO CALCULATE THE FADE
}

$(window).resize(function() {

	sizeHandler();

}); // END OF RESIZE

$(window).scroll(function() {

});  // END OF SCROLL

function mouseCursorFollowerInterval() {
	
	htmlEl.mousemove(function(e) {
	  	handCursorX = e.pageX;
    	handCursorY = e.pageY;
    });
    mask1Shift = ((handCursorY - halfWindowHeight) * -0.07) - 10;
    mask1ImgShift = mask1Shift * 1.2;
    mask2Shift = ((handCursorY - halfWindowHeight) * 0.07) + 10;
    mask2ImgShift = mask2Shift * 1.2;
    // maskImgBGShift = 1 + (handCursorY / 7500);

    TweenMax.to(recentWorkMask1, 
		1, {
			y: mask1Shift
		}
	);
	TweenMax.to(recentWorkMask2, 
		1, {
			y: mask2Shift
		}
	);
	TweenMax.to(recentWorkMask2Img, 
		1, {
			y: mask1ImgShift
		}
	);
	TweenMax.to(recentWorkMask1Img, 
		1, {
			y: mask2ImgShift
		}
	);

	// TweenMax.to(recentWorkBgImg, 
	// 	3, {
	// 		scaleX: maskImgBGShift,
	// 		scaleY: maskImgBGShift
	// 	}
	// );

	setTimeout(function(){
		mouseCursorFollowerInterval();
    }, 5);

}

function aboutCursorFollowerInterval() {
	htmlEl.mousemove(function(e) {
	  	handCursorX = e.pageX;
    	handCursorY = e.pageY;
    });
    stickShiftY = (handCursorY - halfWindowHeight) * -0.14;
    stickShiftX = (handCursorX - halfWindowHeight) * -0.14;
    stickShiftRotate = (stickShiftX * stickShiftY) * 0.03;
    TweenMax.to($('.stick-mask-stick'), 
		1.4, {
			// x: stickShiftX,
			// y: stickShiftY,
			rotation: stickShiftRotate
		}
	);
	setTimeout(function(){
		aboutCursorFollowerInterval();
    }, 5);
}

// SCROLL SCENE ON HOME
function homeScrollInterval() {
	scrollYPos = jsScrollingContent.scrollTop();

    // if (scrollYPos >= homeHeaderScrollGap) {
    // 	// $('.js-blackout').attr('data-blackout', 'on');
    // } else {
    	// $('.js-blackout').attr('data-blackout', 'off');

	// DO PARALLAX STUFF WHEN BLACKOUT INACTIVE
	zoomBGNumeric = 1 + (scrollYPos/13000); 
	zoomMidGroundNumeric = 1 + (scrollYPos/5000); 
	zoomMidMountainsNumeric = 1 + (scrollYPos/3000); 
	zoomMountainsNumeric = 1 + (scrollYPos/1000); 

	TweenMax.to(jsHomeSceneBG, 
		0.6, {
			scale: zoomBGNumeric
		}
	);
	TweenMax.to(jsHomeSceneMidGround, 
		0.6, {
			scale: zoomMidGroundNumeric
		}
	);
	TweenMax.to(jsHomeSceneMidMountains, 
		0.6, {
			scale: zoomMidMountainsNumeric
		}
	);
	TweenMax.to(jsHomeSceneMountains, 
		0.6, {
			scale: zoomMountainsNumeric
		}
	);

	// jsHomeSceneBG.css({ 
	//     'transform' : 'scale('+zoomBGNumeric+')'
 //    });
 //    jsHomeSceneMidGround.css({ 
	//     'transform' : 'scale('+zoomMidGroundNumeric+')'
 //    });
 //    jsHomeSceneMidMountains.css({ 
	//     'transform' : 'scale('+zoomMidMountainsNumeric+')'
 //    });
 //    jsHomeSceneMountains.css({ 
	//     'transform' : 'scale('+zoomMountainsNumeric+')'
 //    });

	homeSceneFadeOut = 1 + ( (homeSceneFadeStart - scrollYPos) / homeSceneFadeBuffer );

	TweenMax.to(jsHomeFadeout, 
		0.5, {
			opacity: homeSceneFadeOut
		}
	);

    if (scrollYPos >= 100) {
    	dataActiveOff(jsScrollWrap);
    } else {
    	dataActiveOn(jsScrollWrap);
    }

	setTimeout(function(){
		homeScrollInterval();
    }, 10);
}

function mobHomeScrollInterval() {
	scrollYPos = jsScrollingContent.scrollTop();
	if (scrollYPos >= 30) {
    	dataActiveOff(jsScrollWrap);
    } else {
    	dataActiveOn(jsScrollWrap);
    }
    setTimeout(function(){
		mobHomeScrollInterval();
    }, 10);
}

// SCROLL CASES PAGE
function genericScrollInterval() {
	scrollYPos = jsScrollingContent.scrollTop();
	jsActiveOnScroll.each(function() {
      	projectPositionChecker($(this), scrollYPos);
    });
	setTimeout(function(){
		genericScrollInterval();
    }, 10);
}

// SCROLL PROJECT PAGE
function projectScrollInterval() {
	scrollYPos = jsScrollingContent.scrollTop();
	jsProjectElement.each(function() {
      	projectPositionChecker($(this), scrollYPos);
    });
	
    projectHeadZoom = (scrollYPos * 0.3).toFixed();

    TweenMax.to(projectHeaderBGimg, 
		0.2, {
			y: projectHeadZoom
		}
	);

	setTimeout(function(){
		projectScrollInterval();
    }, 10);
}

function mobNavScrollInterval() {
	scrollYPos = jsScrollingContent.scrollTop();
	if (scrollYPos >= 200) {
		dataActiveOn($('.mob-nav-bar'));
	} else {
		dataActiveOff($('.mob-nav-bar'));
	}
	setTimeout(function(){
		mobNavScrollInterval()
    }, 80);
}

function projectPositionChecker(e, y) {
	thisOffset = e.offset().top;
	if (thisOffset < (windowHeight / 1.5)) {
		dataActiveOn(e);
	} else {
		dataActiveOff(e);
	}
}

function pageLinkTransition(hr) {
	if (is_chrome == true) {
    	pageOutLoad.show();

		setTimeout(function(){
			dataActiveOn(pageOutLoad);
			setTimeout(function(){
				location.href=hr;
			}, 200);
		}, 10);

    } else {
    	location.href=hr;
    }
	
	
}

function showElementWithTransition(e) {
	e.show();
	setTimeout(function(){
	   	e.addClass('active');
	}, 20);
}

function hideElementWithTransition(e) {
	e.removeClass('active');
	setTimeout(function(){
	   	e.hide();
	}, 1000);
}

function loadSite() {

	preload = new createjs.LoadQueue();
	preload.on("complete", siteLoaded); // ON ALL LOADED, RUN FUNCTION siteLoaded
	preload.on("progress", loadProgress); // ON ALL LOADED, RUN FUNCTION siteLoaded

	if (dataPage == 'home') {
		preload.loadFile("/img/home-scene/sky.jpg");
		preload.loadFile("/img/home-scene/tinified/mid-ground-opt.png");
		preload.loadFile("/img/home-scene/tinified/mid-mountains.png");
		preload.loadFile("/img/home-scene/tinified/mountains.png");
	}
	if (dataPage == 'project') {
		headerImgToLoad = $('.project-header-bg-img').css('background-image');
		if (typeof headerImgToLoad != 'undefined') {
      		headerImgToLoad = headerImgToLoad.replace('url(','').replace(')','').replace('"','').replace('"','');
      		preload.loadFile(headerImgToLoad);
      	} 
	}
	if (dataPage == 'cases') {
		
		// preload.loadFile("");
		ImgToLoad1 = $('.cases-project-slide:nth-child(1) .cases-project-slide-bg').css('background-image');
		ImgToLoad2 = $('.cases-project-slide:nth-child(2) .cases-project-slide-bg').css('background-image');
		ImgToLoad3 = $('.cases-project-slide:nth-child(3) .cases-project-slide-bg').css('background-image');

  		ImgToLoad1 = ImgToLoad1.replace('url(','').replace(')','').replace('"','').replace('"','');
  		ImgToLoad2 = ImgToLoad2.replace('url(','').replace(')','').replace('"','').replace('"','');
  		ImgToLoad3 = ImgToLoad3.replace('url(','').replace(')','').replace('"','').replace('"','');

  		preload.loadFile(ImgToLoad1);
  		preload.loadFile(ImgToLoad2);
  		preload.loadFile(ImgToLoad3);
	}

	if (dataPage == 'about') {
		preload.loadFile("/img/home-scene/all-home-scene.jpg");
		preload.loadFile("/img/about/img-1.jpg");
	}
	if (dataPage == 'contact') {
		preload.loadFile("/img/about/img-1.jpg");
	}

}

function loadProgress() {
	if (preload.progress == 1) {

		setTimeout(function(){
			bodyEl.attr('data-loaded', 'true');
			if (dataPage == "home") {
				setTimeout(function(){
			   		fogRepeat();
				}, 17000);
			}
			setTimeout(function(){
		   		$('.preloader-wrap').remove();
			}, 1900);
		}, 400);
	}
}

function siteLoaded() {
	setTimeout(function(){
		
   		$('.preloader-wrap').attr('data-loaded', 'true');
		setTimeout(function(){
	   		$('.preloader-wrap').remove();
		}, 1800);
	}, 600);
}

function fogRepeat() {
	$('.fog').attr('data-state', 'fade-out');
	setTimeout(function(){
   		$('.fog').attr('data-state', 'pre-refresh');
   		setTimeout(function(){
	   		$('.fog').attr('data-state', 'normal-speed');
	   		setTimeout(function(){
		   		$('.fog').attr('data-state', 'refresh');
		   		setTimeout(function(){
			   		fogRepeat();
				}, 17000);
			}, 50);
		}, 50);
	}, 1050);
}

function prevCarouselImg() {
	jsCurrentCarouselImg -= 1;
	if (jsCurrentCarouselImg < 1) {
		jsCurrentCarouselImg = totalImgCarouselImgs;
	}
	jsImgCarousel.attr('data-active-case-carousel-img', jsCurrentCarouselImg);
}

function nextCarouselImg() {
	jsCurrentCarouselImg += 1;
	if (jsCurrentCarouselImg > totalImgCarouselImgs) {
		jsCurrentCarouselImg = 1;
	}
	jsImgCarousel.attr('data-active-case-carousel-img', jsCurrentCarouselImg);
}

// if ($('.classname').length) {

// }

// setTimeout(function(){
   
//  }, 100);

// $('.classname')
// .on('click', function(e){

// });


// $('.classname')
// .on('mouseover', function(allAnimalsDetectHover){

// });

function detectBrowser() {

	is_chrome = navigator.userAgent.indexOf('Chrome') > -1;
    
    if (is_chrome == true) {
    	$('.fog').addClass('movement')
    }

}

// UTILITY FUNCTIONS

function dataActiveOff(e) {
	e.attr('data-active', 'off');
}
function dataActiveOn(e) {
	e.attr('data-active', 'on');
}
