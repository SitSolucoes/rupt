<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\InteracaoLeitor;

class InteracaoLeitorController extends Controller
{
    private function createInteracao(Request $request){
        $interacaoLeitor = new InteracaoLeitor();

        $interacaoLeitor->post_idPost = $request->post_idPost;
        $interacaoLeitor->comentario_idComentario = $request->comentario_idComentario;
        $interacaoLeitor->leitor_idLeitor = $request->leitor_idLeitor;
        $interacaoLeitor->interacao_idInteracao = $request->interacao_idInteracao;

        $interacaoLeitor->save();
    }

    public function interagePost(Request $request){
        $exist = false;
        
        if ($request->interacao_idInteracao != 1){
            //verifica se essa interação ja existe
            $interacaoLeitor = InteracaoLeitor::where('post_idPost', $request->post_idPost)
                                ->where('leitor_idLeitor', $request->leitor_idLeitor)
                                ->whereNull('comentario_idComentario')
                                ->where('interacao_idInteracao', $request->interacao_idInteracao)
                                ->first();

            if ($interacaoLeitor)  {
                $exist = true;
                $interacaoLeitor->delete();
            }
        }

        //se a interação não existia ou se é compartilhar, cria uma nova
        //se a interação já existia, quer dizer que ele ta desfazendo ela
        if ($exist == false)
            $this->createInteracao($request);

        return response()->json(['ok' => 'true'], 201);
    }

    public function interageComentario(Request $request){
        $exist = false;
        
        //verifica se essa interação ja existe
        $interacaoLeitor = InteracaoLeitor::where('comentario_idComentario', $request->post_idPost)
                            ->where('leitor_idLeitor', $request->leitor_idLeitor)
                            ->where('interacao_idInteracao', $request->interacao_idInteracao)
                            ->first();

        if ($interacaoLeitor)  {
            $exist = true;
            $interacaoLeitor->delete();
        }
            
        //se a interação não existia, cria uma nova
        //se a interação já existia, quer dizer que ele ta desfazendo ela
        if ($exist == false)
            $this->createInteracao($request);

        return response()->json(['ok' => 'true'], 201);
    }
}
