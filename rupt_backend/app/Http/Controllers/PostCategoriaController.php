<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\PostCategoria;
use App\Http\Controllers\CategoriaController;

class PostCategoriaController extends Controller
{
    public function save($categoria_id, $post_id){
        $c = new CategoriaController();
        $cat = $c->get($categoria_id);

        $this->create($cat->id, $post_id);

        while($cat->categoria_idCategoria != null){
            $cat = $c->get($cat->categoria_idCategoria);
            $this->create($cat->id, $post_id);
        }
    }

    private function create($categoria_id, $post_id){
        $postCategoria = new PostCategoria();
        $postCategoria->post_idPost = $post_id;
        $postCategoria->categoria_idCategoria = $categoria_id;
        $postCategoria->save();
    }
}
