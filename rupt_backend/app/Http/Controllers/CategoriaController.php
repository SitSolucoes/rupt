<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Collection;

use App\Categoria;

class CategoriaController extends Controller
{
    public function getCategorias(){
        $categorias = Categoria::orderBy("categoria")
            ->where("categoria_idCategoria", null);

        /*$listCategoria = new Collection();

        foreach($categorias->get() as $categoria){
            $categoria->subCategorias = $this->getSubCategorias($categoria->id);
            $listCategoria->push($categoria);
        }

        echo $listCategoria;*/

        $listCategorias = $this->recursiveSubCategorias($categorias->get());
        
        echo $listCategorias;

        //return response()->json(['categorias' => $listCategoria], 200);
    }

    private function recursiveSubCategorias($categorias){
         $listCategoria = new Collection();

         foreach($categorias as $categoria){
             $listSubCategoria = $this->getSubCategorias($categoria->id);
             if ($listSubCategoria){
                 $listSubCategoria = $this->recursiveSubCategorias($listSubCategoria);
             }
             $categoria->subCategorias = $listSubCategoria;
             $listCategoria->push($categoria);
         }

         return $listCategoria;
    }

    private function getSubCategorias($id){
        $categorias = Categoria::orderBy("categoria")
            ->where("categoria_idCategoria", $id);

        //return response()->json(['subCategorias' => $categorias->get()], 200);
        return $categorias->get();
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

    public function createSubCategoria(Request $request, $id){
        $categoria = new Categoria();
        $categoria->categoria = $request->categoria;
        $categoria->status = $request->status;
        $categoria->categoria_idCategoria = $id;
        $categoria->save();

        return response()->json(['mensagem' => "Salvo com sucesso."], 200);   
    }
}
