<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Session\Store;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class ProfileController extends Controller
{
    function changeAvatar(Request $request)
    {
        $request->validate([
            'picture' => ['image', 'mimes:jpeg,png,jpg', 'max:2048']
        ]);

        $user = Auth::user();
        $file = $request->file('picture');
        $extension = $file->getClientOriginalExtension();
        $file_name = $user->name . "." . $extension;

        $file->move(getcwd() . '\picture', $file_name);
        error_log(getcwd() . '\picture');

        $user->image = 'picture/' . $file_name;
        $user->save();

        return redirect()->route('index');
    }
}
