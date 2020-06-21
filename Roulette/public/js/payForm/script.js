$(document).ready(function () {
    $("img:eq(1)").css("height", ($("img.w-100").css("height")));
    cardFormShow();

    $("#submit").on('click', function (event) {
        event.preventDefault();

        let type = $("input[name=payment]:checked").val();

        if (type === 'credit') {
            $("form[name=card]").submit();
        } else {
            $("form[name=myCard]").submit();
        }
    })
});


$('input[name=amount]').change(function () {
    var amount = $('input[name=amount]:checked').val();
    $("input[name=money]").val(amount)
});

$('input[name=payment]').change(function () {
    if ($('input[name=payment]:checked').attr("id") == 'tools-1') {
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
