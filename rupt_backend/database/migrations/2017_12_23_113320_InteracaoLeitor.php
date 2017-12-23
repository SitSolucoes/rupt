<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class InteracaoLeitor extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('interacao_leitores', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('post_idPost')->unsigned()->nullable();
            $table->integer('comentario_idComentario')->unsigned()->nullable();
            $table->integer('leitor_idLeitor')->unsigned()->nullable();
            $table->integer('interacao_idInteracao')->unsigned();
            
            $table->foreign('post_idPost')->references('id')->on('posts');
            $table->foreign('leitor_idLeitor')->references('id')->on('leitores');
            $table->foreign('comentario_idComentario')->references('id')->on('comentarios');
            $table->foreign('interacao_idInteracao')->references('id')->on('interacoes');
            
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }
}
