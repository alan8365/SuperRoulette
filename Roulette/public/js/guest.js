var username = $('#guest-name').text();

function update_money(name, money) {
    // $.ajax({
    //     type: "POST",
    //     url: "/update/money",
    //     data: {
    //         "name": name,
    //         "money": money,
    //     },
    //     success: function (data) {
    //         console.log(data);
    //     }
    // })
}

$(document).ready(function () {
    registerShow();

    $('#guest-in').on('click', function () {
        let $guest_name = $('#guest-name');

        $guest_name.show();
        username = $guest_name.text();
    });
});


