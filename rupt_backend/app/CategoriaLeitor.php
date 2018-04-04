<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class CategoriaLeitor extends Model
{
    protected $table = 'categoria_leitores';

    public function categoria(){
        return $this->hasOne('App\Categoria', 'id', 'categoria_idCategoria');
    }
}
