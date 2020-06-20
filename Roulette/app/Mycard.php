<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Mycard extends Model
{
    protected $fillable = ['card_number', 'password', 'user_name'];
}
