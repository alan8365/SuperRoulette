$(document).ready(function(){
  registerShow();
})


var record = [
  { time: "2020/6/21 03:15", prize: "$-100" },
  { time: "2020/6/21 13:15", prize: "$500" },
  { time: "2020/6/22 14:15", prize: "$300" },
  { time: "2020/6/22 14:25", prize: "$0" }
];

var $table = $('tbody');
var rowElements = [];

// Loop over the array
for (let i = 0; i < record.length; ++i ) {
  rowElements.push(
      $('<tr></tr>').append(
          $('<th scope="row"></th>').html(i+1),
          $('<td></td>').html(record[i].time),
          $('<td></td>').html(record[i].prize)
      )
  );
}

$table.append(rowElements);

/*** 顯示/隱藏密碼 ***/
$('.show_pass').click(function () {
  let pass_type = $('input').attr('type');

  if (pass_type === 'password'){
      $('input').attr('type', 'text');
      $('.show_pass i').removeClass('fa-eye').addClass('fa-eye-slash');
  } else {
      $('input').attr('type', 'password');
      $('.show_pass i').removeClass('fa-eye-slash').addClass('fa-eye');
  }
})


/*** 登入視窗顯示 ***/
function loginShow(){
  $("#registerModal").modal("hide");
  $("#loginModal").modal("show");
}


/*** 註冊視窗顯示 ***/
function registerShow(){
  $("#loginModal").modal("hide");
  $("#registerModal").modal("show");
}


/*** 中獎公告推送 ***/
function newAdd(text){
  $("ul.list-group-flush").prepend($('<li class="list-group-item"></li>').text(text));
}


/*** 選擇檔案後顯示名稱 ***/
$(".custom-file-input").on("change", function() {
  var fileName = $(this).val().split("\\").pop();
  $(this).siblings(".custom-file-label").addClass("selected").html(fileName);
});
//---------------------------阿寶不想處理的分隔線----------------------------------------------------------
var data = [
  //{ id: '', color: '#3f297e', text: 'ALL IN', ikon: 'invert_colors' },
  
  //ALDRO AQUI PUEDES MODIFICAR LOS PREMIOS. En el apartado text colocar el premio de cada sección. Si necesitas modificar la velocidad hay un atributo llamado duration más adelante que puedes modificar también.
  
  //Modificar Premio Tequila QP
  { id: '', type: 'question', color: '#feb9c3', text: '$5000', ikon: '' },
  // Modificar Premio Beats
  { id: '', type: 'quiz', color: '#40c6f2', text: '$0' },
  // Modificar Premio Airpods
  { id: '', type: 'quiz', color: '#feb9c3', text: '$200' },
  // Modificar Premio Tarjeta
  { id: '', type: 'quiz', color: '#40c6f2', text: '$100' },
  // Modificar Premio Beats - 2
  { id: '', color: '#feb9c3', text: '$300', ikon: '' },
  // Modificar Premio Airpods - 2
  { id: '', color: '#40c6f2', text: '-$100' },
  // Modificar Premio Tequila QP - 2
  { id: '', color: '#feb9c3', text: '$500' },
  // Modificar Premio Dashboard
  { id: '', type: 'time', color: '#40c6f2', text: '$100', ikon: '' },
  // Modificar premio Netflix
  { id: '', type: 'question', color: '#feb9c3', text: '$1000' },
  // Modificar premio Cine QP
  { id: '', color: '#40c6f2', text: '$50' },
  // Modificar premio Airpods - 2
  { id: '', color: '#feb9c3', text: '$400' },
  // Modificar premio Jugar de nuevo
  { id: '', type: 'replay', color: '#40c6f2', text: 'again', ikon: 'replay' }
];

var RouletteWheel = function(el, items){
  this.$el = $(el);
  this.items = items || [];
  this._bis = false;
  this._angle = 0;
  this._index = 0;
  this.options = {
    angleOffset: -90
  }
}

_.extend(RouletteWheel.prototype, Backbone.Events);

RouletteWheel.prototype.spin = function(_index){
  
  var count = this.items.length;
  var delta = 360/count;
  var index = !isNaN(parseInt(_index))? parseInt(_index) : parseInt(Math.random()*count);
      
  var a = index * delta + ((this._bis)? 1440 : -1440);
  
  //a+=this.options.angleOffset;
  
  this._bis = !this._bis;
  this._angle = a;
  this._index = index;
  
  var $spinner = $(this.$el.find('.spinner'));
  
  var _onAnimationBegin = function(){
    this.$el.addClass('busy');
    this.trigger('spin:start',this);
  }
  
  var _onAnimationComplete = function(){
    this.$el.removeClass('busy');
    this.trigger('spin:end',this);
  }
  
  $spinner
  .velocity('stop')
  .velocity({
    rotateZ: a +'deg'
  },{
    //easing: [20, 7],
    //easing: [200, 20],
    easing: 'easeOutQuint',
    duration: 15000,
    begin: $.proxy(_onAnimationBegin,this),
    complete: $.proxy(_onAnimationComplete,this)
  });
  
}
  
RouletteWheel.prototype.render = function(){
  
  var $spinner = $(this.$el.find('.spinner'));
  var D = this.$el.width();
  var R = D*.5;

  var count = this.items.length;
  var delta = 360/count;
  
  for(var i=0; i<count; i++){
    
    var item = this.items[i];
    
    var color = item.color;
    var text = item.text;
    var ikon = item.ikon;
    
    var html = [];
    html.push('<div class="item" ');
    html.push('data-index="'+i+'" ');
    html.push('data-type="'+item.type+'" ');
    html.push('>');
    html.push('<span class="label">');
    if(ikon)
      html.push('<i class="material-icons">'+ikon+'</i>');
    html.push('<span class="text">'+text+'</span>');
    html.push('</span>');
    html.push('</div>');
    
    var $item = $(html.join(''));
    
    var borderTopWidth = D + D*0.0025; //0.0025 extra :D
    var deltaInRadians = delta * Math.PI / 180;
    var borderRightWidth = D / ( 1/Math.tan(deltaInRadians) );
    
    var r = delta*(count-i) + this.options.angleOffset - delta*.5;
    
    $item.css({
      borderTopWidth: borderTopWidth,
      borderRightWidth: borderRightWidth,
      transform: 'scale(2) rotate('+ r +'deg)',
      borderTopColor: color
    });
    
    var textHeight = parseInt(((2*Math.PI*R)/count)*.5);
        
    $item.find('.label').css({
      //transform: 'translateX('+ (textHeight) +'px) translateY('+  (-1 * R) +'px) rotateZ('+ (90 + delta*.5) +'deg)',
      transform: 'translateY('+ (D*-.25) +'px) translateX('+  (textHeight*1.03) +'px) rotateZ('+ (90 + delta*.5) +'deg)',
      height: textHeight+'px',
      lineHeight: textHeight+'px',
      textIndent: (R*.1)+'px'
    });
    
    $spinner.append($item);
       
  }
  
  $spinner.css({
    fontSize: parseInt(R*0.06)+'px'
  })
  
  //this.renderMarker();

  
}

RouletteWheel.prototype.renderMarker = function(){
  
  var $markers = $(this.$el.find('.markers'));
  var D = this.$el.width();
  var R = D*.5;

  var count = this.items.length;
  var delta = 360/count;
      
  var borderTopWidth = D + D*0.0025; //0.0025 extra :D
  var deltaInRadians = delta * Math.PI / 180;
  var borderRightWidth = (D / ( 1/Math.tan(deltaInRadians) ));

  var i = 0;  
  var $markerA = $('<div class="marker">');
  var $markerB = $('<div class="marker">');

  var rA = delta*(count-i-1) - delta*.5 + this.options.angleOffset;
  var rB = delta*(count-i+1) - delta*.5 + this.options.angleOffset;
    
  $markerA.css({
    borderTopWidth: borderTopWidth,
    borderRightWidth: borderRightWidth,
    transform: 'scale(2) rotate('+ rA +'deg)',
    borderTopColor: '#FFF'
  });
  $markerB.css({
    borderTopWidth: borderTopWidth,
    borderRightWidth: borderRightWidth,
    transform: 'scale(2) rotate('+ rB +'deg)',
    borderTopColor: '#FFF'
  })
  
  $markers.append($markerA);
  $markers.append($markerB);
  
}

RouletteWheel.prototype.bindEvents = function(){
  this.$el.find('.button').on('click', $.proxy(this.spin,this));
}


var spinner;
$(window).ready(function(){
  
  spinner = new RouletteWheel($('.roulette'), data);
  spinner.render();
  spinner.bindEvents();
  
  spinner.on('spin:start', function(r){ console.log('spin start!') });
  spinner.on('spin:end', function(r){ console.log('spin end! -->'+ r._index) });
  
})