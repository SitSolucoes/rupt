<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Notificacao;

class NotificacaoController extends Controller
{
    public function create(Request $request){
        $notificacao = new Notificacao();

        $notificacao->escritor_idEscritor = $request->escritor_id;
        $notificacao->leitor_idLeitor = $request->leitor_id;
        $notificacao->descricao = $request->descricao;
        $notificacao->rota = $request->rota;
        $notificacao->lida = $request->lida;

        $notificacao->save();

        return response()->json(['notificacao' => true], 201);
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
