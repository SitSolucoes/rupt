<?php

namespace App\Http\Controllers;

use App\Admin;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
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
            'password' => Hash::make($request->input('password'))
        ]);
        $admin->save();

        return response()->json(['message'=>'Administrador cadastrado com sucesso!'],201);
    }

    public function signin (Request $request){
        $admin = Admin::where('email', $request->email)->first();
        
        if ($admin){
            if (!$admin->ativo){
                return response()->json(['login' => "Conta desativada."], 200);
            }
            if (Hash::check($request->senha, $admin->password)){
                $token = date('z')*$admin->id;
                $admin->tokenLogin = Hash::make($token);
                $admin->save();

                $response = [
                    'admin' => $admin,
                    'token' => $admin->tokenLogin,
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
            $admin = Admin::where('id', $request->id)
                        ->where('tokenLogin', $request->token)->first();

            if ($admin)
                return response()->json(['admin' => $admin], 200);
        }
        
        return response()->json(['admin' => false], 200);
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
            $error = "E-mail não encontrado no cadastro de administradores.";

        if($error != "")
            return response()->json(['error' => $error]);
        
        Mail::to($email)->send(new EsqueciSenhaAdmin($token));
        return response()->json(['retorno' => "Um e-mail foi enviado com as instruções para recuperação da senha."]);
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
            $admin->password = Hash::make($r->input('senha'));
            $admin->save();
            return response()->json(['retorno' => "Senha redefinida com sucesso! Efetue o login"], 200);
        }
        echo $r->input('token');
        return response()->json(['error' => "Administrador não encontrado"]);
    }
}
