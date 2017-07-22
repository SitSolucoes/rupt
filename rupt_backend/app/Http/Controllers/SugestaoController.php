<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Sugestao;
use App\Http\Controllers\CategoriaController;

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

    public function alteraStatus($id, $status){
        $sugestao = Sugestao::findOrFail($id);

        $sugestao->status = $status;
        $sugestao->save();

        return response()->json(['message' => "Sugestao alterada."], 200);
    }

    public function aceitar(Request $request, $idCategoria){
        $this->alteraStatus($request->id, 'a');

        $c = new CategoriaController();
        
        if ($idCategoria == 0)
            $c->create($request);
        else
            $c->createSubCategoria($request, $idCategoria);

        return response()->json(['message' => "Sugestao aceita."], 200);
    }
}
