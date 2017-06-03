<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    public function autor(){
        return $this->hasOne('App\Leitor', 'id', 'leitor_idLeitor');
    }
}
