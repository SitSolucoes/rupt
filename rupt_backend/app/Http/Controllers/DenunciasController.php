<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Denuncia;

class DenunciasController extends Controller
{
    public function getDenuncias(){
        $denuncias = Denuncia::orderBy('created_At', 'desc');

        $response = [
            'denuncias' => $denuncias->get()
        ];
        return response()->json($response, 200);
    }
}
