<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class CategoriaController extends Controller
{
    public function getCategorias(){
        $categoria = Sugestao::orderBy("categoria")
            ->where("categoria_idCategoria", null);

        return response()->json(['categorias' => $categoria->get()], 200);
    }

    public function getSubCategorias($id){
        $categoria = Sugestao::orderBy("categoria")
            ->where("categoria_idCategoria", $id);

        return response()->json(['subCategorias' => $categoria->get()], 200);
    }
}
