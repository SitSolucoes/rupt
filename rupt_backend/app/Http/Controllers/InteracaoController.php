<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Interacao;

class InteracaoController extends Controller
{
    public function getInteracoes(){
        $interacoes = Interacao::where('ativo', 1)->get();

        return response()->json(['interacoes' => $interacoes], 200);
    }
}
