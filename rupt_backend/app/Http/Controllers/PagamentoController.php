<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Pagamento;

class PagamentoController extends Controller
{
    public function create(Request $request){
        $pagamento = new Pagamento();
        
        //tem que ter isso aqui
        $pagamento->pago = false;
        
        //terminar o método
    }

    public function update (Request $request){
        $pagamento = Pagamento::find($request->id);
        $pagamento->admin_idAdmin = $request->admin_idAdmin;
        
        if ($request->data_pagamento){
            $pagamento->pago = true;
            $date = str_replace('/', '-', $request->data_pagamento);
            $pagamento->data_pagamento = date('Y-m-d', strtotime($date));
        }
        else {
            $pagamento->pago = false;
        }

        $pagamento->save();

        return response()->json(['message' => "salvo."], 200);
    }

    public function getPagamentosPendentes(Request $request){
        $pagamentos = Pagamento::where('pago', '<>', 1)
                                ->with('leitor')->get();
                      
        return response()->json(['pagamentos' => $pagamentos], 200);
    }

    public function getPagamentos(Request $request){
        $pagamentos = Pagamento::where('pago', 1)
                                ->with('leitor')->get();

        return response()->json(['pagamentos' => $pagamentos], 200);
    }

    public function countPagamentosPendentes(){
        $count = Pagamento::where('pago', '<>', 1)->count();
        return response()->json(['countPagamentos' => $count]);
    }

    public function uploadDoc (Request $request, $id){
        $originalName = $_FILES['file']['name'];

        $ext = '.'.pathinfo($originalName, PATHINFO_EXTENSION);
        $generatedName = "comprovante_".$id.$ext;
        
        $request->file('file')->move("docs", $generatedName);

        $pagamento = Pagamento::find($id);
        $pagamento->src_comprovante = $generatedName;
        $pagamento->save();

        return response()->json(['message' => "Upload."], 201);
    }
}
