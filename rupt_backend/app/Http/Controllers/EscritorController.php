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
        $escritor->rg = preg_replace("/[^0-9]/","", $request->rg);
        $escritor->cpf = $this->Mask("###.###.###-##", $request->cpf);
        $escritor->telefone = $request->telefone;
        $escritor->celular = $request->celular;
        $escritor->banco = $request->banco;
        $escritor->agencia = $request->agencia;
        $escritor->conta_corrente = $request->conta_corrente;
        $escritor->status = $request->status;
        $escritor->cep = $request->cep;
        $escritor->logradouro = $request->logradouro;
        $escritor->numero = $request->numero;
        $escritor->complemento = $request->complemento;
        $escritor->bairro = $request->bairro;
        $escritor->cidade = $request->cidade;
        $escritor->uf = $request->uf;

        return $escritor;
    }

    public function create(Request $request, $id, $admin_idAdmin){
        $leitorController = new LeitorController();

        if ($id == 0)
            $leitor_idLeitor = $leitorController->create($request);
        else {
            $leitor_idLeitor = $id;
            $leitorController->update($request, $id);
        }
        
        $escritor = new Escritor();
        $escritor = $this->createEscritor($request, $escritor);

        $escritor->leitor_idLeitor = $leitor_idLeitor;
        $escritor->motivo_recusa = "";
        $escritor->admin_idAdmin = $admin_idAdmin;
        
        if ($admin_idAdmin != 0)
            $escritor->data_aceite = date('Y-m-d H:i:s');

        $escritor->save();

        return response()->json(['leitor_idLeitor' => $leitor_idLeitor], 200);
    }

    public function update(Request $request, $id){
        $leitorController = new LeitorController();
        $leitorController->update($request, $id);

        $escritor = $this->getById($id);
        $escritor = $this->createEscritor($request, $escritor);
        
        $escritor->save();

        return response()->json(['message' => "Escritor alterado com sucesso."], 200);
    }

    public function uploadDocs (Request $request, $id){
        $path = public_path()."/"."docs/";
        
        move_uploaded_file($_FILES['doc1']['tmp_name'], $path.$id."_1.".pathinfo($_FILES['doc1']['name'], PATHINFO_EXTENSION));
        move_uploaded_file($_FILES['doc2']['tmp_name'], $path.$id."_2.".pathinfo($_FILES['doc2']['name'], PATHINFO_EXTENSION));
        move_uploaded_file($_FILES['doc3']['tmp_name'], $path.$id."_3.".pathinfo($_FILES['doc3']['name'], PATHINFO_EXTENSION));

        $escritor = $this->getById($id);
        $escritor->doc_1 = $id."_1.".pathinfo($_FILES['doc1']['name'], PATHINFO_EXTENSION);
        $escritor->doc_2 = $id."_2.".pathinfo($_FILES['doc2']['name'], PATHINFO_EXTENSION);
        $escritor->doc_3 = $id."_3.".pathinfo($_FILES['doc3']['name'], PATHINFO_EXTENSION);
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

    public function existEmail($email){
        $controller = new LeitorController();
        $id = $controller->getIdByEmail($email);

        $escritor = $this->getById($id);

        if ($escritor || $id == -1) //achou o leitor ou é escritor
            return response()->json(['idLeitor' => 0], 200);
        else //achou apenas leitor
            return response()->json(['idLeitor' => $id], 200);
    }

    public function existNick($nick){
        $controller = new LeitorController();
        $id = $controller->getIdByNick($nick);

        $escritor = $this->getById($id);

        if ($escritor || $id == -1) //achou o leitor ou é escritor
            return response()->json(['idLeitor' => 0], 200);
        else //achou apenas leitor
            return response()->json(['idLeitor' => $id], 200);
    }

    private function Mask($mask,$str){
        $str = preg_replace("/[^0-9]/","", $str);

        for($i=0;$i<strlen($str);$i++){
            $mask[strpos($mask,"#")] = $str[$i];
        }

        return $mask;
    }

    public function existCpf($cpf, $id){
        //refaz a máscara porque no bd ta salvo com a máscara
        $cpfFormatado = $this->Mask("###.###.###-##", $cpf);
        
        $escritor = Escritor::where('cpf', $cpfFormatado)
                            ->where('leitor_idLeitor', "<>", $id)
                            ->first();

        if ($escritor)
            return response()->json(['existCpf' => true], 200);
        else
            return response()->json(['existCpf' => false], 200);
    }
}
