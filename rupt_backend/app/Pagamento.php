<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Leitor;

class Pagamento extends Model{
    
    public function leitor(){
        return $this->hasOne('App\Leitor', 'id', 'leitor_idLeitor')->with('escritor');
    }
}
