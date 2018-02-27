<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\CategoriaFiltro;

class CategoriaFiltroController extends Controller
{
    public function save(Request $request){
        $categorias = CategoriaFiltro::where('ordem',  '>=' ,$request->count)
                                     ->delete();

        for ($i = 0; $i < count($request->categoriasFiltro); $i++){
            $categoriaFiltro = CategoriaFiltro::where('ordem', $i)->first();

            if (!$categoriaFiltro){
                $categoriaFiltro = new CategoriaFiltro();
                $categoriaFiltro->ordem = $i;
            }

            $categoriaFiltro->categoria_idCategoria = $request->categoriasFiltro[$i]["categoria"]["id"];
            $categoriaFiltro->save();
        }

        return response()->json(['mensagem', 'Salvo com sucesso'], 200);
    }

    public function getCategoriasFiltro(){
        $categoriasFiltro = CategoriaFiltro::orderBy('ordem')
            ->whereHas('categoria', function ($query) {
                    $query->where('status', 1);
            })
            ->with('categoria')->get();

        return response()->json(['categoriasFiltro' => $categoriasFiltro], 200);
    }

    public function get(){
        return CategoriaFiltro::orderBy('ordem')
            ->whereHas('categoria', function ($query) {
                    $query->where('status', 1);
            })
            ->with('categoria')->get();
    }
}
