<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddForeignsToMensagens extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('mensagens', function (Blueprint $table) {
            $table->integer('admin_idAdmin')->unsigned()->nullable();
            $table->integer('leitor_idLeitor')->unsigned()->nullable();
            $table->integer('mensagem_idMensagem')->unsigned()->nullable();

            $table->foreign('admin_idAdmin')->references('id')->on('admins');
            $table->foreign('leitor_idLeitor')->references('id')->on('leitores');
            $table->foreign('mensagem_idMensagem')->references('id')->on('mensagens');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('mensagens', function (Blueprint $table) {
            //
        });
    }
}
