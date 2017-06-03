<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Post;
use App\Http\Controllers\EscritorController;
use App\Http\Controllers\LeitorController;

class PostController extends Controller
{
    public function getById($id){
        $post = Post::where('id', $id)->get();

        return $post;
    }

    public function getEscritor($id){
        $c_e = new EscritorController();
        $c_l = new LeitorController();
        $response = [
            'escritor' => $c_e->getById($id),
            'leitor' => $c_l->getById($id)
        ];
        return response()->json($response, 200);
    }
}
