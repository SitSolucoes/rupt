<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    public function autor(){
        return $this->hasOne('App\Leitor', 'id', 'autor_idLeitor')->with('escritor');
    }

    public function categoriasPost(){
        return $this->hasMany('App\PostCategoria', 'post_idPost', 'id')
                    ->with('categoria')->orderBy('id');
    }

    public function visualizacoes(){
        return $this->hasMany('App\Visualizacao', 'post_idPost', 'id');
    }

}
