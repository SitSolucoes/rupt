<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Collection;

use App\Categoria;

class CategoriaController extends Controller
{
    private function getByLink($link, $id){
        return Categoria::where('link', $link)
                        ->where('id', '<>', $id)
                        ->first();
    }
    
    private function createLink($categoria, $id){
        $link = str_replace(' ', '-', $categoria);

        $link = strtolower(preg_replace(array("/(á|à|ã|â|ä)/","/(Á|À|Ã|Â|Ä)/","/(é|è|ê|ë)/","/(É|È|Ê|Ë)/","/(í|ì|î|ï)/","/(Í|Ì|Î|Ï)/","/(ó|ò|õ|ô|ö)/","/(Ó|Ò|Õ|Ô|Ö)/","/(ú|ù|û|ü)/","/(Ú|Ù|Û|Ü)/","/(ñ)/","/(Ñ)/","/(ç)/","/(Ç)/"),explode(" ","a A e E i I o O u U n N c C"), $link));

        $i = 2;
        
        while ($this->getByLink($link, $id)){
            $link .= '-'.$i;
        }

        return $link;
    }

    public function create(Request $request){
        $categoria = new Categoria();
        $categoria->categoria = $request->categoria;
        $categoria->status = true;
        $categoria->link = $this->createLink($request->categoria, 0);
        $categoria->save();

        return response()->json(['mensagem' => "Salvo com sucesso."], 200);
    }

    public function update(Request $request, $id){
        $categoria = Categoria::findOrFail($id);
        $categoria->categoria = $request->categoria;
        $categoria->status = $request->status;
        $categoria->link = $this->createLink($request->categoria, $id);
        $categoria->save();

        return response()->json(['mensagem' => "Salvo com sucesso."], 200);
    }

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

    private function getSubCategorias($id){
        return Categoria::where('categoria_idCategoria', $id)
                        ->where('status', 1)
                        ->get();
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
    
    public function getCategoriaByLink($link){
        $categoria = $this->getByLink($link, 0);

        return response()->json(['categoria' => $categoria], 200);
    }
}
