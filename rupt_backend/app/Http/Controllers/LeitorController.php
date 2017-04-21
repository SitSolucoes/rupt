<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Leitor;

class LeitorController extends Controller
{
    public function getLeitores(){
        $leitores = Leitores::all();
        $response = [
            'leitores' => $leitores
        ];
        return response()->json($response, 200);
    }
}
