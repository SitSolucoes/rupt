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
        $count = Escritor::where('data_aceite', null)->count();

        return response()->json(['countSolicitacoes' => $count], 200);
    }

    public function getSolicitacoes(){
        $leitorController = new LeitorController();
        $escritores = $leitorController->getSolicitacoes();

        return response()->json(['solicitacoes' => $escritores], 200);
    }

    private function createEscritor(Request $request, $escritor){
        $escritor->rg = $request->rg;
        $escritor->cpf = $request->cpf;
        $escritor->telefone = $request->telefone;
        $escritor->celular = $request->celular;
        $escritor->biografia = $request->biografia;
        $escritor->banco = $request->banco;
        $escritor->agencia = $request->agencia;
        $escritor->conta_corrente = $request->conta_corrente;
        $escritor->status = $request->status;

        return $escritor;
    }

    public function create(Request $request, $admin_idAdmin){
        $leitorController = new LeitorController();
        $leitor_idLeitor = $leitorController->create($request);

        $escritor = new Escritor();
        $escritor = $this->createEscritor($request, $escritor);

        $escritor->leitor_idLeitor = $leitor_idLeitor;
        $escritor->motivo_recusa = "";
        $escritor->admin_idAdmin = $admin_idAdmin;
        $escritor->data_aceite = date('Y-m-d H:i:s');

        $escritor->save();

        return response()->json(['message' => "Escritor aceito."], 200);
    }

    public function update(Request $request, $id){
        $leitorController = new LeitorController();
        $leitorController->update($request, $id);

        $escritor = $this->getById($id);
        $escritor = $this->createEscritor($request, $escritor);
        
        $escritor->save();

        return response()->json(['message' => "Escritor alterado com sucesso."], 200);
    }

    public function recusar(Request $request, $id){
        $escritor = $this->getById($id);
        $escritor->status = "r";
        $escritor->motivo_recusa = $request->motivo_recusa;

        $escritor->save();

        return response()->json(['message' => "Escritor recusado."], 200);
    }

    public function aceitar($id, $admin_idAdmin){
        $escritor = $this->getById($id);

        $escritor->status = "a";
        $escritor->motivo_recusa = "";
        $escritor->admin_idAdmin = $admin_idAdmin;
        $escritor->data_aceite = date('Y-m-d H:i:s');

        $escritor->save();

        return response()->json(['message' => "Escritor aceito."], 200);
    }
}
