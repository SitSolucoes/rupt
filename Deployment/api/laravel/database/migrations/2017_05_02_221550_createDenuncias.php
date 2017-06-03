<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateDenuncias extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
         Schema::create('denuncias', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('post_idPost')->unsigned();
            $table->integer('admin_idAdmin')->unsigned();
            $table->integer('leitor_idLeitor')->unsigned();
            $table->integer('motivo_idMotivo')->unsigned();
            $table->foreign('post_idPost')->references('id')->on('posts');
            $table->foreign('admin_idAdmin')->references('id')->on('admins');
            $table->foreign('leitor_idLeitor')->references('id')->on('leitores');
            $table->foreign('motivo_idMotivo')->references('id')->on('motivos_denuncia');
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
