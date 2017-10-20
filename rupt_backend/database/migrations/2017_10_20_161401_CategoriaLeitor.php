<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CategoriaLeitor extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('categoria_leitores', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('peso');
            $table->integer('categoria_idCategoria')->unsigned()->nullable();
            $table->foreign('categoria_idCategoria')->references('id')->on('categorias');    
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
