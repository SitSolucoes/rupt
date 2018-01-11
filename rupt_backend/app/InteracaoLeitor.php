<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class InteracaoLeitor extends Model
{
    protected $table = 'interacao_leitores';

    public function interacao(){
        return $this->hasOne('App\Interacao', 'id', 'interacao_idInteracao');
    }
}
