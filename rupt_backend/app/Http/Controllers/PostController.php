<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\Collection;

use App\Categoria;
use App\Post;
use App\PostCategoria;
use App\visualizacoes;

use App\Http\Controllers\CategoriaController;
use App\Http\Controllers\ComentarioController;
use App\Http\Controllers\DenunciasController;
use App\Http\Controllers\EscritorController;
use App\Http\Controllers\InteracaoLeitorController;
use App\Http\Controllers\LeitorController;
use App\Http\Controllers\PostCategoriaController;
use App\Http\Controllers\TimelineController;

class PostController extends Controller
{
    private $pesoComentario = 10;
    
    private function getByLink($link, $id){
        return Post::where('link', $link)
                        ->where('id', '<>', $id)
                        ->first();
    }
    
    private function createLink($titulo, $id){
        $link = str_replace(' ', '-', $titulo);

        $link = strtolower(preg_replace(array("/(á|à|ã|â|ä)/","/(Á|À|Ã|Â|Ä)/","/(é|è|ê|ë)/","/(É|È|Ê|Ë)/","/(í|ì|î|ï)/","/(Í|Ì|Î|Ï)/","/(ó|ò|õ|ô|ö)/","/(Ó|Ò|Õ|Ô|Ö)/","/(ú|ù|û|ü)/","/(Ú|Ù|Û|Ü)/","/(ñ)/","/(Ñ)/","/(ç)/","/(Ç)/"),explode(" ","a A e E i I o O u U n N c C"), $link));
        $link = preg_replace('/[^a-z0-9]/i', '-', $link);
        $link = str_replace('--', '-', $link);

        $i = 2;
        
        while ($this->getByLink($link, $id)){
            $link .= '-'.$i;
        }

        return $link;
    }
    
    private function createConteudoCard($conteudo){
        //$conteudo = substr($conteudo, 0, 500);
        $conteudo = str_replace('<br>', '', $conteudo);
        $conteudo = str_replace('</br>', '', $conteudo);
        $conteudo = str_replace('<p>', '', $conteudo);
        $conteudo = str_replace('</p>', '', $conteudo);

        while(strpos($conteudo, '<img') || strpos($conteudo, '<img') === 0){
            $postImg = strpos($conteudo, '<img');
            $postImg2 = strpos($conteudo, '/>', $postImg);

            $conteudo = substr($conteudo, 0, $postImg);
            $conteudo .= substr($conteudo, ($postImg2 + 2));
        }

        return substr($conteudo, 0, 500);
    }

    private function create(Request $request, $post){
        $post->titulo = $request->titulo;
        $post->subtitulo = $request->subtitulo;
        $post->conteudo = $request->conteudo;
        $post->adulto = $request->adulto;
        $post->link = $this->createLink(substr($post->titulo, 0, 180), $post->id);
        $post->conteudo_card = $this->createConteudoCard($request->conteudo);
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

    public function getPostByLink(Request $request){
        //echo $request;

        $post = Post::where('link', $request->link)
                    ->with('autor')
                    ->with('categoriasPost')
                    ->first();

        if ($post->autor->id == $request->leitor_id){
            if ($post->deleted_at)
                $post->motivo_denuncia = DenunciasController::getMotivoByPost($post->id);

            return response()->json(['post' => $post], 200);
        }
        else {
            $post->visualizacoes = $post->visualizacoes + 1;
            $post->save();

            if ($post->deleted_at)
                return response()->json(['post' => null], 200);
            
            return response()->json(['post' => $post], 200);
        }
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
        $idPosts_q = visualizacoes::select(DB::raw('post_idPost as id, count(*) as q'))
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
        
        $idPosts_q = visualizacoes::select(DB::raw('post_idPost as id, count(*) as q'))
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

        if ($post->src_imagem && $post->src_imagem != ''){
            $path = public_path()."/".$post->path;
            \File::Delete($path);
        }

        $path = public_path()."/posts/";
        
        if (isset($_FILES['doc1']['tmp_name'])){
            $fileName = md5(uniqid(rand(), true)).'.'.pathinfo($_FILES['doc1']['name'], PATHINFO_EXTENSION);
            move_uploaded_file($_FILES['doc1']['tmp_name'], $path.$fileName);
            $post->src_imagem = $fileName;
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

    public function getPostsByCategoria($categoria_id){
        $posts = Post::whereNull('deleted_at')
            ->whereNotNull('publishedAt')
            ->whereIn('id', function($query) use ($categoria_id) {
                $query->select('post_idPost')
                      ->from('post_categoria')
                      ->where('categoria_idCategoria', $categoria_id);
            })
            ->orderBy('publishedAt', 'desc')
            ->with('autor')
            ->get();

        return response()->json(['posts' => $posts], 200);
    }

    public function pesquisaUltimos(Request $request){
        $posts = Post::whereNull('deleted_at')
                     ->whereNotNull('publishedAt')
                     ->where(function ($query) use ($request){
                        $query->where('titulo', 'like', '%'.$request->search.'%')
                              ->orWhere('subtitulo', 'like', '%'.$request->search.'%')
                              ->orWhere('conteudo', 'like', '%'.$request->search.'%');
                     })
                     ->orderBy('publishedAt', 'desc')
                     ->with('autor')
                     ->get();
        
        return response()->json(['posts' => $posts], 200);
    }

    public function pesquisaDestaques(Request $request){
        $posts = Post::whereNull('deleted_at')
                     ->whereNotNull('publishedAt')
                     ->where(function ($query) use ($request){
                        $query->where('titulo', 'like', '%'.$request->search.'%')
                              ->orWhere('subtitulo', 'like', '%'.$request->search.'%')
                              ->orWhere('conteudo', 'like', '%'.$request->search.'%');
                     })
                     ->orderBy('publishedAt', 'desc')
                     ->with('autor')
                     ->get();

        $postsPeso = new Collection();                     

        foreach($posts as $post){
            $comentarios = ComentarioController::countComentarios($post->id)*$this->pesoComentario;
            $interacoes = InteracaoLeitorController::sumPeso($post->id);

            $post->peso = $comentarios + $interacoes + $post->visualizacoes;
            
            $postsPeso->push($post);
        }

        $order = $postsPeso->sortByDesc('peso');
        $array = $order->values()->toArray();

        //echo json_encode($array);

        return response()->json(['posts' => $array], 200);
    }

}
