function getQueryVariable(variable) {
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split("=");
    if (pair[0] == variable) {
      return pair[1];
    }
  }
  return false;
}

function generateItemHTML(item) {
  var poster = "https://backend.filmhub.io" + item.poster;
  var html = "";
  html += '<div class="item">';
  html += '<div class="item-top">';
  html += '<div class="images">';
  html += '<a href=""><img src="' + poster + '"></a>';
  html += '<span class="hot"></span>';
  html += "</div>";
  html += '<div class="title">';
  html += '<a href="?p=' + item._id + '">' + item.nameVi + "</a>";
  html += "</div>";
  html += "</div>";
  html += "</div>";
  return html;
}

$(document).ready(function() {
  var trigger = $(".hamburger"),
    overlay = $(".overlay"),
    isClosed = false;

  trigger.click(function() {
    hamburger_cross();
  });

  function hamburger_cross() {
    if (isClosed == true) {
      overlay.hide();
      trigger.removeClass("is-open");
      trigger.addClass("is-closed");
      isClosed = false;
    } else {
      overlay.show();
      trigger.removeClass("is-closed");
      trigger.addClass("is-open");
      isClosed = true;
    }
  }

  $('[data-toggle="offcanvas"]').click(function() {
    $("body").toggleClass("toggled");
  });

  $(".navbar-header").click(function() {
    $(".navbar-collapse.collapse").toggleClass("in");
  });

  $(".slider1").owlCarousel({
    loop: false,
    margin: 20,
    responsiveClass: true,
    nav: true,
    responsive: {
      0: {
        items: 3
      },
      600: {
        items: 4
      },
      1000: {
        items: 5
      }
    }
  });

  (function($) {
    $(".spinner .btn:first-of-type").on("click", function() {
      $(".spinner input").val(parseInt($(".spinner input").val(), 10) - 1);
    });
    $(".spinner .btn:last-of-type").on("click", function() {
      $(".spinner input").val(parseInt($(".spinner input").val(), 10) + 1);
    });
  })(jQuery);

  if (window.matchMedia("(max-width: 767px)").matches) {
    $('.header .seach input[type="submit"]').hover(function() {
      $('.header .seach input[type="text"]').toggleClass("in");
    });
  }

  $(".button").click(function() {
    $(".setup").toggleClass("bg-in").siblings().removeClass("bg-in");
    $(this).toggleClass("bg").siblings().removeClass("bg");
  });
  $(".backgroud .btn-1").click(function() {
    $(".content-center").css({
      background: "#d8d8d8",
      color: "#4a4a4a;"
    });
  });
  $(".backgroud .btn-2").click(function() {
    $(".content-center").css({
      background: "#ceb78e",
      color: "#4a4a4a;"
    });
  });
  $(".backgroud .btn-3").click(function() {
    $(".content-center").css({
      background: "#4a4a4a",
      color: "#fff"
    });
  });
  $(".backgroud .btn-4").click(function() {
    $(".content-center").css({
      background: "#0d0d0d",
      color: "#fff"
    });
  });
  //Font size
  var fontz = $(".font-size .input").val();
  function getSize() {
    size = $(".content-center p").css("font-size");
    size = parseInt(size, 10);
    $("#font-size").text(size);
  }

  //get inital font size
  getSize();

  $(".btn-up").on("click", function() {
    // parse font size, if less than 50 increase font size
    if (size + 1 <= 50) {
      $(".content-center p").css("font-size", "+=1");
      $("#font-size").text((size += 1));
    }
  });

  $(".btn-down").on("click", function() {
    if (size - 1 >= 12) {
      $(".content-center p").css("font-size", "-=1");
      $("#font-size").text((size -= 1));
    }
  });

  // huyblack code here
  var movieId = getQueryVariable("p");
  if (movieId) {
    $("#gen-fb").html(
      '<div class="fb-comments" data-href="' +
        "https://achia-app.github.io/phim/?p=" +
        movieId +
        '" data-numposts="5" fb-xfbml-state="rendered" data-width="100%" data-colorscheme="dark"></div>'
    );
    $.get("https://backend.filmhub.io/api/movies/" + movieId, function(data) {
      console.log(data);
      if (data.length != 0) {
        var nameEn = data[0].nameEn;
        var nameVi = data[0].nameVi;
        var year = data[0].year;
        var nameEnAndYear = year ? nameEn + " (" + data[0].year + ")" : nameEn;
        var description = data[0].description;
        var directors = data[0].directors == "" ? "N/A" : data[0].director;
        var actors = data[0].actors == "" ? "N/A" : data[0].actors;
        var genres = data[0].genres == "" ? "N/A" : data[0].genres;
        var poster = "https://backend.filmhub.io" + data[0].poster;
        var quality = data[0].quality;
        var duration = data[0].duration;
        $("title").text(nameVi);
        $(".section-right .title a").text(nameVi);
        $(".date").text(nameEnAndYear);
        $(".desc").text(description);
        $("li.tt:contains('Đạo Diễn')").next().text(directors);
        $("li.tt:contains('Diễn Viên')").next().text(actors);
        $("li.tt:contains('Thể Loại')").next().text(genres);
        $(".section-left .image img").attr("src", poster);
        $(".kieu li").text(quality);
        $(".time.wl").text("Thời lượng: " + duration);
      }
    });

    $.get("https://backend.filmhub.io/api/movies", function(data) {
      var index = 0;
      $(".slider1.owl-carousel .item").each(function() {
        $(this).find("a").attr("href", "?p=" + data[index]._id);
        $(this)
          .find("img")
          .attr("src", "https://backend.filmhub.io" + data[index].poster);
        $(this).find("img").width(163);
        $(this).find("img").height(233);
        $(this).find("img").css("background-size", "cover");
        $(this).find("img").css("background-position", "center center");
        $(this).find(".title a").text(data[index].nameVi);
        index++;
      });
    });
  }
});
