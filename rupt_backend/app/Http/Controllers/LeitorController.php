<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Leitor;

class LeitorController extends Controller
{
     public function store(Request $request){
        $date = str_replace('/', '-', $request->input("nascimento"));

        $leitor = new leitor([
            'nome' => $request->input('nome'),
            'nick' => $request->input('nick'),
            'email' => $request->input('email'),
            'nascimento' => date('Y-m-d', strtotime($date)),
            'sexo' => $request->input('sexo'),
            'src_foto' => $request->input('src_foto'),
            'password' => bcrypt($request->input('password')),
        ]);

        $leitor->save();

        return response()->json([
                'message'=>'Leitor criado com sucesso!'
            ],201);
    }

    public function getLeitores(){
        $leitores = Leitor::all();
        $response = [
            'leitores' => $leitores
        ];
        return response()->json($response, 200);
    }

}
