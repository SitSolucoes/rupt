<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateInteracoesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('interacoes', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('post_idPost')->unsigned()->nullable();
            $table->integer('comentario_idComentario')->unsigned()->nullable();
            $table->integer('leitor_idLeitor')->unsigned()->nullable();
            $table->string('tipo_interacao', 20);
            $table->string('alvo', 30);
            $table->string('status', 1);
            $table->foreign('post_idPost')->references('id')->on('posts');
            $table->foreign('leitor_idLeitor')->references('id')->on('leitores');
            $table->foreign('comentario_idComentario')->references('id')->on('comentarios');
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
        Schema::table('interacoes', function (Blueprint $table) {
            //
        });
    }
}
