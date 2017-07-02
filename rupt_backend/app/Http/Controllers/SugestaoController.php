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
        $sugestao = Sugestao::orderBy("sugestoes")->where("status", 0);

        $response = [
            'sugestoes' => $sugestao->get()
        ];

        return response()->json($response, 200);
    }

    public function alteraStatus($id, $status){
        $sugestao = Sugestao::findOrFail($id);

        $sugestao->status = $status;
        $sugestao->save();

        return response()->json(['message' => "Sugestao alterada."], 200);
    }
}
