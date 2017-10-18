<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Post;
use App\PostCategoria;
use App\Categoria;
use App\Visualizacao;
use App\Http\Controllers\EscritorController;
use App\Http\Controllers\LeitorController;
use App\Http\Controllers\CategoriaController;
use Illuminate\Support\Facades\DB;

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

    public function getSliderPosts(){
        //ultimas 24h
        
        $idPosts_q = Visualizacao::select(DB::raw('post_idPost as id, count(*) as q'))
                        ->whereIn('post_idPost', Post::select('id')
                                                       ->whereDate('publishedAt', '>=', DB::raw('DATE(DATE_ADD(NOW(), INTERVAL - 10 DAY))'))->get())
                        ->groupBy('post_idPost')
                        ->orderBy('q', 'desc')
                        ->limit(10)
                        ->get();
        $idsPosts = [];
        foreach($idPosts_q as $post){
            $idsPosts[] = $post->id;
        }
        
        //print_r( $idsPosts);
        
        $posts = Post::whereIn('id', $idsPosts)->get();
        $retorno = [
            'posts' => $posts
        ];
        return response()->json($retorno, 200);
    }

    public function postsPorCategoria($id){
        return Post::select('posts.*')
            ->join('post_categoria', 'posts.id', '=', 'post_categoria.post_idPost')
            ->where('post_categoria.categoria_idCategoria', $id)
            ->orderBy('posts.publishedAt', 'desc')->get();
    }

    public function getSliderPostsByCategory(){
        $cat_con = new CategoriaController();
        $retorno = [];

        $categorias = $cat_con->categoriasToHome();

        foreach($categorias as $c){
            $subs = $cat_con->getSubCategorias($c->id);
            $posts = $this->postsPorCategoria($c->id);
            if($subs->count() > 0)
                foreach($subs as $s)
                    foreach($this->postsPorCategoria($s->id) as $p)
                        $posts[] = $p;
            $retorno[] = (object) [
                "nome" => $c->categoria,
                "posts" => $posts
            ];
        }

        $ret = [
            "retorno" => $retorno
        ];


        return response()->json($ret, 200);
    }

}
