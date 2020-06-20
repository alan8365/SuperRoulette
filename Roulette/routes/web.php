<?php

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Route;

use \App\Events\NewMessageNotification;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('index');
})->name('index');

Route::post('/update/money', function (Request $request) {
    $user = Auth::user();

    error_log(print_r($request->name, true));

    if ($user->name == $request->name) {
        $user->money = $request->money;
        $user->save();
    }

    return response()->json(array('msg' => '222'));
})->name('update.money');

Route::post('/changeAvatar', 'ProfileController@changeAvatar')->name('changeAvatar');

Auth::routes();
