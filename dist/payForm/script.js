/* Please ❤ this if you like it! */

$(document).ready(function(){
    $("img:eq(1)").css("height",($("img.w-100").css("height")));
    cardFormShow();
  })


$('input[name=amount]').change(function(){
  var amount = $('input[name=amount]:checked').val();
  console.log(amount);
});

$('input[name=payment]').change(function(){
  if ($('input[name=payment]:checked').attr("id")=='tools-1') {
    cardFormShow();
  } else {
    myCardFormShow();
  }
});

function cardFormShow() {
  $('form[name=card]').show();
  $('form[name=myCard]').hide();
}
function myCardFormShow() {
  $('form[name=card]').hide();
  $('form[name=myCard]').show();
}