<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

use App\Credit;
use App\Mycard;

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

    $user->money = $request->money;
    $user->save();

    return response()->json(array('msg' => '222'));
})->name('update.money');

Route::get('/pay', "PayController@showPayForm")->name('pay');

Route::post('/pay/credit-card', "PayController@addCreditRecord")->name('pay.credit-card');

Route::post('/pay/mycard', "PayController@addMycardRecord")->name('pay.mycard');

Route::post('/changeAvatar', 'ProfileController@changeAvatar')->name('changeAvatar');

Auth::routes();
