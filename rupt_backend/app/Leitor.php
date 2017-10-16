<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Leitor extends Model
{
    protected $table = 'leitores';
    protected $fillable = ['categoria', 'sugestoes'];
    protected $hidden = ['password', 'tokenLogin'];

    public function escritor(){
        return $this->hasOne('App\Escritor', 'leitor_idLeitor');
    }
}
