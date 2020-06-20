// $(document).ready(function () {
//     registerShow();
// });


/*** 顯示/隱藏密碼 ***/
$('.show_pass').click(function () {
    let pass_type = $('input').attr('type');

    if (pass_type === 'password') {
        $('input').attr('type', 'text');
        $('.show_pass i').removeClass('fa-eye').addClass('fa-eye-slash');
    } else {
        $('input').attr('type', 'password');
        $('.show_pass i').removeClass('fa-eye-slash').addClass('fa-eye');
    }
});


/*** 登入視窗顯示 ***/
function loginShow() {
    $("#registerModal").modal("hide");
    $("#loginModal").modal("show");
}


/*** 註冊視窗顯示 ***/
function registerShow() {
    $("#loginModal").modal("hide");
    $("#registerModal").modal("show");
}


/*** 中獎公告推送 ***/
function newAdd(text) {
    $("ul.list-group-flush").prepend($('<li class="list-group-item"></li>').text(text));
}


/*** 選擇檔案後顯示名稱 ***/
$(".custom-file-input").on("change", function () {
    var fileName = $(this).val().split("\\").pop();
    $(this).siblings(".custom-file-label").addClass("selected").html(fileName);
});

//---------------------------阿寶不想處理的分隔線----------------------------------------------------------
var data = [
    //{ id: '', color: '#3f297e', text: 'ALL IN', ikon: 'invert_colors' },

    //ALDRO AQUI PUEDES MODIFICAR LOS PREMIOS. En el apartado text colocar el premio de cada sección. Si necesitas modificar la velocidad hay un atributo llamado duration más adelante que puedes modificar también.

    //Modificar Premio Tequila QP
    {id: '', color: '#feb9c3', type: 'money', text: '$5000', value: 5000},
    // Modificar Premio Beats
    {id: '', color: '#40c6f2', type: 'money', text: '$0', value: 0},
    // Modificar Premio Airpods
    {id: '', color: '#feb9c3', type: 'money', text: '$200', value: 200},
    // Modificar Premio Tarjeta
    {id: '', color: '#40c6f2', type: 'money', text: '$100', value: 100},
    // Modificar Premio Beats - 2
    {id: '', color: '#feb9c3', type: 'money', text: '$300', value: 300},
    // Modificar Premio Airpods - 2
    {id: '', color: '#40c6f2', type: 'money', text: '-$100', value: -100},
    // Modificar Premio Tequila QP - 2
    {id: '', color: '#feb9c3', type: 'money', text: '$500', value: 500},
    // Modificar Premio Dashboard
    {id: '', color: '#40c6f2', type: 'money', text: '$100', value: 100},
    // Modificar premio Netflix
    {id: '', color: '#feb9c3', type: 'money', text: '$1000', value: 1000},
    // Modificar premio Cine QP
    {id: '', color: '#40c6f2', type: 'money', text: '$50', value: 50},
    // Modificar premio Airpods - 2
    {id: '', color: '#feb9c3', type: 'money', text: '$400', value: 400},
    // Modificar premio Jugar de nuevo
    {id: '', color: '#40c6f2', type: 'replay', text: 'again', ikon: 'replay'}
];

var RouletteWheel = function (el, items) {
    this.$el = $(el);
    this.items = items || [];
    this._bis = false;
    this._angle = 0;
    this._index = 0;
    this.options = {
        angleOffset: -90
    }
};

_.extend(RouletteWheel.prototype, Backbone.Events);

var test = 0;
RouletteWheel.prototype.spin = function (_index) {
    var count = this.items.length;
    var delta = 360 / count;

    var index;
    if (!isNaN(parseInt(_index))) {
        index = parseInt(_index);
    } else {
        var chance = Math.random() * 100;

        if (chance < 10) {
            index = 5; // -100
        } else if (chance < 18) {
            index = 1; // 0
        } else if (chance < 27) {
            index = 9; // 50
        } else if (chance < 41) {
            index = 7; // 100
        } else if (chance < 55) {
            index = 3; // 100
        } else if (chance < 61) {
            index = 2; // 200
        } else if (chance < 67) {
            index = 11; // reply
        } else if (chance < 79) {
            index = 4; // 300
        } else if (chance < 89) {
            index = 10; // 400
        } else if (chance < 97) {
            index = 6; // 500
        } else if (chance < 99) {
            index = 8; // 1000
        } else if (chance < 100) {
            index = 0; // 5000
        }
    }

    console.log(data[index]);

    var a = index * delta + ((this._bis) ? 1440 : -1440);

    //a+=this.options.angleOffset;

    this._bis = !this._bis;
    this._angle = a;
    this._index = index;

    var $spinner = $(this.$el.find('.spinner'));

    var _onAnimationBegin = function () {
        this.$el.addClass('busy');
        this.trigger('spin:start', this);
    };

    var _onAnimationComplete = function () {
        this.$el.removeClass('busy');
        this.trigger('spin:end', this);
    };

    $spinner
        .velocity('stop')
        .velocity({
            rotateZ: a + 'deg'
        }, {
            //easing: [20, 7],
            //easing: [200, 20],
            easing: 'easeOutQuint',
            duration: 15000,
            begin: $.proxy(_onAnimationBegin, this),
            complete: $.proxy(_onAnimationComplete, this)
        });

}

RouletteWheel.prototype.render = function () {

    var $spinner = $(this.$el.find('.spinner'));
    var D = this.$el.width();
    var R = D * .5;

    var count = this.items.length;
    var delta = 360 / count;

    for (var i = 0; i < count; i++) {

        var item = this.items[i];

        var color = item.color;
        var text = item.text;
        var ikon = item.ikon;

        var html = [];
        html.push('<div class="item" ');
        html.push('data-index="' + i + '" ');
        html.push('data-type="' + item.type + '" ');
        html.push('>');
        html.push('<span class="label">');
        if (ikon)
            html.push('<i class="material-icons">' + ikon + '</i>');
        html.push('<span class="text">' + text + '</span>');
        html.push('</span>');
        html.push('</div>');

        var $item = $(html.join(''));

        var borderTopWidth = D + D * 0.0025; //0.0025 extra :D
        var deltaInRadians = delta * Math.PI / 180;
        var borderRightWidth = D / (1 / Math.tan(deltaInRadians));

        var r = delta * (count - i) + this.options.angleOffset - delta * .5;

        $item.css({
            borderTopWidth: borderTopWidth,
            borderRightWidth: borderRightWidth,
            transform: 'scale(2) rotate(' + r + 'deg)',
            borderTopColor: color
        });

        var textHeight = parseInt(((2 * Math.PI * R) / count) * .5);

        $item.find('.label').css({
            //transform: 'translateX('+ (textHeight) +'px) translateY('+  (-1 * R) +'px) rotateZ('+ (90 + delta*.5) +'deg)',
            transform: 'translateY(' + (D * -.25) + 'px) translateX(' + (textHeight * 1.03) + 'px) rotateZ(' + (90 + delta * .5) + 'deg)',
            height: textHeight + 'px',
            lineHeight: textHeight + 'px',
            textIndent: (R * .1) + 'px'
        });

        $spinner.append($item);

    }

    $spinner.css({
        fontSize: parseInt(R * 0.06) + 'px'
    })

    //this.renderMarker();


};

RouletteWheel.prototype.renderMarker = function () {

    var $markers = $(this.$el.find('.markers'));
    var D = this.$el.width();
    var R = D * .5;

    var count = this.items.length;
    var delta = 360 / count;

    var borderTopWidth = D + D * 0.0025; //0.0025 extra :D
    var deltaInRadians = delta * Math.PI / 180;
    var borderRightWidth = (D / (1 / Math.tan(deltaInRadians)));

    var i = 0;
    var $markerA = $('<div class="marker">');
    var $markerB = $('<div class="marker">');

    var rA = delta * (count - i - 1) - delta * .5 + this.options.angleOffset;
    var rB = delta * (count - i + 1) - delta * .5 + this.options.angleOffset;

    $markerA.css({
        borderTopWidth: borderTopWidth,
        borderRightWidth: borderRightWidth,
        transform: 'scale(2) rotate(' + rA + 'deg)',
        borderTopColor: '#FFF'
    });
    $markerB.css({
        borderTopWidth: borderTopWidth,
        borderRightWidth: borderRightWidth,
        transform: 'scale(2) rotate(' + rB + 'deg)',
        borderTopColor: '#FFF'
    });

    $markers.append($markerA);
    $markers.append($markerB);

};

RouletteWheel.prototype.bindEvents = function () {
    this.$el.find('.button').on('click', $.proxy(this.spin, this));
};


// var spinner;
// $(window).ready(function () {
//
//     spinner = new RouletteWheel($('.roulette'), data);
//     spinner.render();
//     spinner.bindEvents();
//
//     spinner.on('spin:start', function (r) {
//         console.log('spin start!')
//     });
//
//     spinner.on('spin:end', function (r) {
//         console.log('spin end! -->' + r._index)
//         console.log(r);
//     });
// });

