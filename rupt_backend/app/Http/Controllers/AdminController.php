<?php

namespace App\Http\Controllers;

use App\Admin;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Exceptions\JWTException;
use Illuminate\Support\Facades\Hash;
use JWTAuth;
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
            'password' => bcrypt($request->input('password')),
            'ativo' => 1
        ]);
        $admin->save();

        return response()->json([
                'message'=>'Administrador criado com sucesso!'
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
                return response()->json(['error' => 'Login ou senha incorretos'],401);
            }
        }catch(JWTException $e){
            return response()->json(['error' => 'Login ou senha incorretos'],401);
        }
        $admin = Admin::where('email', $request->input('email'))
                      ->where('ativo', 1)
                      ->first();
        if (Hash::check($request->input('password'), $admin->password)) {
             return response()->json([
                'token' => $token,
                'admin_name' => $admin->name
            ],200);
        }                      
       
    }

    public function getAdmins(){
        $admins = Admin::all();
        $response = [
            'admins' => $admins
        ];
        return response()->json($response, 200);
    }

    public function updateAdmin(Request $request, $id)
    {
        $admin = Admin::find($id);
        if (!$admin) {
            return response()->json(['message' => 'Document not found'], 404);
        }
        $admin->name = $request->input('name');
        $admin->email = $request->input('email');
        $admin->password = bcrypt($request->input('password'));
        $admin->ativo = $request->input('ativo');
        $quote->save();
        return response()->json(['quote' => $quote], 200);
    }

    public function validaEmail($email){
        $retorno = true;
        if(Admin::where('email', $email)->first())
            $retorno = false;
        return response()->json(['valido' => $retorno], 200);
    }
}
