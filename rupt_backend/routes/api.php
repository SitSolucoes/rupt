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
Route::any('admin/signin',['uses' => 'AdminController@signin']);
Route::post('admin/verificaLogin', ['uses' => 'AdminController@verificaLogin']);
Route::put('admin/envia_esqueciSenha', ['uses' => "AdminController@envia_esqueciSenha"]);

Route::post('/storeAdmin',['uses' => 'AdminController@store']);
Route::post('redefineSenha',['uses' => 'AdminController@redefineSenha']);
Route::get('validaTokenRedefine/{token}',['uses' => 'AdminController@validaTokenRedefine']);
Route::get('/getAdmins',['uses' => 'AdminController@getAdmins']);
Route::get('/getAdmin/{id}',['uses' => 'AdminController@getAdmin']);
Route::put('/updateAdmin/{id}',['uses' => 'AdminController@update']);
Route::get('/validaEmail/{email}/{id}',['uses' => "AdminController@validaEmail"]);

//Leitores
Route::post('/storeLeitor',['uses' => 'LeitorController@store']);
Route::get('/getLeitores',['uses' => 'LeitorController@getLeitores']);
Route::get('/getLeitor/{id}',['uses' => 'LeitorController@getLeitor']);
Route::put('/updateLeitor/{id}',['uses' => 'LeitorController@update']);
Route::get('/validaNick/{nick}/{id}', ['uses' => 'LeitorController@validaNick']);
Route::get('/validaEmailLeitor/{nick}/{id}', ['uses' => 'LeitorController@validaEmail']);

Route::put('/leitor/signin',['uses' => 'LeitorController@signin']);
Route::post('leitor/verificaLogin', ['uses' => 'LeitorController@verificaLogin']);
Route::put('leitor/redefineSenha', ['uses' => 'LeitorController@redefineSenha']);
Route::get('leitor/validaToken/{token}', ['uses' => 'LeitorController@validaToken']);

Route::post('leitor/uploadImages/{id}', ['uses' => 'LeitorController@uploadImages']);
Route::post('/esqueciSenhaLeitor', ['uses' => 'LeitorController@esqueciSenha']);
Route::get('leitor/getLeitorByNick/{nick}', ['uses' => 'LeitorController@getLeitorByNick']);

//escritores
Route::get('/getEscritores',['uses' => 'EscritorController@getEscritores']);
Route::get('/getSolicitacoes', ['uses' => 'EscritorController@getSolicitacoes']);
Route::get('/countSolicitacoes', ['uses' => 'LeitorController@countSolicitacoes']);
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
Route::get('categoriaFiltro/getCategoriasFiltro', ['uses' => 'CategoriaFiltroController@getCategoriasFiltro']);

//categoria leitor
Route::post('categoriaLeitor/create', ['uses' => 'CategoriaLeitorController@create']);

//denuncias
Route::get('/sugestao/getDenuncias', [
           'uses' => 'DenunciasController@getDenuncias'
]);
Route::get('/getDenuncias', [
           'uses' => 'DenunciasController@getDenuncias'
]);
Route::get('/denuncias/getDetalhes/{id}', [
           'uses' => 'DenunciasController@getDetalhes'
]);
Route::get('/denuncias/countDenuncias', [
           'uses' => 'DenunciasController@countDenunciasPendentes'
]);

Route::put('/denuncias/agir', [
           'uses' => 'DenunciasController@agir'
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

Route::get('/posts/PostsToHome/', ['uses' => 'PostController@getSliderPostsByCategory']);
Route::get('posts/getSliderPosts/', ['uses' => 'PostController@getSliderPosts']);
Route::get('posts/getPostsMaisLidos/', ['uses' => 'PostController@getPostsMaisLidos']);
Route::get('/posts/Post/{id}', ['uses' => 'PostController@getPost']);
Route::get('posts/getComentarios/{id}', ['uses' => 'ComentarioController@getComentariosFromPost']);
Route::get('posts/getMotivosDenuncia', ['uses' => 'DenunciasController@getMotivos']);
Route::post('posts/postCreateComentario', ['uses' => 'ComentarioController@create']);
Route::post('posts/denuncia', ['uses' => 'DenunciasController@create']);
Route::post('posts/create', ['uses' => 'PostController@createPost']);
Route::post('posts/uploadImages/{id}', ['uses' => 'PostController@uploadImages']);
Route::post('posts/delete', ['uses' => 'PostController@delete']);

Route::get('interacoes/getAll/{post_id}/{categoria}', ['uses' => 'InteracaoController@getByCategoria']);
Route::get('interacaoLeitor/getInteracoesLeitorPost/{post_id}/{leitor_id}', ['uses' => 'InteracaoLeitorController@getInteracoesLeitorPost']);
Route::post('interacaoLeitor/interage', ['uses' => 'InteracaoLeitorController@interage']);
Route::post('interacaoLeitor/desfazCompartilhamento', ['uses' => 'InteracaoLeitorController@desfazCompartilhamento']);

Route::post('visualizacoes/create', ['uses' => 'VisualizacaoController@create']);

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

//timeline
Route::get('timeline/getTimeline/{id}/{leitor_id}', ['uses' => 'TimelineController@getTimeline']);
Route::post('timeline/deleteTimeline', ['uses' => 'TimelineController@deleteTimeline']);