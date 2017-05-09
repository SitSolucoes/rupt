<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

//Route::middleware('auth:api')->get('/user', function (Request $request) {
//    return $request->user();
//});

//Administradores

Route::post('/signup',[
            'uses' => 'AdminController@signup'
]);

Route::post('/storeAdmin',[
            'uses' => 'AdminController@store'
]);

Route::post('/signin',[
            'uses' => 'AdminController@signin'
]);

Route::get('/getAdmins',[
            'uses' => 'AdminController@getAdmins'
]);

Route::get('/getAdmin/{id}',[
            'uses' => 'AdminController@getAdmin'
]);

Route::put('/updateAdmin/{id}',[
            'uses' => 'AdminController@update'
]);

Route::get('/validaEmail/{email}',[
           'uses' => "AdminController@validaEmail"
]);

Route::get('/validaToken',[
           'uses' => "AdminController@validaToken"
]);

Route::post('/invalidaToken',[
           'uses' => "AdminController@invalidaToken"
]);


Route::put('/envia_esqueciSenha', [
           'uses' => "AdminController@envia_esqueciSenha"
]);

//Leitores
Route::post('/storeLeitor',[
            'uses' => 'LeitorController@store'
]);

Route::get('/getLeitores',[
            'uses' => 'LeitorController@getLeitores'
]);

Route::put('/updateLeitor/{id}',[
            'uses' => 'LeitorController@update'
]);

Route::get('/validaNick/{nick}', [
            'uses' => 'LeitorController@validaNick'
]);

Route::get('/validaEmail/{nick}', [
            'uses' => 'LeitorController@validaEmail'
]);

//sugestões
Route::get('/getSugestoes', [
    'uses' => 'SugestaoController@getSugestoes'
]);

//denuncias
Route::get('/getDenuncias', [
           'uses' => 'DenunciasController@getDenuncias'
]);