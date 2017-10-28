<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Comentario extends Model
{
    public function leitor(){
       return $this->hasOne('App\Leitor', 'id', 'leitor_idLeitor');
    } 
}
