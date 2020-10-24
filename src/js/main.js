$(document).ready(function () {

  /*** Mobile navigation open/close ***/
  $(document).on('click', '.nav__btn', navToggle);

  function navToggle(e) {
    e.preventDefault();

    var $body = $('body');

    if ($body.hasClass('nav-opened')) {
      $body.removeClass('nav-opened');
    }
    else {
      $body.addClass('nav-opened');
    }
  }

  // close mobile navigation on anchor click
  $(document).on('click', '.nav__link.anchor[href*="#"]', closeMobNav);

  function closeMobNav(e) {
    if ($("body").hasClass('nav-opened')) {
      $("body").removeClass('nav-opened');
    }
  }

  /*** Anchor links smooth scroll ***/
  var scroll = new SmoothScroll('a[href*="#"]', {
    speed: 600,
    speedAsDuration: false,
    durationMin: 500,
    topOnEmptyHash: false,
    easing: 'easeInOutCubic'
  });

  /*** Popup ***/
  var popup = document.querySelectorAll(".popup");
  var popupShowBtn = document.querySelectorAll("*[data-popup]");
  var popupCloseBtn = document.querySelectorAll(".popup__close");

  function preloadPopupData() {
    var popupId = this.getAttribute('data-popup');
    var popupHovered = document.getElementById(popupId);
    var scriptData = popupHovered.querySelectorAll("script[data-src]");

    if ( scriptData ) {
      // console.log("sdfsfds");
      for (var i=0; i<scriptData.length; i++) {
        if(scriptData[i].getAttribute('data-src')) {
          scriptData[i].setAttribute('src',scriptData[i].getAttribute('data-src'));
          scriptData[i].removeAttribute('data-src');
        }
      }
    }
  }

  function showPopup(e) {
    e.preventDefault();

    var id = this.getAttribute('data-popup');
    var popupCurrent = document.getElementById(id);

    popupCurrent.classList.add("popup_show");
    document.querySelector("body").classList.add("overflow-hidden");
  }

  function closePopup(e) {
    e.preventDefault();

    this.closest('.popup').classList.remove("popup_show");
    document.querySelector("body").classList.remove("overflow-hidden");
  }

  function windowOnClick(event) {
    if (event.target === this) {
      this.classList.remove("popup_show");
      document.querySelector("body").classList.remove("overflow-hidden");
    }
  }

  for (var i = 0; i < popupShowBtn.length; ++i) {
    popupShowBtn[i].addEventListener('click', showPopup, false);
    popupShowBtn[i].addEventListener('mouseenter', preloadPopupData, false);
    popupShowBtn[i].addEventListener('click', preloadPopupData, false);
  }
  for (var i = 0; i < popupCloseBtn.length; ++i) {
    popupCloseBtn[i].addEventListener('click', closePopup, false);
  }
  for (var i = 0; i < popup.length; ++i) {
    popup[i].addEventListener('click', windowOnClick, false);
  }

  /***********/
  /****************************** Scroll animations ******************************/

  // init controllers
  var controllerDefault = new ScrollMagic.Controller();
  var controllerMain = new ScrollMagic.Controller({globalSceneOptions: {triggerHook: 0}});

  // resize scenes
  var timeoutDuration = 300;
  var resizeTimeout = null;

  window.addEventListener('resize', function() {
    if (resizeTimeout) {
      clearTimeout(resizeTimeout);
    }
    resizeTimeout = setTimeout(function() {

      heroSize();

      sceneH1Opacity.destroy(true);
      sceneH1Opacity = createSceneH1Opacity();

      scenePink.destroy(true);
      scenePink = createScenePink();

      scenePhoneBoxY.destroy(true);
      scenePhoneBoxY = createScenePhoneBoxY();

      scenePhone1X.destroy(true);
      scenePhone1X = createScenePhone1X();

      scenePhone2X.destroy(true);
      scenePhone2X = createScenePhone2X();

    }, timeoutDuration);
  });

  // reload scenes
  var initialWidth = $(window).width();
  var initialHeight = $(window).height();

  if ($(".scroll-animations").length) {
    window.addEventListener('resize', function() {

      var widthNew = $(window).width();
      var heightNew = $(window).height();

      var indentWidth = widthNew - initialWidth;
      var indentHeight = heightNew - initialHeight;

      console.log(initialWidth, widthNew);

      if ( indentWidth < -150 || indentWidth > 150 || indentHeight < -150 || indentHeight > 150 ) {
        window.location.reload();
      }
    });
  }

  /**/
  /******** Navigation colors ********/

  if ($(".scroll-animations").length) {
    // Meet section
    new ScrollMagic.Scene({triggerElement: "#triggerMeet", offset: -30})
        .setClassToggle(".wrapper", "wrapper_color_meet")
        .addTo(controllerMain);

    // Developing section
    new ScrollMagic.Scene({triggerElement: "#triggerDev", offset: -30})
        .setClassToggle(".wrapper", "wrapper_color_dev")
        .addTo(controllerMain);

    // Production section
    new ScrollMagic.Scene({triggerElement: "#triggerProd", offset: -30})
        .setClassToggle(".wrapper", "wrapper_color_prod")
        .addTo(controllerMain);

    // Cases section
    new ScrollMagic.Scene({triggerElement: "#triggerCases", offset: -30})
        .setClassToggle(".wrapper", "wrapper_color_white")
        .addTo(controllerMain);

    // Contact section
    new ScrollMagic.Scene({triggerElement: ".nav-color-black", offset: -30})
        .setClassToggle(".wrapper", "wrapper_color_black")
        .addTo(controllerMain);
  }
  else {
    // Black nav color
    new ScrollMagic.Scene({triggerElement: ".nav-color-black", offset: -30})
        .setClassToggle(".wrapper", "wrapper_color_black")
        .addTo(controllerMain);
  }


  /**/
  /******** Hero ********/
  function is_mobile() {return (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));};

  var hero = $(".hero");

  function heroSize() {
    var heroHeight = hero.outerHeight();

    if ( is_mobile() ) {
      hero.css('height', heroHeight);
    }
  };

  heroSize();

  // hero Scale
  var heroScale = gsap.to("#targetHero", 1, {
    scale: 185,
    ease: "power3.in",
    force3D: false
  });

  new ScrollMagic.Scene({
    triggerElement: "#triggerMain",
    triggerHook: 0,
    duration: "89%",
    offset: 25
  })
      .setTween(heroScale)
      .addTo(controllerDefault);

  // hero badge Opacity
  var heroBadgeOpacity = gsap.to("#targetHeroBadge", 1, {
    opacity: 0,
    y: 10,
    ease: "power1.in",
    force3D: false
  });

  new ScrollMagic.Scene({
    triggerElement: "#triggerMain",
    triggerHook: 0,
    duration: "16%",
    offset: 50
  })
      .setTween(heroBadgeOpacity)
      .addTo(controllerDefault);

  // hero Opacity
  var heroOpacity = gsap.to("#targetHero", 1, {
    opacity: 0,
    ease: "power1.in"
  });

  function createSceneH1Opacity() {
    return new ScrollMagic.Scene({
      triggerElement: "#triggerMain",
      duration: "27.6%",
      offset: document.documentElement.clientHeight/100*91
    })
        .setTween(heroOpacity)
        .addTo(controllerMain);
  }

  var sceneH1Opacity = createSceneH1Opacity();


  // pink bg
  function createScenePink() {
    return new ScrollMagic.Scene({
      triggerElement: "#triggerMain",
      duration: "200%",
      offset: document.documentElement.clientHeight/100*91
    })
        .setClassToggle(".container", "active")
        .addTo(controllerMain);
  }

  var scenePink = createScenePink();


  /**/
  /******** Process ********/

  // tween Process Opacity
  var captionOpacity = gsap.to("#targetProcess", 1, {
    opacity: 1,
    ease: "power1.in"
  });

  new ScrollMagic.Scene({
    triggerElement: "#triggerProcess",
    triggerHook: 0.5,
    duration: "55%"
  })
      .setTween(captionOpacity)
      .addTo(controllerDefault);

  /**/
  /******** Frames ********/

  // all frames
  var frames = document.querySelectorAll(".frame:not(.frame_cases)");
  var framesBg = document.querySelectorAll(".frame:not(.frame_cases) .frame__bg");

  // create scene for every slide
  for (var i=0; i<frames.length; i++) {

    // tweens
    new ScrollMagic.Scene({triggerElement: frames[i], duration: "50%"})
        .setTween(gsap.to(framesBg[i], 1, {
          width: document.documentElement.clientWidth,
          top: 0,
          borderRadius: 0,
          ease: "power1.in"
        }))
        .addTo(controllerDefault);
  }


  /**/
  /******** Slider (horizontal) ********/
  var sliderContainer = $("#sliderContainer");

  // Slider move
  var horizontalSlide = gsap.timeline()
      .to("#sliderContainer", 1,   {
        x: document.documentElement.clientWidth - sliderContainer.outerWidth(),
        ease: "sine.inOut"
      });

  function createSceneSliderMove() {
    return new ScrollMagic.Scene({
      triggerElement: "#triggerCases",
      triggerHook: "onLeave",
      duration: "200%"
    })
        .setTween(horizontalSlide)
        .addTo(controllerMain);
  }
  var sceneSliderMove = createSceneSliderMove();

  // Slider X translate
  function createSceneSliderX() {
    return new ScrollMagic.Scene({
      triggerElement: "#triggerCases",
      duration: "50%"
    })
      .setTween(gsap.to("#sliderBox", 1, {
        x: 0,
        ease: "power1.in"
      }))
      .addTo(controllerDefault);
  }
  var sceneSliderX = createSceneSliderX();

  // Slider frame width
  function createSceneSliderWidth() {
    return new ScrollMagic.Scene({
      triggerElement: "#triggerCases",
      duration: "50%"
    })
      .setTween(gsap.to(".frame_cases .frame__slider", 1, {
        width: document.documentElement.clientWidth,
        ease: "power1.in"
      }))
      .addTo(controllerDefault);
  }
  var sceneSliderWidth = createSceneSliderWidth();

  // Slider frame style
  function createSceneSliderStyle() {
    return new ScrollMagic.Scene({
      triggerElement: "#triggerCases",
      duration: "50%"
    })
      .setTween(gsap.to(".frame_cases .frame__bg", .3, {
        width: document.documentElement.clientWidth,
        top: 0,
        borderRadius: 0,
        ease: "power1.in"
      }))
      .addTo(controllerDefault);
  }
  var sceneSliderStyle = createSceneSliderStyle();



  /**/
  /******** Phone ********/
  // tween Phone Box Y
  var phoneY = gsap.to("#targetPhoneBox", 1, {
        y: 0,
        ease: "power1.out",
        force3D: false
  });

  function createScenePhoneBoxY() {
    return new ScrollMagic.Scene({
      triggerElement: "#triggerPhone",
      triggerHook: 0.6,
      duration: "25%"
    })
        .setTween(phoneY)
        // .addIndicators({name: "Y phone", colorStart: "#f7f", colorEnd: "#f7f"})
        .addTo(controllerDefault);
  }

  var scenePhoneBoxY = createScenePhoneBoxY();

  // tween Phone 1 X
  var phone1X = gsap.to("#targetPhone1", 1, {
        x: 0,
        ease: "power1.in",
        force3D: false
      });

  function createScenePhone1X() {
    return new ScrollMagic.Scene({
      triggerElement: "#triggerPhone",
      triggerHook: 0.35,
      duration: "30%"
    })
        .setTween(phone1X)
        // .addIndicators({name: "left phone", colorStart: "#900", colorEnd: "#900"})
        .addTo(controllerDefault);
  }

  var scenePhone1X = createScenePhone1X();

  // tween Phone 2 X
  var phone2X = gsap.to("#targetPhone2", 1, {
        x: 0,
        ease: "power1.in",
        force3D: false
      });

  function createScenePhone2X() {
    return new ScrollMagic.Scene({
      triggerElement: "#triggerPhone",
      triggerHook: 0.35,
      duration: "30%"
    })
        .setTween(phone2X)
        .addTo(controllerDefault);
  }

  var scenePhone2X = createScenePhone2X();




  /**/
  /******** Parallax 1 ********/
  var parallaxTop = gsap.to(".parallax-top", 1, {
    y: -70,
    ease: "power1.out"
  });

  function createParallaxTop() {
    return new ScrollMagic.Scene({
      triggerElement: "#triggerParallaxTop",
      triggerHook: 0,
      duration: "100%"
    })
        .setTween(parallaxTop)
        .addTo(controllerDefault);
  }

  var sceneParallaxTop = createParallaxTop();

  /* parallax default */
  var parallax = document.querySelectorAll(".parallax");

  // create scene for every slide
  for (var i=0; i<parallax.length; i++) {

    // tweens
    new ScrollMagic.Scene({
      triggerElement: parallax[i],
      triggerHook: 1,
      duration: "150%"
    })
        .setTween(gsap.to(parallax[i], 1, {
          y: 0,
          force3D: false
        }))
        .addTo(controllerDefault);
  }

  /*** Forms validate and submit ***/

  /* Form Contact */
  $("#form-contact").submit(function(e) {
    var $form = $(this);

    if (this.checkValidity()) {
      $form.find('button[type=submit]').prop('disabled', true);
      var data = new FormData(this);
      $.ajax({
        url: '/form-contact.php',
        method: 'POST',
        data: data,
        contentType: false,
        processData: false,
        complete: function () {
          $form.find('button[type=submit]').prop('disabled', false);
        },
        success: function (data) {
          if (data != 'OK') {
            alert(data);
            return;
          }
          // success message
          $form.addClass('form_sended');

          // scroll to top of form
          var formY = $form.offset().top;
          var scrolled = $(window).scrollTop();

          if (scrolled > formY) {
            $("html, body").animate({
              scrollTop: formY - 15
            }, 600);
          }
        }
      });
    }
    e.preventDefault();
  });

});