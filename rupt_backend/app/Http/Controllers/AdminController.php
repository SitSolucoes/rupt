<?php

namespace App\Http\Controllers;

use App\Admin;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Exceptions\JWTException;
use JWTAuth;

class AdminController extends Controller
{
    public function signup(Request $request){
        $this->validate($request,[
            'name'  => 'required',
            'email' => 'required|email|unique:admins',
            'password' => 'required'
        ]);

        $admin = new Admin([
            'name' => $request->input('name'),
            'email' => $request->input('email'),
            'password' => bcrypt($request->input('password'))
        ]);
        $admin->save();

        return response()->json([
                'message'=>'Criado com sucesso!'
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
        return response()->json([
            'token' => $token
        ],200 );
    }

    public function getAdmins(){
        $admins = Admin::all();
        $response = [
            'admins' => $admins
        ];
        return response()->json($response, 200);
    }
}
