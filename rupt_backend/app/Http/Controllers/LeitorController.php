<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Leitor;

class LeitorController extends Controller
{
    public function store(Request $request){
       $leitor = new Leitor(); 
        $leitor->nome = $request->input('nome');
        $leitor->nick = $request->input('nick');
        $leitor->email = $request->input('email');
        $date = str_replace('/', '-', $request->input("nascimento"));
        $leitor->nascimento = date('Y-m-d', strtotime($date));
        $leitor->sexo = $request->input('sexo');
        $leitor->src_foto = $request->input('src_foto');
        $leitor->password = bcrypt($request->input('password'));
        $leitor->ativo = $request->input('ativo');
        $leitor->save();

        return response()->json([
                'message'=>'Leitor criado com sucesso!'
            ],201);
    }

    public function getById($id){
        $leitor = Leitor::where('id', $id)->get();
        return $leitor;
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
        $leitor->ativo = $request->input('ativo');
        $leitor->save();

        $response = [
            'message' => "Leitor alterado com Sucesso"
        ];

        return response()->json($response, 200);
    }

    public function validaNick($nick, $id){
        $leitor = Leitor::where("nick", $nick)
                        ->where("id", '<>', $id)
                        ->first();

        if ($leitor == null)
            return response()->json(['nick' => false], 200);

        return response()->json(['nick' => true], 200);
    }

    public function validaEmail($email, $id){
        $leitor = Leitor::where("email", $email)
                        ->where("id", '<>', $id)
                        ->first();

        if ($leitor == null)
            return response()->json(['email' => false], 200);

        return response()->json(['email' => true], 200);
    }

    public function getEscritores(){
        return Leitor::join('escritores', function ($join) {
            $join->on('leitores.id', '=', 'escritores.leitor_idLeitor')
                 ->where('data_aceite', '<>', null);
        })->get();
    }

    public function getSolicitacoes(){
        return Leitor::join('escritores', function ($join) {
            $join->on('leitores.id', '=', 'escritores.leitor_idLeitor')
                 ->where('data_aceite', null);
        })->get();    
    }

}
