<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Escritor;
use App\Http\Controllers\LeitorController;

class EscritorController extends Controller
{
    public function getById($id){
        $escritor = Escritor::where('leitor_idLeitor', $id)->get();

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
}
