<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    public function autor(){
        return $this->hasOne('App\Leitor', 'id', 'autor_idLeitor');
    }

    public function categoriaLeitor(){
        return $this->hasMany('App\CategoriaPost', 'post_idPost', 'id')->with('categoria');
    }
}
