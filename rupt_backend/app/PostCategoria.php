<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class PostCategoria extends Model
{
    protected $table = 'post_categoria';

    public function categoria(){
        return $this->hasOne('App\Categoria', 'id', 'categoria_idCategoria');
    }
}
