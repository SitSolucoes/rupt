<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Notificacao;

class NotificacaoController extends Controller
{
    public static function create($n){
        $notificacao = new Notificacao();

        $notificacao->escritor_idEscritor = $n->escritor_idEscritor;
        $notificacao->leitor_idLeitor = $n->leitor_idLeitor;
        $notificacao->descricao = $n->descricao;
        $notificacao->rota = $n->rota;
        $notificacao->lida = $n->lida;

        $notificacao->save();
    }

    private function get($escritor_id){
        return Notificacao::where('escritor_idEscritor', $escritor_id)
                                   ->orderBy('created_at', 'desc')
                                   ->limit('20')
                                   ->get();
    }

    public function markAsRead(Request $request){
        $notificacao = Notificacao::where('escritor_idEscritor', $request->escritor_id);

        $notificacao->lida = true;

        $notificacao->save();

        return response()->json(['notificacoes' => $this->get($request->escritor_id)], 200);
    }

    public function getNotificacoes(Request $request){
        return response()->json(['notificacoes' => $this->get($request->escritor_id)], 200);
    }

}
