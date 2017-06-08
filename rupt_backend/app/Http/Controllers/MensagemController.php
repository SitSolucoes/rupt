<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Mensagem;
use App\Admin;
use Illuminate\Support\Facades\Mail;
use App\Mail\sendRespostaEmail;

class MensagemController extends Controller
{
    public function getMensagens_nLidas(){
        $mensagens = Mensagem::where('lida', false)
                             ->where('mensagem_idMensagem', null)
                             ->orderBy('created_At', 'desc')
                             ->get();
        return response()->json(['mensagens' => $mensagens], 200);
    }
    

    public function getMensagens_lidas(){
        $mensagens = Mensagem::where('lida', true)
                             ->where('mensagem_idMensagem', null)
                             ->orderBy('created_At', 'desc')
                             ->get();
        return response()->json(['mensagens' => $mensagens]);
    }

    public function getResposta($id){
        $resposta = Mensagem::where('mensagem_idMensagem', $id)->get()->first();
        return response()->json(['resposta' => $resposta]);
    }

    public function getMensagem($id){
        $mensagem = Mensagem::where('id', $id)
                             ->get()->first();
        return response()->json(['mensagem' => $mensagem]);
    }

     public function countMensagens_nLidas(){
        $count = Mensagem::where("lida", 0)->count();
        return response()->json(['quantidade' => $count]);
    }
    
    public function respondeMensagem(Request $request, $id){
        //pega dados para mensagem
        $mensagem = Mensagem::where('id','=', $id)->get()->first();
        $lida = $request->lida;
        $resposta = $request->resposta;
        $admin = Admin::where('id','=', $request->admin)->get()->first();
        //echo $admin;
        //erro
        if($mensagem == null || ($resposta == '' && !$lida) || $admin == null)
            return response()->json(['enviada' => false]);
        
        
        //atualiza mensagem
        //echo $admin->id;
        $mensagem->admin_idAdmin = $admin->id;
        //$mensagem->lida = true;
        $mensagem->save();
          
        //nova mensagem de resposta
        if($resposta != ''){
            $n_mensagem = new Mensagem();
            $n_mensagem->assunto = 'Resposta';
            $n_mensagem->conteudo = $request->resposta;
            $n_mensagem->lida = true;
            $n_mensagem->remetente = $admin->email;
            $n_mensagem->nome = $admin->name;
            $n_mensagem->admin_idAdmin = $admin->id;
            $n_mensagem->leitor_idLeitor = $mensagem->leitor_idLeitor;
            $n_mensagem->mensagem_idMensagem = $mensagem->id;
            $n_mensagem->save();

            //manda mensagem
            Mail::to($mensagem->remetente)
                ->send(new sendRespostaEmail($mensagem->assunto, 
                                            $request->resposta));
        }

        return response()->json(['enviada' => $resposta]);
    }
}
