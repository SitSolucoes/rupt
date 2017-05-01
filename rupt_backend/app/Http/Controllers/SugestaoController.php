<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Sugestao;

class SugestaoController extends Controller
{
    public function getSugestoes(){
        $sugestao = Sugestao::orderBy("sugestoes");

        $response = [
            'sugestoes' => $sugestao->get()
        ];

        return response()->json($response, 200);
    }
}
