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
                                                       ->whereDate('publishedAt', '>=', DB::raw('DATE(DATE_ADD(NOW(), INTERVAL - 100 DAY))'))->get())
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

    public function getPost($id){
        $c_con = new CategoriaController();
        $post = $this->getById($id)->first();

        $retorno[] = (object) [
            "categorias" => $c_con->recursiveSubCategorias($c_con->categoriaByPost($post->id))
        ];
        
        $ret = [
            "dados" => $retorno
        ];


        return response()->json($ret, 200);
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
            $tmp_posts = $this->postsPorCategoria($c->id);
            $posts = [];
            if($subs->count() > 0)
                foreach($subs as $s)
                    foreach($this->postsPorCategoria($s->id) as $p)
                        $tmp_posts[] = $p;
            foreach($tmp_posts as $p)
                $posts[] = (object) [
                    "post" => $p,
                    "escritor" => $p->autor,
                    "visualizacoes" =>  300,//$p->getVisualizacoes(),
                    "likes" => (3000>1000) ? (3000/1000) . 'k' : 3000, //$p->getIteracoes(),
                    "comentarios" => ["comentario", "comentario", "comentario"],//$p->getComentarios()
                ];
            
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
