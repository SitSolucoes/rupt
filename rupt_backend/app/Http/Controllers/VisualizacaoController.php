<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Visualizacao;

class VisualizacaoController extends Controller
{
    public static function create(Request $request){
        $v = new Visualizacao();
        $v->leitor_idLeitor = $request->leitor_id;
        $v->post_idPost = $request->post_id;
        $v->save();

        return response()->json(201);
    }
}
