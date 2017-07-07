<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Categoria;

class CategoriaController extends Controller
{
    public function getCategorias(){
        $categoria = Categoria::orderBy("categoria")
            ->where("categoria_idCategoria", null);

        return response()->json(['categorias' => $categoria->get()], 200);
    }

    public function getSubCategorias($id){
        $categoria = Sugestao::orderBy("categoria")
            ->where("categoria_idCategoria", $id);

        return response()->json(['subCategorias' => $categoria->get()], 200);
    }

    public function create(Request $request){
        $categoria = new Categoria();
        $categoria->categoria = $request->categoria;
        $categoria->status = $request->status;
        $categoria->save();

        return response()->json(['mensagem' => "Salvo com sucesso."], 200);
    }

    public function update(Request $request, $id){
        $categoria = Categoria::findOrFail($id);
        $categoria->categoria = $request->categoria;
        $categoria->status = $request->status;
        $categoria->save();

        return response()->json(['mensagem' => "Salvo com sucesso."], 200);
    }
}
