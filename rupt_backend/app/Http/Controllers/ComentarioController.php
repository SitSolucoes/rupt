<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Comentario;

class ComentarioController extends Controller
{
    
    public function create(Request $request){
        
        $comentario = new Comentario();
        $comentario = $this->createComentario($request, $comentario);
        
        $comentario->save();

        $comentarios = $this->getComentariosFromPost($comentario->post_idPost);

        return response()->json(['comentarios' => $comentarios, 'status' => 'OK'], 200);
    }

    private function createComentario(Request $request, $c){
        $c->post_idPost = $request->post_idPost;
        $c->leitor_idLeitor = $request->leitor_idLeitor;
        $c->comentario = $request->comentario;
        $c->comentario_idComentario = $request->comentario_idComentario;

        return $c;
    }
    
    public function getComentariosFromPost($id){
        $comentarios = Comentario::where("post_idPost", $id);

        foreach($comentarios as $c){
            $c = (object)['comentario' => $c,
                         'respostas' => $c->respostas];
        }

        return response()->json(['comentarios' => $comentarios], 200);
    }

    public function likeComentario($id){

    }
}
