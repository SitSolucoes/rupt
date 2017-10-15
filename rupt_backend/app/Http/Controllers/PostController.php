<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Post;
use App\PostCategoria;
use App\Categoria;
use App\Visualizacao;
use App\Http\Controllers\EscritorController;
use App\Http\Controllers\LeitorController;
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

    public function getSliderPostsByCategory($id){
        //posts da categoria X
        $posts_ids = Post::whereIn('id', PostCategoria::select('post_idPost')
                                                      ->whereIn('categoria_idCategoria', Categoria::select('id')
                                                                                                  ->where('categoria_idCategoria', null )
                                                                                                  ->where('id', $id)))->get();

        //ordenados por quantidade de visualização
        if($posts_ids->length > 0){
            $idPosts_q = Visualizacao::select(DB::raw('post_idPost as id, count(*) as q'))
            ->whereIn('post_idPost', $posts_ids)
            ->groupBy('post_idPost')
            ->orderBy('q', 'desc')
            ->limit(10)
            ->get();
            //posts
            $posts = Post::whereIn('id', $idPosts)->get();
            $retorno = [
                'posts' => $posts
            ];

            return response()->json($retorno, 200);
        }

        $retorno = [
            'erro' => 'Não foram encontrados posts nessa categoria.'
        ];
            
        return response()->json($retorno, 500);
        

        
    }
}
