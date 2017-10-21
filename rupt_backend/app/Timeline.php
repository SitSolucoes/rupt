<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Timeline extends Model
{
    public function post(){
        return $this->hasMany('App\Post', 'id', 'post_idPost');
    }
}
