<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Credit extends Model
{
    protected $fillable = ['card_number', 'name', 'date', 'last-code', 'user_name'];
}
