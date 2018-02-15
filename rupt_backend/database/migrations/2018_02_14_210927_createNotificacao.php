<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateNotificacao extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('notificacoes', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('escritor_idEscritor')->unsigned();
            $table->foreign('escritor_idEscritor')->references('id')->on('leitores');
            $table->integer('leitor_idLeitor')->unsigned()->nullable();
            $table->foreign('leitor_idLeitor')->references('id')->on('leitores');
            $table->string('descricao', 200);
            $table->string('rota', 200);
            $table->boolean('lida');
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
