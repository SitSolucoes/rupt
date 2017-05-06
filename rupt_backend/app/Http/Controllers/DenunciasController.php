<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Denuncia;
use Illuminate\Support\Facades\DB;

class DenunciasController extends Controller
{
    public function getDenuncias(){
        $denuncias = Denuncia::select(DB::raw('*, count(post_idPost) as quantidade'))
                             ->groupBy('post_idPost', 'motivo_idMotivo')
                             ->orderBy('created_At', 'desc');
                             
        $response = [
            'denuncias' => $denuncias->get()
        ];
        return response()->json($response, 200);
    }
}
