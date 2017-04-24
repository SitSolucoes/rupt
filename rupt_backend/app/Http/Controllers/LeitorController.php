<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Leitor;

class LeitorController extends Controller
{
     public function store(Request $request){
        $leitor = new leitor([
            'name' => $request->input('name'),
            'nick' => $request->input('nick'),
            'email' => $request->input('email'),
            'nascimento' => $request->input('nascimento'),
            'sexo' => $request->input('sexo'),
            'password' => bcrypt($request->input('password')),
        ]);

        $leitor->save();

        return response()->json([
                'message'=>'Leitor criado com sucesso!'
            ],201);
    }

    public function getLeitores(){
        $leitores = Leitores::all();
        $response = [
            'leitores' => $leitores
        ];
        return response()->json($response, 200);
    }

}
