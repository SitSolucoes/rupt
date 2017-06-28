<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Denuncia;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\PostController;
use App\Http\Controllers\LeitorController;

class DenunciasController extends Controller
{
    public function getDenuncias(){
        $denuncias = Denuncia::select(DB::raw('denuncias.*, count(post_idPost) as quantidade'))
                             ->groupBy('post_idPost', 'motivo_idMotivo')
                             ->orderBy('created_At', 'desc');
        
        $response = [
            'denuncias' => $denuncias->get()
        ];
        return response()->json($response, 200);
    }

    public function getPost($id){
        $c = new PostController();
        $response = [
            'post' => $c->getById($id)
        ];
        return response()->json($response, 200);
    }

    public function getLeitor($id){
        $c = new LeitorController();
        $response = [
            'leitor' => $c->getLeitor($id)
        ];
        return response()->json($response, 200);
    }

    public function getMotivo($id){
        $c = new MotivoD();
        $response = [
            'leitor' => $c->getById($id)
        ];
        return response()->json($response, 200);
    }
}
