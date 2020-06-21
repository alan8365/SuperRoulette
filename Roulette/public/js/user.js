var username = $("#user-name").text().trim();

function update_money(name, money) {
    $.ajax({
        type: "POST",
        url: "/update/money",
        data: {
            "name": name,
            "money": money,
        }
    })
}
