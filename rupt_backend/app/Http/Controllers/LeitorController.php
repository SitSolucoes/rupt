<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Leitor;

class LeitorController extends Controller
{
    private function createLeitor (Request $request, $leitor){
        $leitor->nome = $request->input('nome');
        $leitor->nick = $request->input('nick');
        $leitor->email = $request->input('email');
        $date = str_replace('/', '-', $request->input("nascimento"));
        $leitor->nascimento = date('Y-m-d', strtotime($date));
        $leitor->sexo = $request->input('sexo');
        $leitor->biografia = $request->biografia;
        $leitor->ativo = $request->input('ativo');

        return $leitor;
    }

    private function getById($id){
        $leitor = Leitor::where('id', $id)->get();
        return $leitor;
    }

    public function create($request){
        $leitor = new Leitor(); 
        $leitor = $this->createLeitor($request, $leitor);
        $leitor->password = Hash::make($request->input('password'));
        $leitor->src_foto = 'default.png';
        $leitor->src_capa = 'capa.png';
        $leitor->save();
        
        return $leitor->id;
    }

    public function update(Request $request, $id){
        $leitor = Leitor::find($id);
        if (!$leitor) {
            return response()->json(['message' => 'Leitor não encontrado'], 404);
        }
        
        $leitor = $this->createLeitor($request, $leitor);
        $leitor->save();

        $response = [
            'message' => "Leitor alterado com Sucesso",
            'leitor' => $leitor
        ];

        return response()->json($response, 200);
    }
    
    public function store(Request $request){
        $leitor = new Leitor();
    
        $leitor_id = $this->create($request);
        if($leitor_id != null){
            $leitor = $this->getById($leitor_id)->first();
            return response()->json([
                'message' => 'Leitor criado com sucesso!',
                'id' => $leitor->id,
            ],201);        
        }
    }

    public function getLeitor($id){
        $leitor = $this->getById($id)->first();

        return response()->json(['leitor' => $leitor], 200);
    }

    public function esqueciSenha(Request $request){
        $leitor = Leitor::where('email', $request->email)->get();
        try{
            if(count($leitor) > 0){
                return response()->json(['retorno' => true], 200);
            }else{
                return response()->json(['retorno' => false], 200);
            }
        }catch(ErrorException $e){
            return response()->json(['retorno' => false], 200);
        }
        
    }

    public function getLeitorByNick($nick){
        $leitor = Leitor::where('nick', $nick)->with('escritor')->first();

        return response()->json(['leitor' => $leitor], 200);
    }

    public function getLeitores(){
        $leitores = Leitor::orderBy("nome");

        $response = [
            'leitores' => $leitores->get()
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
        })->orderBy('nick')->get();
    }

    public function getEscritor($id){
        return Leitor::join('escritores', function ($join) {
            $join->on('leitores.id', '=', 'escritores.leitor_idLeitor')
                 ->where('data_aceite', '<>', null)
                 ->where('id', '=', $id);
        })->get()->first();
    }

    public function getSolicitacoes(){
        return Leitor::join('escritores', function ($join) {
            $join->on('leitores.id', '=', 'escritores.leitor_idLeitor')
                 ->where('data_aceite', null);
        })->get();    
    }

    public function getIdByNick($nick){
        $leitor = Leitor::where("nick", $nick)->first();
        
        if ($leitor)
            return $leitor->id;     
        else
            return -1;
    }

    public function getIdByEmail($email){
        $leitor = Leitor::where("email", $email)->first();

        if ($leitor)
            return $leitor->id;     
        else
            return -1;
    }

    public function signin (Request $request){
        $leitor = Leitor::where('email', $request->email)->with('escritor')->first();
        
        if ($leitor){
            if (!$leitor->ativo){
                return response()->json(['login' => "Conta desativada."], 200);
            }

            if (Hash::check($request->password, $leitor->password)){
                $token = date('z')*$leitor->id;
                $leitor->tokenLogin = Hash::make($token);
                $leitor->save();

                $response = [
                    'leitor' => $leitor,
                    'token' => $leitor->tokenLogin,
                    'login' => true
                ];
                    
                return response()->json($response, 200);
            }
            else 
                return response()->json(['login' => "Senha incorreta."], 200);
        }
        else 
            return response()->json(['login' => "Email não encontrado."], 200);
    }

    public function verificaLogin(Request $request){
        if ($request->token){
            $leitor = Leitor::where('id', $request->id)
                        ->where('tokenLogin', $request->token)
                        ->with('escritor')
                        ->with('categoriaLeitor')->first();

            if ($leitor)
                return response()->json(['leitor' => $leitor], 200);
        }
        
        return response()->json(['leitor' => false], 200);
    }

    public function uploadImages (Request $request, $id){
        $leitor = Leitor::find($id);
        $path = public_path()."/"."profile/";
        
        if (isset($_FILES['doc1']['tmp_name'])){
            move_uploaded_file($_FILES['doc1']['tmp_name'], $path.$id."_profile.".pathinfo($_FILES['doc1']['name'], PATHINFO_EXTENSION));
            $leitor->src_foto = $id."_profile.".pathinfo($_FILES['doc1']['name'], PATHINFO_EXTENSION);
        }
        if (isset($_FILES['doc2']['tmp_name'])){
            move_uploaded_file($_FILES['doc2']['tmp_name'], $path.$id."_capa.".pathinfo($_FILES['doc2']['name'], PATHINFO_EXTENSION));
            $leitor->src_capa = $id."_capa.".pathinfo($_FILES['doc2']['name'], PATHINFO_EXTENSION);
        }
        
        $leitor->save();

        return response()->json(['message' => "Escritor alterado com sucesso."], 200);
    }

}
