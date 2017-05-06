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
        $leitores = Leitor::orderBy("nome");

        $response = [
            'leitores' => $leitores->get()
        ];

        return response()->json($response, 200);
    }

    public function update(Request $request, $id){
        $leitor = Leitor::find($id);
        if (!$leitor) {
            return response()->json(['message' => 'Leitor não encontrado'], 404);
        }
        
        $leitor->nome = $request->input('nome');
        $leitor->nick = $request->input('nick');
        $leitor->email = $request->input('email');
        $date = str_replace('/', '-', $request->input("nascimento"));
        $leitor->nascimento = date('Y-m-d', strtotime($date));
        $leitor->sexo = $request->input('sexo');
        $leitor->save();

        $response = [
            'message' => "Leitor alterado com Sucesso"
        ];

        return response()->json($response, 200);
    }

}
