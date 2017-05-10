<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Escritor extends Model
{
    protected $table = 'escritores';
    
    public function leitor(){
        return $this->hasOne('App\Leitor', 'id', 'leitor_idLeitor');
    }
}
