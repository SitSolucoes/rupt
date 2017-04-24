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

<<<<<<< HEAD
Route::put('/envia_esqueciSenha', [
           'uses' => "AdminController@envia_esqueciSenha"
]);
=======
//Leitores 
Route::post('/storeLeitor',[
            'uses' => 'LeitorController@store'
]);

>>>>>>> b3f29c8c4a3d94ff84e66965b914ac7d630ee598
