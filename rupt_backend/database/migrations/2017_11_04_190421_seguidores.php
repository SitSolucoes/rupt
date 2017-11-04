<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class Seguidores extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('seguidores', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('escritor_idEscritor')->unsigned()->nullable();
            $table->foreign('escritor_idEscritor')->references('id')->on('leitores');
            $table->integer('leitor_idLeitor')->unsigned()->nullable();
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
