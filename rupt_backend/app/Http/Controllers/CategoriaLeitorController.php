<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\CategoriaLeitor;

class CategoriaLeitorController extends Controller
{
    public function create(Request $request){
        foreach ($request->categoriasLeitor as $cLeitor) {
            $categoriaLeitor = new CategoriaLeitor();
            $categoriaLeitor->leitor_idLeitor = $request->leitor_id;
            $categoriaLeitor->categoria_idCategoria = $cLeitor['categoria']['id'];
            $categoriaLeitor->peso = $cLeitor['peso'];
            $categoriaLeitor->save();
        }

        return response()->json(['mensagem' => 'Salvo com sucesso.'], 201);
    }

    public static function getByLeitor($leitor_idLeitor){
        return CategoriaLeitor::where('leitor_idLeitor', $leitor_idLeitor)
                              ->with('categoria')
                              ->get();
    }
}
