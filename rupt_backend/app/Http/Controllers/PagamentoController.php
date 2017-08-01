<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Pagamento;

class PagamentoController extends Controller
{
    public function update (Request $request, $id){
        $pagamento = Pagamento::find($id);
        $pagamento->admin_idAdmin = $request->admin;
        $pagamento->src_comprovante = $request->src_comprovante;
        $pagamento->pago = true;
        $pagamento->save();

        return response()->json(['message' => "salvo."], 200);
    }

    public function getPagamentosPendentes(Request $request){
        $pagamentos = Pagamento::where('pago', '<>', 1)->get();

        return response()->json(['pagametos' => $pagamentos], 200);
    }

    public function getPagamentos(Request $request){
        $pagamentos = Pagamento::where('pago', 1)->get();

        return response()->json(['pagametos' => $pagamentos], 200);
    }

    public function countPagamentosPendentes(){
        $count = Pagamento::where('pago', '<>', 1)->count();
        return response()->json(['countPagamentos' => $count]);
    }
}
