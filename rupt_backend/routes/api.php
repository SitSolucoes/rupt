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

Route::put('/leitor/signin',[
            'uses' => 'LeitorController@signin'
]);

Route::get('/getLeitores',[
            'uses' => 'LeitorController@getLeitores'
]);

Route::get('/getLeitor/{id}',[
            'uses' => 'LeitorController@getLeitor'
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
Route::put('/createEscritor/{id}/{admin_idAdmin}',['uses' => 'EscritorController@create']);
Route::put('/updateEscritor/{id}',['uses' => 'EscritorController@update']);
Route::put('/recusarEscritor/{id}',['uses' => 'EscritorController@recusar']);
Route::put('/aceitarEscritor/{id}/{admin_idAdmin}',['uses' => 'EscritorController@aceitar']);
Route::get('/existEmail/{email}', ['uses' => 'EscritorController@existEmail']);
Route::get('/existNick/{nick}', ['uses' => 'EscritorController@existNick']);
Route::get('/existCpf/{cpf}/{id}', ['uses' => 'EscritorController@existCpf']);
Route::post('/escritor/uploadDocs/{id}', ['uses' => 'EscritorController@uploadDocs']);

//sugestões
Route::get('/sugestao/getSugestoes', ['uses' => 'SugestaoController@getSugestoes']);
Route::get('/sugestao/countSugestoes',['uses' => 'SugestaoController@countSugestoes']);
Route::put('/sugestao/alteraStatus/{id}/{status}', ['uses' => 'SugestaoController@alteraStatus']);
Route::post('sugestao/aceitar/{idCategoria}', ['uses' => 'SugestaoController@aceitar']);

//categorias
Route::get('/categoria/getCategorias', ['uses' => 'CategoriaController@getCategorias']);
Route::get('/categoria/getCategoriasAtivas', ['uses' => 'CategoriaController@getCategoriasAtivas']);
Route::post('/categoria/create', ['uses' => 'CategoriaController@create']);
Route::post('/categoria/update/{id}', ['uses' => 'CategoriaController@update']);
Route::post('/categoria/createSubCategoria/{id}', ['uses' => 'CategoriaController@createSubCategoria']);

//categoria filtro
Route::post('categoriaFiltro/save', ['uses' => 'CategoriaFiltroController@save']);

//denuncias
Route::get('/sugestao/getDenuncias', [
           'uses' => 'DenunciasController@getDenuncias'
]);


Route::get('/denuncia/getPost/{id}', [
          'uses' => 'DenunciasController@getPost'
]);

Route::get('/denuncia/getLeitor/{id}',[
           'uses' => 'DenunciasController@getLeitor'
]);
//Posts
Route::get('/denuncia/getEscritor/{id}', [
          'uses' => 'PostController@getEscritor'
]);

Route::get('posts/getSliderPosts/', [
    'uses' => 'PostController@getSliderPosts'
]);


//Mensagens
Route::get('/getMensagens/naoLidas', [
          'uses' => 'MensagemController@getMensagens_nLidas'
]);

Route::post('/enviaMensagem', [
    'uses' => 'MensagemController@enviaMensagem'
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

//pagamentos
Route::post('pagamento/update', ['uses' => 'PagamentoController@update']);
Route::get('pagamento/getPagamentos', ['uses' => 'PagamentoController@getPagamentos']);
Route::get('pagamento/getPagamentosPendentes', ['uses' => 'PagamentoController@getPagamentosPendentes']);
Route::get('pagamento/countPagamentosPendentes', ['uses' => 'PagamentoController@countPagamentosPendentes']);
Route::post('pagamento/uploadDoc/{id}', ['uses' => 'PagamentoController@uploadDoc']);