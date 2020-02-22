import { CountUp } from "/js/countUp.min.js";

// Loader
$(window).on("load", function() {
  $(".loader .inner").fadeOut(500, function() {
    $(".loader").fadeOut(750);
  });

  // isotope
  $(".items").isotope({
    filter: "*",
    animationOptions: {
      duration: 1500,
      easing: "linear",
      queue: false
    }
  });
});

$(document).ready(function() {
  // Call 'suplerslides' jquery
  $("#slides").superslides({
    animation: "fade",
    play: 3000,
    pagination: false
  });

  // Call 'typed' java script
  var typed = new Typed(".typed", {
    strings: [
      "Software Developer.",
      "Web Developer.",
      "Architect.",
      "CPA Student."
    ],
    typeSpeed: 70,
    loop: true,
    startDelay: 1000,
    showCursor: false
  });

  // Call 'owl-carousel'
  $(".owl-carousel").owlCarousel({
    loop: true,
    items: 4,
    // responsive tells me I want to show when a screen is a certain size
    responsive: {
      0: {
        items: 1
      },
      480: {
        items: 2
      },
      768: {
        items: 3
      },
      900: {
        items: 4
      }
    }
  });

  // offset() returns the position horizontally and vertically of the element
  var skillsTopOffset = $(".skillsSection").offset().top;
  var statsTopOffset = $(".statsSection").offset().top;
  var countUpFinished = false;

  // window is a jquery object
  // When the window is scrolled, excute this function
  $(window).scroll(function() {
    // 610 > 1502 - 887 + 200
    if (window.pageYOffset > skillsTopOffset - $(window).height() + 200) {
      // Call 'easy-pie-chart'
      $(".chart").easyPieChart({
        easing: "easeInOut",
        barColor: "#fff",
        trackColor: false,
        scaleColor: false,
        lineWidth: 5,
        size: 152,
        onStep: function(from, to, percent) {
          $(this.element)
            .find(".percent") // Find a class
            .text(Math.round(percent));
        }
      });
    }

    if (
      !countUpFinished &&
      window.pageYOffset > statsTopOffset - $(window).height() + 200
    ) {
      // count up.js
      const elements = document.getElementsByClassName("counter");
      for (let i = 0; i < elements.length; i++) {
        var endValue = parseInt(elements[i].innerText);
        const countup = new CountUp(elements[i], endValue);
        countup.start();
      }

      countUpFinished = true;
    }
  });

  // fancybox
  $("[data-fancybox]").fancybox();

  // filter
  $("#filters a").click(function() {
    $("#filters .current").removeClass("current");
    $(this).addClass("current");

    var selector = $(this).attr("data-filter");

    $(".items").isotope({
      filter: selector,
      animationOptions: {
        duration: 1500,
        easing: "linear",
        queue: false
      }
    });

    // Don't do any other activity
    return false;
  });

  /* NAVIGATION BAR */
  $("#navigation li a").click(function(e) {
    e.preventDefault();

    // Get #about, #skills, etc..
    var targetElement = $(this).attr("href");
    var targetPosition = $(targetElement).offset().top;
    // animate() is a jquery function
    $("html, body").animate({ scrollTop: targetPosition - 50 }, "slow");
  });

  // Sticking navigation bar on scroll
  const nav = $("#navigation");
  const navTop = nav.offset().top;

  // When doing scroll, call stickyNavigation function
  $(window).on("scroll", stickyNavigation);

  function stickyNavigation() {
    var body = $("body");

    if ($(window).scrollTop() >= navTop) {
      body.css("padding-top", nav.outerHeight() + "px");
      body.addClass("fixedNav");
    } else {
      body.css("padding-top", 0);
      body.removeClass("fixedNav");
    }
  }
});
