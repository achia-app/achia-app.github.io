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

$(document).ready(function() {
  (function() {
    [].slice.call(document.querySelectorAll(".tabs")).forEach(function(el) {
      new CBPFWTabs(el);
    });
  })();
  var inviteId = getQueryVariable("invite");
  if (inviteId) {
    var imgHome = $(".section-image img[alt=Home]");
    var schemaLink = "achia://trip/" + inviteId;
    var htmlString =
      '<div style="width:232px;height:407px;background-color:#84B42D;display:flex;flex-direction:column;justify-content:center;align-items:center;">';
    htmlString += '<h4 style="color:white;">You just got an invite!</h4>';
    htmlString +=
      '<div id="qrcode" style="width:200px;height:200px;background-color:black"></div>';
    htmlString += "<button class='openapp-btn' >Open App</button>";
    htmlString += "</div>";
    imgHome.replaceWith(htmlString);
    $("#qrcode").qrcode({ width: 200, height: 200, text: String(inviteId) });
    $(document).on("click", ".openapp-btn", function() {
      window.location = schemaLink;
    });
    $("<h1>You just got an Invite</h1>").insertAfter("#section0 .wrap .box p");
    $("#section0 .wrap .box").append(
      '<a href="' +
        schemaLink +
        '" class="simple-button"><span class="icon flaticon-cross8"></span>Accept Invite</a>'
    );
  }
  $("#main-nav").sidr();
  $("#fullpage").fullpage({
    verticalCentered: true,
    easing: "easeInOutCirc",
    css3: false,
    scrollingSpeed: 900,
    slidesNavigation: true,
    slidesNavPosition: "bottom",
    easingcss3: "ease",
    navigation: true,
    anchors: [
      "Home",
      "Features",
      "About",
      "Video",
      "Clients",
      "Screenshots",
      "Pricing",
      "Download",
      "Contact"
    ],
    navigationPosition: "left"
  });
  $(".screenshots-content, .clients-content").css("height", $(window).height());

  // CONTACT FORM

  $(document).mouseup(function(e) {
    if ($(".sidr-open ")[0]) {
      var container = $("#sidr");

      if (
        !container.is(e.target) && // if the target of the click isn't the container...
        container.has(e.target).length === 0
      ) {
        // ... nor a descendant of the container
        $(".sidr-open #main-nav").click();
      }
    }
  });

  $("#submit").click(function() {
    $.post("contact.php", $("#contact-form").serialize(), function(response) {
      $("#success").fadeIn().html(response);
      $("#success").delay(2000).fadeOut();
    });
    return false;
  });
});
jQuery(window).load(function() {
  jQuery("#preloader").fadeOut();
});
