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
        $comentarios = Comentario::where("post_idPost","=", $id)->get();

        $response = [];
        //para cada comentario
        //pegar respostas
            //montar objeto {comentario, respostas} e inserir no array de resposta;
            //retornar
        
        
        $response = [
            'comentarios' => $comentarios,
            'respostas' => $respostas
        ];
        return response()->json(['response' => (object) $response], 200);
    }

    /*private function getRespostas($comentarios){
        $respostas = [];
        foreach($comentarios as $c)
            $respostas[] = Comentario::where('comentario_idComentario', '=' ,$c->id)->get();
        if(count($respostas > 0){
            return $respostas;
        }else
            return [];
    }*/

    public function likeComentario($id){

    }
}
