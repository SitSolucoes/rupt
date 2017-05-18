<?php

namespace App\Http\Controllers;

use App\Admin;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Exceptions\JWTException;
use Illuminate\Support\Facades\Hash;
use JWTAuth;
use App\Mail\EsqueciSenhaAdmin;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\DB;

class AdminController extends Controller
{
    public function store(Request $request){
        $this->validate($request,[
            'name'  => 'required',
            'email' => 'required|email|unique:admins',
            'password' => 'required'
        ]);

        $admin = new Admin([
            'name' => $request->input('name'),
            'email' => $request->input('email'),
            'ativo' => $request->input('ativo'),
            'password' => bcrypt($request->input('password'))
        ]);
        $admin->save();

        return response()->json([
                'message'=>'Administrador cadastrado com sucesso!'
            ],201);
    }
    
    public function signin(Request $request){
        $this->validate($request,[
            'email' => 'required|email',
            'password' => 'required'
        ]);
        $credentials = $request->only('email', 'password');
        try{
            if(!$token = JWTAuth::attempt($credentials)){
                return response()->json([
                    'error' => 'E-mail ou senha incorretos'// $request->input('password')
                ],401);
            }
        }catch(JWTException $e){
            return response()->json(['error' => 'Erro JWT'],401);
        }
        $admin = Admin::where('email', $request->input('email'))
                      ->where('ativo', 1)
                      ->first();
        if (Hash::check($request->input('password'), $admin->password)) {
             return response()->json([
                'token' => $token,
                'admin_name' => $admin->name,
                'admin_id' => $admin->id
            ],200);
        }                      
       
    }

    public function getAdmins(){
        $admins = Admin::orderBy('name');

        $response = [
            'admins' => $admins->get()
        ];
        return response()->json($response, 200);
    }

    public function getAdmin($id){
        $admin = Admin::find($id);
        $response = [
            'admin' => $admin
        ];
        return response()->json($response, 200);
    }

    public function update(Request $request, $id){
        $admin = Admin::find($id);
        if (!$admin) {
            return response()->json(['message' => 'Usuário administrador não encontrado.'], 404);
        }
        

        //echo $request->input('ativo');
        $admin->name = $request->input('name');
        if($admin->email != $request->input('email'))
            $admin->email = $request->input('email');
        $admin->ativo = $request->input('ativo');
        if($request->input('password') != '')
            $admin->password = bcrypt($request->input('password'));
        $admin->save();

        $response = [
            'message' => 'Administrador alterado com sucesso!'
        ];

        return response()->json($response, 200);
    }

    public function validaEmail($email, $id){
        $retorno = true;
        if(Admin::where('email', $email)->where("id", '<>', $id)->first())
            $retorno = false;
        return response()->json(['valido' => $retorno], 200);
    }

    public function validaToken(){
        try{
            if(! $admin = JWTAuth::parseToken()->authenticate())
                return response()->json(['valido' => false], 401);
            return response()->json(['valido' => true], 200);
        }catch(Exception $exception){
                return response()->json(['valido' => false], 401);
        }    
    }

    public function invalidaToken(){
        JWTAuth::parseToken()->invalidate();
        return response()->json(['result' => true], 200);
    }

    public function envia_esqueciSenha(Request $request){
        $email = $request->input('email');
        $error = "";
        $token = "";
        $admin = Admin::where('email', $email)->first();
        if($admin != null)
            if($admin->ativo){
                $token = str_random(20);
                $admin->token_esqueci_senha = $token;
                $admin->save();
            }else
                $error = "Seu cadastro encontra-se inativado. Por favor, entre em contato com o administrador do sistema.";
        else
            $error = "Não encontramos esse e-mail em nosso cadastro de administradores.";

        if($error != "")
            return response()->json(['error' => $error]);
        
        Mail::to($email)->send(new EsqueciSenhaAdmin($token));
        return response()->json(['retorno' => "Um e-mail foi enviado com a nova senha para acesso. Obrigado."]);
    }

    public function validaTokenRedefine($token){
        $admin = Admin::where('token_esqueci_senha', $token)->first();
        if($admin != null)
            return response()->json(['valido' => true], 200);
        else
            return response()->json(['valido' => false], 200);
    }
    public function redefineSenha(Request $r){
        $admin = Admin::where('token_esqueci_senha', $r->input('token'))->first();
        if($admin != null){
            $admin->token_esqueci_senha = '';
            $admin->password = bcrypt($r->input('senha'));
            $admin->save();
            return response()->json(['retorno' => "Senha redefinida com sucesso! Efetue o login"], 200);
        }
        echo $r->input('token');
        return response()->json(['error' => "Administrador não encontrado"]);
    }
}
