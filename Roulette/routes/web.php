<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

use App\Record;

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
    $user = Auth::user();

    if ($user) {
        $all_record = Record::where('user_name', $user->name)
            ->select('created_at', 'reward')
            ->get();
    } else {
        $all_record = [];
    }

//    $all_record = Record::all();

//    error_log(print_r($all_record, true));

    return view('index')->with([
        'all_record' => $all_record
    ]);
})->name('index');

Route::get('/test', function (Request $request) {
    $user = Auth::user();

    Record::create([
        "reward" => "money",
        "user_name" => $user->name
    ]);

    return '222';
});

Route::post('/update/money', function (Request $request) {
    $user = Auth::user();

    error_log($user->money);
    error_log($request->money);

    $user->money += $request->money;
    $user->save();

    if ($request->money != -300) {
        Record::create([
            "reward" => $request->money,
            "user_name" => $user->name
        ]);
    }

    return response()->json(array('msg' => '0'));
})->name('update.money');

Route::get('/pay', "PayController@showPayForm")->name('pay')->middleware('auth');

Route::post('/pay/credit-card', "PayController@addCreditRecord")->name('pay.credit-card');

Route::post('/pay/mycard', "PayController@addMycardRecord")->name('pay.mycard');

Route::post('/changeAvatar', 'ProfileController@changeAvatar')->name('changeAvatar');

Auth::routes();
