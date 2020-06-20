<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>超級大輪盤</title>
    <link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.1.3/css/bootstrap.min.css'>
    <link rel="stylesheet" href="{{ asset("css/style.css") }}">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
</head>

<body>

<nav class="navbar fixed-bottom navbar-dark bg-dark text-light">
    <svg class="bi bi-life-preserver" width="2em" height="2em" viewBox="0 0 16 16" fill="currentColor"
         xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
        <path fill-rule="evenodd" d="M8 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"/>
        <path
            d="M11.642 6.343L15 5v6l-3.358-1.343A3.99 3.99 0 0 0 12 8a3.99 3.99 0 0 0-.358-1.657zM9.657 4.358L11 1H5l1.343 3.358A3.985 3.985 0 0 1 8 4c.59 0 1.152.128 1.657.358zM4.358 6.343L1 5v6l3.358-1.343A3.985 3.985 0 0 1 4 8c0-.59.128-1.152.358-1.657zm1.985 5.299L5 15h6l-1.343-3.358A3.984 3.984 0 0 1 8 12a3.99 3.99 0 0 1-1.657-.358z"/>
    </svg>

    <a class="navbar-brand" href="#">中科線上輪盤</a>
    <div>
        @guest
            <span id="guest-name" style="display: none">訪客 {{ rand(1, 99999999) }}</span>
            &nbsp; &nbsp; $<span id="showMoney">300</span>
        @else
            <span id="user-name">
				<img
                    src="{{ asset(Auth::user()->image) }}"
                    width="32px" height="32px" alt="">
                {{ Auth::user()->name }}
			</span>
            &nbsp; &nbsp; $<span id="showMoney">{{ Auth::user()->money }}</span>
            <span>
				<div class="btn-group dropup">
					<button type="button" class="btn btn-dark dropdown-toggle dropdown-toggle-split"
                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
					</button>

					<div class="dropdown-menu dropdown-menu-right">
					  <!-- Dropdown menu links -->
						<a class="dropdown-item" href="#" data-toggle="modal" data-target="#changeAvatarModal">更換頭像</a>
                        <a class="dropdown-item" href="{{ route('pay') }}">儲值</a>
						<a class="dropdown-item" href="{{ route('logout') }}" onclick="event.preventDefault();
                                                     document.getElementById('logout-form').submit();">登出</a>
                        <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
                            @csrf
                        </form>
					</div>
				  </div>
			</span>
        @endguest
    </div>
</nav>

<div class="roulette">
    <div class="spinner"></div>
    <div class="shadow"></div>
    <div class="markers">
        <div class="triangle">

        </div>
    </div>

    <div class="button" id="test">
        <span>按一次扣<br>$300</span>
    </div>
</div>

<!-- 消息推送 -->
<div class="news w-25 h-50 text-danger font-weight-bold">
    <ul class="list-group list-group-flush">
    </ul>
</div>

<!-- 註冊Modal -->
<div class="modal fade" id="registerModal" tabindex="-1" role="dialog" aria-labelledby="registerModalTitle"
     aria-hidden="true" data-backdrop="static" data-keyboard="false">
    <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
            <form id="register" action="{{ route('register') }}" method="post">
                @csrf
                <div class="modal-header justify-content-center">
                    <h5 class="modal-title" id="registerModalTitle">用戶註冊</h5>
                </div>
                <div class="modal-body text-c">
                    <div class="form-group">
                        <label for="userNameRegister">用戶名：</label>
                        <input name="name" type="text" class="form-control" id="userNameRegister"
                               placeholder="User name">
                    </div>

                    <div class="form-group input-group">
                        <label for="passwordRegister">密碼：</label>
                        <div class="input-group">
                            <input name="password" type="password" class="form-control" id="passwordRegister"
                                   placeholder="Password">
                            <div class="input-group-append">
                                <button class="btn btn-outline-secondary show_pass" type="button"><i
                                        class="fa fa-eye-slash"></i></button>
                            </div>
                        </div>
                        <small class="form-text text-muted">因為我們的前端工程師懶得做二次確認欄，所以給我自己確認</small>
                    </div>
                </div>
                <div class="modal-footer">
                    已有帳號?
                    <button type="button" class="btn btn-link" onclick="loginShow()">登入</button>
                    <button id="guest-in" type="button" class="btn btn-secondary" data-dismiss="modal">訪客進入</button>
                    <button type="submit" class="btn btn-primary">註冊</button>
                </div>
            </form>
        </div>
    </div>
</div>

<!-- 登入Modal -->
<div class="modal fade" id="loginModal" tabindex="-1" role="dialog" aria-labelledby="loginModalTitle"
     aria-hidden="true" data-backdrop="static" data-keyboard="false">
    <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
            <form id="login" action="{{ route('login') }}" method="post">
                @csrf
                <div class="modal-header justify-content-center">
                    <h5 class="modal-title" id="loginModalTitle">用戶登入</h5>
                </div>
                <div class="modal-body text-c">
                    <div class="form-group">
                        <label for="userNameLogin">用戶名：</label>
                        <input name="name" type="text" class="form-control" id="userNameLogin" placeholder="User name">
                    </div>
                    <div class="form-group">
                        <label for="passwordLogin">密碼：</label>
                        <input name="password" type="password" class="form-control" id="passwordLogin"
                               placeholder="Password">
                    </div>
                    <div class="form-group form-check">
                        <input name="remember" type="checkbox" class="form-check-input" id="rememberMe">
                        <label class="form-check-label" for="rememberMe">記住我！</label>
                    </div>
                </div>
                <div class="modal-footer">
                    沒有帳號?那就不要亂點登入啦
                    <button type="button" class="btn btn-link" onclick="registerShow()">註冊</button>
                    <button type="submit" class="btn btn-primary">登入</button>
                </div>
            </form>
        </div>
    </div>
</div>

<!-- 更換頭像Modal -->
<div class="modal fade" id="changeAvatarModal" tabindex="-1" role="dialog" aria-labelledby="changeAvatarTitle"
     aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="changeAvatarTitle">更換頭像</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <!-- 頭像顯示 -->
                <div class="text-center">
                    <img class="w-50"
                         src="https://icons-for-free.com/iconfiles/png/512/people+person+profile+user+icon-1320186207447274965.png"
                         alt="">
                </div>
                <!-- 選擇檔案 -->
                <form id="changeAvatar" method="post" enctype="multipart/form-data"
                      action="{{ route('changeAvatar') }}">
                    @csrf
                    <div class="input-group mb-3">
                        <div class="input-group-prepend">
                            <span class="input-group-text" id="inputGroupFileAddon01">上傳</span>
                        </div>

                        <div class="custom-file">
                            <input name="picture" type="file" class="custom-file-input" id="inputGroupFile01"
                                   aria-describedby="inputGroupFileAddon01">
                            <label class="custom-file-label" for="inputGroupFile01">Choose file</label>
                        </div>
                    </div>
                </form>
            </div>

            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">關閉</button>
                <button type="button" class="btn btn-primary" onclick="event.preventDefault();
                                                     document.getElementById('changeAvatar').submit();">儲存
                </button>
            </div>
        </div>
    </div>
</div>

<!-- partial -->
<script src='https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js'></script>
<script src='https://cdnjs.cloudflare.com/ajax/libs/velocity/1.5.0/velocity.min.js'></script>
<script src='https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.4/lodash.min.js'></script>
<script src='https://cdnjs.cloudflare.com/ajax/libs/backbone.js/1.3.3/backbone-min.js'></script>

<script src="{{ asset('js/script.js') }}"></script>

<!-- <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.6/umd/popper.min.js" integrity="sha384-wHAiFfRlMFy6i5SRaxvfOCifBUQy1xHdJ/yoi7FRNXMRBu5WHdZYu1hA6ZOblgut" crossorigin="anonymous"></script> -->
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/js/bootstrap.min.js"
        integrity="sha384-B0UglyR+jN6CkvvICOB2joaf5I4l3gm9GU6Hc1og6Ls7i6U/mkkaduKaBhlAXv9k"
        crossorigin="anonymous"></script>

<script src="{{ asset('js/socket.io/socket.io.js') }}"></script>

@guest
    <script src="{{ asset('js/guest.js') }}"></script>
@else
    <script src="{{ asset('js/user.js') }}"></script>
@endguest

<script>
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });

    var socket = io('http://localhost:3000');

    $('#guest-in').on('click', function () {
        let $guest_name = $('#guest-name');

        $guest_name.show();
        username = $guest_name.text();
    });

    var spinner;
    var money;
    $(window).ready(function () {
        money = parseInt($("#showMoney").text());

        spinner = new RouletteWheel($('.roulette'), data);
        spinner.render();

        if (money >= 300) {
            spinner.bindEvents();
        }

        spinner.on('spin:start', function (r) {
            console.log('spin start!');
            console.log(money);
            money -= 300;
            $("#showMoney").text(money);
            update_money(username, money);

            if (money < 300) {
                spinner.cancelEvents();
            }
        });

        spinner.on('spin:end', function (r) {
            console.log('spin end! -->' + r._index);
            let pay;
            let type = data[r._index]['type'];
            if (type === 'replay') {
                spinner.spin();
            } else {
                pay = data[r._index]['value'];
            }

            money += pay;

            if (money < 300) {
                spinner.cancelEvents();
            }

            $("#showMoney").text(money);
            update_money(username, money);

            socket.emit('get-reward', {
                'name': username,
                'reward': pay
            });
        });

        // 推送
        socket.on('someone-get-reward', function (msg) {
            console.log(msg);
            newAdd(msg['name'] + ' 轉到了 ' + msg['reward'] + ' !!!')
        })
    });
</script>

</body>

</html>
