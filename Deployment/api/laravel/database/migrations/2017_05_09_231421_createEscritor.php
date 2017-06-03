<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateEscritor extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('escritores', function (Blueprint $table) {
            $table->integer('leitor_idLeitor')->unsigned();
            $table->integer('rg')->unsigned();
            $table->integer('cpf')->unsigned();
            $table->string('src_rg', 30);
            $table->string('src_cpf', 30);
            $table->string('biografia', 200);
            $table->string('banco', 3);
            $table->string('agencia', 8);
            $table->string('conta_corrente', 10);
            $table->foreign('leitor_idLeitor')->references('id')->on('leitores');
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
