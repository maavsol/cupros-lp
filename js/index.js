(function($) {
  "use strict";

  $("body").scrollspy({
    target: ".navbar-fixed-top",
    offset: 60
  });

  $("#topNav").affix({
    offset: {
      top: 200
    }
  });

  new WOW().init();

  $("a.page-scroll").bind("click", function(event) {
    var $ele = $(this);
    $("html, body")
      .stop()
      .animate(
        {
          scrollTop: $($ele.attr("href")).offset().top - 60
        },
        1450,
        "easeInOutExpo"
      );
    event.preventDefault();
  });

  $(".navbar-collapse ul li a").click(function() {
    /* always close responsive nav after click */
    $(".navbar-toggle:visible").click();
  });

  $("#galleryModal").on("show.bs.modal", function(e) {
    $("#galleryImage").attr("src", $(e.relatedTarget).data("src"));
  });
})(jQuery);

var canvas = document.getElementById("canvas"),
  ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var stars = [], // Array that contains the stars
  FPS = 50, // Frames per second
  x = 100, // Number of stars
  mouse = {
    x: 0,
    y: 0
  }; // mouse location

// Push stars to array

for (var i = 0; i < x; i++) {
  stars.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: Math.random() * 1 + 1,
    vx: Math.floor(Math.random() * 50) - 25,
    vy: Math.floor(Math.random() * 50) - 25
  });
}

// Draw the scene

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.globalCompositeOperation = "lighter";

  for (var i = 0, x = stars.length; i < x; i++) {
    var s = stars[i];

    ctx.fillStyle = "grey";
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.radius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.fillStyle = "grey";
    ctx.stroke();
  }

  ctx.beginPath();
  for (var i = 0, x = stars.length; i < x; i++) {
    var starI = stars[i];
    ctx.moveTo(starI.x, starI.y);
    if (distance(mouse, starI) < 150) ctx.lineTo(mouse.x, mouse.y);
    for (var j = 0, x = stars.length; j < x; j++) {
      var starII = stars[j];
      if (distance(starI, starII) < 150) {
        //ctx.globalAlpha = (1 / 150 * distance(starI, starII).toFixed(1));
        ctx.lineTo(starII.x, starII.y);
      }
    }
  }
  ctx.lineWidth = 0.05;
  ctx.strokeStyle = "grey";
  ctx.stroke();
}

function distance(point1, point2) {
  var xs = 0;
  var ys = 0;

  xs = point2.x - point1.x;
  xs = xs * xs;

  ys = point2.y - point1.y;
  ys = ys * ys;

  return Math.sqrt(xs + ys);
}

// Update star locations

function update() {
  for (var i = 0, x = stars.length; i < x; i++) {
    var s = stars[i];

    s.x += s.vx / FPS;
    s.y += s.vy / FPS;

    if (s.x < 0 || s.x > canvas.width) s.vx = -s.vx;
    if (s.y < 0 || s.y > canvas.height) s.vy = -s.vy;
  }
}

canvas.addEventListener("mousemove", function(e) {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

// Update and draw

function tick() {
  draw();
  update();
  requestAnimationFrame(tick);
}

tick();
