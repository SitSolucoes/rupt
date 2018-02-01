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
use App\Http\Controllers\PostCategoriaController;
use App\Http\Controllers\TimelineController;
use Illuminate\Support\Facades\DB;

class PostController extends Controller
{
    private function create(Request $request, $post){
        $post->titulo = $request->titulo;
        $post->conteudo = $request->conteudo;
        $post->adulto = $request->adulto;
        
        return $post;
    }

    public function createPost(Request $request){
        $post = new Post();
        $post = $this->create($request, $post);
        $post->autor_idLeitor = $request->leitor_id;
        $post->tipo_post = $request->tipo_post;
        $post->visualizacoes = 0;
        //$post->publishedAt = date('Y-m-d H:i:s');
        
        $post->save();

        $c = new PostCategoriaController();
        $c->save($request->categoria_id, $post->id);

        $c = new TimelineController();
        $c->create($request->leitor_id, $post->id);

        $post = $this->getById($post->id);

        return response()->json(['post' => $post->first()], 201);
    }

    public function update(Request $request){
        $post = Post::find($request->id);
        $post = $this->create($request, $post);

        $post->save();

        $c = new PostCategoriaController();
        $c->update($request->categoria_id, $post->id);

        $post = $this->getById($post->id);

        return response()->json(['post' => $post->first()], 201);
    }

    public function delete(Request $request){
        $post = Post::find($request->id);
        $post->deleted_at = date("Y-m-d H:i:s");
        $post->save();

        $c = new TimelineController();
        $c->deleteByPost($post->id);

        return response()->json(['msg', 'Excluido com sucesso.'], 200);
    }

    public function publicar(Request $request){
        $post = Post::find($request->id);
        $post->publishedAt = date('Y-m-d H:i:s');
        $post->save();

        return response()->json(['publicado' => true], 200);
    }

    public function removePorDenuncia($id, $admin_id){
        $post = Post::find($id);
        $post->deleted_at = date("Y-m-d H:i:s");
        $post->idAdmin_deleted = $admin_id;
        $post->save();
    }

    public function getById($id){
        $post = Post::where('id', $id)
                    ->with('autor')
                    ->with('categoriasPost')
                    ->get();

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

    public function getPostsMaisLidos(){
        $idPosts_q = Visualizacao::select(DB::raw('post_idPost as id, count(*) as q'))
        ->whereIn('post_idPost', Post::select('id')
        ->whereNull('deleted_at')
        ->whereDate('publishedAt', '>=', DB::raw('DATE(DATE_ADD(NOW(), INTERVAL - 100 DAY))'))
        
        ->get())
        
        ->groupBy('post_idPost')
        ->orderBy('q', 'desc')
        ->limit(3)
        ->get();
        $idsPosts = [];
        foreach($idPosts_q as $post){
        $idsPosts[] = $post->id;
        }

        //print_r( $idsPosts);

        $posts = Post::select('id', 'titulo', 'src_imagem')->whereIn('id', $idsPosts)->get();
        $retorno = [
        'posts' => $posts
        ];
        return response()->json($retorno, 200);
    }

    public function getSliderPosts(){
        //ultimas 24h
        
        $idPosts_q = Visualizacao::select(DB::raw('post_idPost as id, count(*) as q'))
                        ->whereIn('post_idPost', Post::select('id')
                        ->whereNull('deleted_at')
                        ->whereDate('publishedAt', '>=', DB::raw('DATE(DATE_ADD(NOW(), INTERVAL - 300 DAY))'))->get())
                        ->groupBy('post_idPost')
                        ->orderBy('q', 'desc')
                        ->limit(10)
                        ->get();
        $idsPosts = [];
        foreach($idPosts_q as $post){
            $idsPosts[] = $post->id;
        }
        
        //print_r( $idsPosts);
        
        $posts = Post::whereIn('id', $idsPosts)
                     ->with('categoriasPost')
                     ->get();
                     
        $retorno = [
            'posts' => $posts
        ];
        return response()->json($retorno, 200);
    }

    public function getPost($id){
        $post = Post::where('id', $id)
                    ->whereNull('deleted_at')
                    ->with('autor')
                    ->with('categoriasPost')
                    ->first();

        return response()->json(['post' => $post], 200);
    }

    public function postsPorCategoria($id){
        return Post::select('posts.*')
            ->whereNull('posts.deleted_at')
            ->whereNotNull('posts.publishedAt')
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

    public function uploadImages (Request $request, $id){
        $post = Post::find($id);

        if ($post->path && $post->path != ''){
            $path = public_path()."/".$path_logo;
            \File::Delete($path);
        }

        $path = public_path()."/"."posts/";
        
        if (isset($_FILES['doc1']['tmp_name'])){
            move_uploaded_file($_FILES['doc1']['tmp_name'], $path.$id.".".pathinfo($_FILES['doc1']['name'], PATHINFO_EXTENSION));
            $post->src_imagem = $id.".".pathinfo($_FILES['doc1']['name'], PATHINFO_EXTENSION);
        }
        
        $post->save();

        return response()->json(['message' => "Post salvo com sucesso."], 200);
    }

    public function getRascunhos(Request $request){
        $rascunhos = Post::where('autor_idLeitor', $request->leitor_id)
                    ->whereNull('deleted_at')
                    ->whereNull('publishedAt')
                    ->with('autor')
                    ->with('categoriasPost')
                    ->orderBy('updated_at', 'desc')
                    ->get();

        return response()->json(['rascunhos' => $rascunhos], 200);
    }

}
