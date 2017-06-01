<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Escritor;
use App\Http\Controllers\LeitorController;

class EscritorController extends Controller
{
    public function getById($id){
        $escritor = Escritor::where('leitor_idLeitor', $id)->first();
        return $escritor;
    }

    public function getEscritores(){
        $leitorController = new LeitorController();
        $escritores = $leitorController->getEscritores();

        return response()->json(['escritores' => $escritores], 200);
    }

    public function countSolicitacoes(){
        $count = Escritor::where('status', 'p')->count();

        return response()->json(['countSolicitacoes' => $count], 200);
    }

    public function getSolicitacoes(){
        $leitorController = new LeitorController();
        $escritores = $leitorController->getSolicitacoes();

        return response()->json(['solicitacoes' => $escritores], 200);
    }

    public function update(Request $request, $id){
        $leitorController = new LeitorController();
        $leitorController->update($request, $id);

        $escritor = $this->getById($id);
        $escritor->rg = $request->rg;
        $escritor->cpf = $request->cpf;
        $escritor->biografia = $request->biografia;
        $escritor->banco = $request->banco;
        $escritor->agencia = $request->agencia;
        $escritor->conta_corrente = $request->conta_corrente;
        $escritor->status = $request->status;
        
        echo $escritor;
        
        $escritor->save();

        return response()->json(['message' => "Leitor alterado com Sucesso"], 200);
    }
}
