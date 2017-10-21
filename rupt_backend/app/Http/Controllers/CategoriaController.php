<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Collection;

use App\Categoria;

class CategoriaController extends Controller
{
    public function get($id){
        return Categoria::find($id);
    }

    public function getCategorias(){
        $categorias = Categoria::orderBy("categoria")
            ->where("categoria_idCategoria", null);

        $listCategorias = $this->recursiveSubCategorias($categorias->get());
        
        return response()->json(['categorias' => $listCategorias], 200);
    }

    public function getCategoriasAtivas(){
        $categorias = $this->categoriasAtivas();

        return response()->json(['categorias' => $categorias], 200);
    }    

    public function categoriasAtivas(){
        return Categoria::where('status', 1)->orderBy("categoria")
        ->where("categoria_idCategoria", null)->get();
    }
    
    public function categoriasToHome(){
        return Categoria::join('categoria_filtros', 'categoria_filtros.categoria_idCategoria', '=', 'categorias.id')
                        ->where('categorias.status', 1)
                        ->where("categorias.categoria_idCategoria", null)
                        ->orderBy("categoria_filtros.ordem", 'asc')->get();
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

    public function getSubCategorias($id){
        $categorias = Categoria::orderBy("categoria")
            ->where("categoria_idCategoria", $id);

        //return response()->json(['subCategorias' => $categorias->get()], 200);
        return $categorias->get();
    }

    public function create(Request $request){
        $categoria = new Categoria();
        $categoria->categoria = $request->categoria;
        $categoria->status = true;
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

    public function categoriaByPost($id){
        return Categoria::select('categorias.id')
                        ->join('post_categoria', 'post_categoria.post_idPost','=', $id);
    }

    public function casulaByPost($id){
        return Categoria::select('categorias.id', 'categorias.categoria')
                        ->join('post_categoria', 'post_categoria.categoria_idCategoria', '=', 'categorias.id')
                        ->where('post_categoria.post_idPost', '=', $id)
                        ->orderBy('post_categoria.id', 'desc')
                        ->get()
                        ->first();
    }

    public function createSubCategoria(Request $request, $id){
        $categoria = new Categoria();
        $categoria->categoria = $request->categoria;
        $categoria->status = true;
        $categoria->categoria_idCategoria = $id;
        $categoria->save();

        return response()->json(['categoria' => $categoria], 200);   
    }
    
}
