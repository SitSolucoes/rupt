<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Escritor;

class EscritorController extends Controller
{
    public function getById($id){
        $escritor = Escritor::where('leitor_idLeitor', $id)->get();

        return $escritor;
    }

    public function getEscritores(){
        $escritores = Escritor::where('status','<>', 'p')->with('leitor')->get();

        return response()->json(['escritores' => $escritores], 200);
    }

    public function getSolicitacoes(){
        $escritores = Escritor::where('status', 'a')->with('leitor')->get();

        return response()->json(['escritores' => $escritores], 200);
    }
}
