<?php

namespace App\Http\Controllers;

use App\Credit;
use App\Mycard;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PayController extends Controller
{
    public function showPayForm(Request $request)
    {
        return view('payForm');
    }

    public function creditValidator(array $data)
    {
        return Validator::make($data, [
            'card_number' => ['required', 'string', 'regex:\d{4}-\d{4}-\d{4}-\d{4}'],
            'name' => ['required', 'string', 'max:255'],
            'date' => ['required', 'string'],
            'last-code' => ['required', 'string', 'min:3', 'max:3'],
            'user_name' => ['required']
        ]);
    }

    public function addCreditRecord(Request $request)
    {
        $user = Auth::user();

        $card_number = $request['card-number-1'] . "-" . $request['card-number-2'] . "-" . $request['card-number-3'] . "-" . $request['card-number-4'];
        $date = $request['date-m'] . $request['date-y'];

        $data = [
            'card_number' => $card_number,
            'name' => $request['name'],
            'date' => $date,
            'last-code' => $request['CVC'],
            'user_name' => $user->name
        ];

        $this->creditValidator($data)->validate();

        Credit::create($data);

        $user->money += $request->money;
        $user->save();

        return redirect()->route('index');
    }

    public function addMycardRecord(Request $request)
    {
        error_log(print_r($request->all(), true));
        $user = Auth::user();

        Mycard::create([
            "card_number" => $request->input('card_number'),
            "password" => $request->input("password"),
            "user_name" => $user->name
        ]);

        $user->money += $request->money;
        $user->save();

        return redirect()->route('index');
    }
}
