<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Leitor;

class LeitorController extends Controller
{
    public function signin(Request $request){
        $credentials = $request->only('email', 'password');
        $email = $request->input('email');
        $senha = $request->input('password');
        try{
            $leitor = Leitor::where('email', $request->input('email'))
            ->where('ativo', 1)
            ->first();
            if($leitor != null){
                if($leitor->password == bcrypt($senha) || $leitor->password = $senha){
                    $leitor->tokenLogin = $this->generateRandomString($email);//token gerado;
                    $leitor->tokenExpira = date_default_timezone_get();
                    $leitor->save();

                    return response()->json([
                        'token' => $leitor->tokenLogin,
                        'user_name' => $leitor->nome,
                        'user_id' => $leitor->id
                    ],200);       
                }else
                    return response()->json([
                        'erro' => 'Senha incorreta'
                    ],500);
            }else
                return response()->json([
                    'erro' => 'Email não localizado'
                ],500);
            
        }catch(JWTException $e){
            return response()->json(['error' => 'Erro JWT'],401);
        }
    }
    
    private function generateRandomString($email){
        $characters = $email . 'segurancapesada';
        $charactersLength = strlen($characters);
        $randomString = '';
        $length = 45;
        for ($i = 0; $i < $length; $i++) {
            $randomString .= $characters[rand(0, $charactersLength - 1)];
        }
        return $randomString;
    }
    private function getById($id){
        $leitor = Leitor::where('id', $id)->get();
        return $leitor;
    }

    public function create($request){
        $leitor = new Leitor(); 
        try{
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
        }catch(Exception $exception){
            return null;
        }
        return $leitor->id;
        
    }
    
    public function store(Request $request){
        $leitor = new Leitor();
        try{
            $leitor_id = $this->create($request);
            if($leitor_id != null){
                $leitor = $this->getById($leitor_id)->first();
                return response()->json([
                    'message'=>'Leitor criado com sucesso!',
                    'id_leitor'=>$leitor->id,
                    'nome_leitor'=>$leitor->nome
                ],201);        
            }
        }catch(Exception $e){

        }
        

        
    }

    public function getLeitor($id){
        $leitor = $this->getById($id)->first();

        return response()->json(['leitor' => $leitor], 200);
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

}
