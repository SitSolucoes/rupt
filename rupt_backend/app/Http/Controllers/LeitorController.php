<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Hash;
use App\Mail\EsqueciSenhaLeitor;
use App\Leitor;

class LeitorController extends Controller
{
    private function createLeitor (Request $request, $leitor){
        $leitor->nome = $request->input('nome');
        //tratar nick
        if($request->input('nick') != ''){
            $leitor->nick = $request->input('nick');
        }else{
            $quantidade = Leitor::where('nick', $request->input('nome'))
                                ->count();
            $nick = "Nick Default";
            if($quantidade > 0){
                $nick = $leitor->nome . $quantidade;
            }else{
                $nick = $leitor->nome;
            }
            $leitor->nick = $nick;
        }
        $leitor->email = $request->input('email');
        $date = str_replace('/', '-', $request->input("nascimento"));
        $leitor->nascimento = date('Y-m-d', strtotime($date));
        $leitor->sexo = $request->input('sexo');
        $leitor->biografia = $request->biografia;
        $leitor->ativo = $request->input('ativo');
        if($request->input('fb_login') == true){
            $aux_nick_nr = Leitor::where('nick', 'like', '%' . $leitor->nome . '%')->count();
            if($aux_nick_nr != null && $aux_nick_nr > 0){
                $leitor->nick .= $aux_nick_nr;
            }else{
                $leitor->nick = $leitor->nome;   
            }
            $leitor->token_fb = $request->input('token');
            $leitor->uid_fb = $request->input('fb_uid');
            $leitor->src_foto = $request->input('src_foto');
        }

        return $leitor;
    }

    public function checkFbToken($token, $uid){
        
        
        $retorno = [
            'resultado' => false,
            'leitor' => null
        ];
        
        if(!$token || $token == null){
            return response()->json($retorno, 200);
        }

        $leitor = Leitor::where('token_fb', $token)->orWhere('uid_fb', $uid)->get()->first();
        
        if($leitor != null){
            $retorno['leitor'] = $leitor;
            $retorno['resultado'] = true;
        }
        
        return response()->json((object)$retorno, 200);        
        
        
    }

    private function getById($id){
        $leitor = Leitor::where('id', $id)->get();
        return $leitor;
    }

    public function create($request){
        $leitor = new Leitor(); 
        $leitor = $this->createLeitor($request, $leitor);

        if($request->input('fb_login') != null && $request->input('fb_login') != false){
            $leitor->save();
            return $leitor->id;
        }

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

        $leitor = Leitor::where('id', $leitor->id)
                        ->with('escritor')
                        ->first();

        $response = [
            'message' => "Leitor alterado com sucesso",
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
                'message' => 'Leitor criado com sucesso',
                'id' => $leitor->id,
            ],201);        
        }
    }

    public function getLeitor($id){
        $leitor = $this->getById($id)->first();

        return response()->json(['leitor' => $leitor], 200);
    }

    public function validaToken($token){
        $leitor = Leitor::where('token_esqueci_senha', $token)->first();
        try{
            if($leitor != null){
                return response()->json(['resultado' => true, 'leitor' => $leitor->email], 200);
            }
                return response()->json(['resultado' => false, 'mensagem' => "Parece que este email já foi utilizado para recuperação de senha uma vez, por favor, solicite uma nova redefinição ou entre em contato com nossa equipe."], 200);
        }catch(Exception $ex){
            return response()->json(['resultado' => false, 'mensagem' => "Ocorreu um erro, por favor, tente novamente mais tarde ou entre em contato com nossa equipe."], 200);
        }
    }

    public function esqueciSenha(Request $request){
        $leitor = Leitor::where('email', $request->email)->first();
        try{
            if($leitor != null){    
                if(!$leitor->ativo)
                    return response()->json(['retorno' => false, 'mensagem' => 'Seu usuário está desativado, caso você nunca tenha recebido nenhum aviso ou alerta sobre este tema, por favor, entre em contato.'], 200);
                $destino = $leitor->email;
                $rdm_token = str_random(60);
                $leitor->token_esqueci_senha = $rdm_token;
                $leitor->save();
                Mail::to($destino)->send(new esqueciSenhaLeitor($rdm_token));
                return response()->json(['retorno' => true, 'mensagem' => "Um e-mail foi enviado com as instruções para recuperação da senha."]);
            }else{
                return response()->json(['retorno' => false, 'mensagem' => "Seu email não foi encontrado em nossa base de dados, por favor confira os dados digitados."], 200);
            }
        }catch(ErrorException $e){
            return response()->json(['retorno' => false, 'mensagem' => "Um erro inesperado ocorreu, tente novamente mais tarde"], 200);
        }
        
    }

    public function validaTokenRedefine($token){
        $admin = Admin::where('token_esqueci_senha', $token)->first();
        if($admin != null)
            return response()->json(['valido' => true], 200);
        else
            return response()->json(['valido' => false], 200);
    }

    public function redefineSenha(Request $request){
        $leitor = Leitor::where('email', $request->input('email'))
        ->first();
        
        if($leitor != null){
            if($leitor->token_esqueci_senha === '')
                return response()->json(['retorno' => "Sua senha já foi redefinida, caso esteja enfrentando problemas com nosso serviço de recuperação, entre em"], 200);
            $leitor->token_esqueci_senha = '';
            $leitor->password = bcrypt($request->input('senha'));
            $leitor->save();
            return response()->json(['retorno' => "Senha redefinida com sucesso! Efetue o login"], 200);
        }
        echo $request->input('token');
        return response()->json(['retorno' => "Ocorreu um erro em nossos servidores, por favor, entre em contato com nossa equipe e nos informe esse problema!"], 200);
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
                        ->where('id', '<>', $id)
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
                 ->where('escritores.data_aceite', null);
        })->get();    
    }

    public function countSolicitacoes(){
        $count = Leitor::join('escritores', function ($join) {
            $join->on('leitores.id', '=', 'escritores.leitor_idLeitor')
                 ->where('escritores.data_aceite', null);
            })->count();    
        
        return response()->json(['countSolicitacoes' => $count], 200);
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
        $logado = false;
        
        if(($request->fb_login == null || $request->fb_login == false) && $request->email == null)
            return response()->json(['login' => "Email e/ou Senha incorretos"], 200);
        
        if($request->fb_login != null && $request->fb_login != false){
            $leitor = Leitor::where('token_fb', $request->token)->orWhere('uid_fb', $request->fb_uid)->with('escritor')->first();
        }else{
            $leitor = Leitor::where('email', $request->email)->with('escritor')->first();
        }
        
        if ($leitor){
            if (!$leitor->ativo){
                return response()->json(['login' => "Conta desativada."], 200);
            }
            if (Hash::check($request->password, $leitor->password)){
                $logado = true;
            }else {
                if($request->fb_login != null && $request->fb_login != false){
                    if($request->token == $leitor->token_fb || $request->fb_uid == $leitor->uid_fb){
                        $logado = true;
                    }
                }
            }

            if($logado){
                $token = date('z')*$leitor->id;
                    $leitor->tokenLogin = Hash::make($token);
                    $leitor->save();
                    $logado = true;
                    $response = [
                        'leitor' => $leitor,
                        'token' => $leitor->tokenLogin,
                        'login' => true
                    ];
                        
                    return response()->json($response, 200);
            }else{
                return response()->json(['login' => "Email e/ou Senha incorretos"], 200);
            }
        }
        else 
            return response()->json(['login' => "Email e/ou Senha incorretos"], 200);
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
