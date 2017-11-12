<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Denuncia extends Model
{
    public function autor(){
        return $this->hasOne('App\Leitor', 'id', 'leitor_idLeitor');
    }
    public function post(){
        return $this->hasOne('App\Post', 'id', 'post_idPost');
    }
    public function motivo(){
        return $this->hasOne('App\MotivoDenuncia', 'id', 'motivo_idMotivo');
    }
}
