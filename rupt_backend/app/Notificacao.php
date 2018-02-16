<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Notificacao extends Model
{
    protected $table = 'notificacoes';

    public function leitor(){
        return $this->hasOne('App\Leitor', 'id', 'leitor_idLeitor');
    }
}
