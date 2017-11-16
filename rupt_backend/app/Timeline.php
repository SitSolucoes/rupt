<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Timeline extends Model
{
    public function post(){
        return $this->hasOne('App\Post', 'id', 'post_idPost')
                    ->with('autor');
    }
}
