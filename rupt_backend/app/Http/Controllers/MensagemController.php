<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Mensagem;

class MensagemController extends Controller
{
    public function getMensagens_nLidas(){
        $mensagens = Mensagem::where('lida', false)->get();
        return response()->json(['mensagens' => $mensagens], 200);
    }

     public function countMensagens_nLidas(){
        $count = Mensagem::where("lida", 0)->count();
        return response()->json(['quantidade' => $count]);
    }
    
}
