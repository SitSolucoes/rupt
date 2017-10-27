<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Comentario extends Model
{
    public function respostas(){
        return $this->hasMany('App\Comentario', 'id', 'comentario_idComentario');
    }
}
