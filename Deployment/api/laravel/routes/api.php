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

Route::post('redefineSenha',[
           'uses' => 'AdminController@redefineSenha'
]);

Route::get('validaTokenRedefine/{token}',[
           'uses' => 'AdminController@validaTokenRedefine'
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

Route::get('/validaEmail/{email}/{id}',[
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

Route::get('/getLeitor/{id}',[
            'uses' => 'LeitorController@getById'
]);

Route::put('/updateLeitor/{id}',[
            'uses' => 'LeitorController@update'
]);

Route::get('/validaNick/{nick}/{id}', [
            'uses' => 'LeitorController@validaNick'
]);

Route::get('/validaEmailLeitor/{nick}/{id}', [
            'uses' => 'LeitorController@validaEmail'
]);

//escritores
Route::get('/getEscritores',['uses' => 'EscritorController@getEscritores']);
Route::get('/getSolicitacoes', ['uses' => 'EscritorController@getSolicitacoes']);
Route::get('/countSolicitacoes', ['uses' => 'EscritorController@countSolicitacoes']);
Route::put('/updateEscritor/{id}',['uses' => 'EscritorController@update']);

//sugestões
Route::get('/getSugestoes', [
    'uses' => 'SugestaoController@getSugestoes'
]);

Route::get('/countSugestoes',[
    'uses' => 'SugestaoController@countSugestoes'
]);

//denuncias
Route::get('/getDenuncias', [
           'uses' => 'DenunciasController@getDenuncias'
]);


Route::get('/getPost/{id}', [
          'uses' => 'DenunciasController@getPost'
]);

Route::get('/getLeitor/{id}',[
           'uses' => 'DenunciasController@getLeitor'
]);
//Posts
Route::get('/getEscritor/{id}', [
          'uses' => 'PostController@getEscritor'
]);


//Mensagens
Route::get('/getMensagens/naoLidas', [
          'uses' => 'MensagemController@getMensagens_nLidas'
]);

Route::get('/getMensagens/lidas', [
          'uses' => 'MensagemController@getMensagens_lidas'
]);

Route::get('getMensagem/{id}',[
           'uses' => 'MensagemController@getMensagem'
]);

Route::get('getResposta/{id}',[
           'uses' => 'MensagemController@getResposta'
]);

Route::get('/getCountMensagens_nLidas', [
          'uses' => 'MensagemController@countMensagens_nLidas'
]);

Route::post('respondeMensagem/{id}', [
            'uses' => 'MensagemController@respondeMensagem'
]);