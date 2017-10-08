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
                echo 'entrou';
                $categoriaFiltro = new CategoriaFiltro();
                $categoriaFiltro->ordem = $i;
            }

            $categoriaFiltro->categoria_idCategoria = $request->categoriasFiltro[$i]["categoria"]["id"];
            $categoriaFiltro->save();
        }

        //echo count($request->categoriasFiltro);
    }
}
