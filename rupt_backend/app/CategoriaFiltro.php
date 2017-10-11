<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class CategoriaFiltro extends Model
{
    public function categoria(){
        return $this->hasOne('App\Categoria', 'id', 'categoria_idCategoria');
    }
}
