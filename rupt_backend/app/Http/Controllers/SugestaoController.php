<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Sugestao;

class SugestaoController extends Controller
{
    public function countSugestoes(){
        $count = Sugestao::where("status", null)->count();
        return response()->json(['countSugestoes' => $count]);
    }
    
    public function getSugestoes(){
        $sugestao = Sugestao::orderBy("sugestoes")->where("status", null);

        $response = [
            'sugestoes' => $sugestao->get()
        ];

        return response()->json($response, 200);
    }
}
