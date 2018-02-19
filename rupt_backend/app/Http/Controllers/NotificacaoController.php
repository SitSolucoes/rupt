<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Notificacao;

class NotificacaoController extends Controller
{
    /*
    tipo: 
        1 - adm
        2 - seguir
        3 - reação
        4 - compartilhar 
        5 - comentar
    */

    public static function create($n){
        $notificacao = new Notificacao();

        $notificacao->escritor_idEscritor = $n->escritor_idEscritor;
        $notificacao->leitor_idLeitor = $n->leitor_idLeitor;
        $notificacao->descricao = $n->descricao;
        $notificacao->rota = $n->rota;
        $notificacao->lida = $n->lida;
        $notificacao->tipo = $n->tipo;

        $notificacao->save();
    }

    private function get($escritor_id){
        return Notificacao::where('escritor_idEscritor', $escritor_id)
                                   ->orderBy('created_at', 'desc')
                                   ->with('leitor')
                                   ->limit('20')
                                   ->get();
    }

    public function markAsRead(Request $request){
        $notificacoes = Notificacao::where('escritor_idEscritor', $request->escritor_id)
                                  ->where('lida', 0)
                                  ->get();

        foreach ($notificacoes as $notificacao) {
            $notificacao->lida = true;

            $notificacao->save();
        }
            
        return response()->json(['notificacoes' => $this->get($request->escritor_id)], 200);
    }

    public function getNotificacoes(Request $request){
        return response()->json(['notificacoes' => $this->get($request->escritor_id)], 200);
    }

}
