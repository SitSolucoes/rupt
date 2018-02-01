<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Seguidor extends Model
{
    protected $table = 'seguidores';

    public function leitor(){
        return $this->hasOne('App\Leitor', 'id', 'leitor_idLeitor');
    }

    public function escritor(){
        return $this->hasOne('App\Leitor', 'id', 'escritor_idEscritor');
    }
}
