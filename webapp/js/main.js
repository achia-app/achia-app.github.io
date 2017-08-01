var loading =
  '<div class="windows8"><div class="wBall" id="wBall_1"><div class="wInnerBall"></div></div><div class="wBall" id="wBall_2"><div class="wInnerBall"></div></div><div class="wBall" id="wBall_3"><div class="wInnerBall"></div></div><div class="wBall" id="wBall_4"><div class="wInnerBall"></div></div><div class="wBall" id="wBall_5"><div class="wInnerBall"></div></div></div>';
var result =
  '<div style="width:80%"><h3 style="text-align:center">Bạn vừa gửi thành công lên server</h3><input class="form-group form-control btn btn-danger" type="submit" value="Gửi mới" id="new" /></div>';

$(document).ready(function() {
  var form = $("form");

  $("form").submit(function(e) {
    e.preventDefault();
    var name = $("#name").val();
    var description = $("#description").val();
    var amount = $("#amount").val();

    var formUrl =
      "https://docs.google.com/forms/u/1/d/e/1FAIpQLScVHgg3n7o6lIsutXrkNbrYHmJ-5PwyqU6ZrKhI8uIHvEEcFA/formResponse";
    $("main").html(loading);
    var postData =
      "entry.1998458345=" +
      encodeURI(name) +
      "&entry.179782795=" +
      encodeURI(description) +
      "entry.1008143291=" +
      encodeURI(amount);
    $.ajax({
      data: postdata,
      type: "POST",
      url: formUrl,
      contentType: "application/x-www-form-urlencoded;charset=utf-8"
    });
    setTimeout(function() {
      $("main").html(result);
    }, 1000);
  });

  $(document).on("click", "#new", function() {
    $("main").html(form);
  });
});
