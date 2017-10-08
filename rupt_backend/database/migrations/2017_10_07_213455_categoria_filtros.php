<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CategoriaFiltros extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('categoria_filtros', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('ordem');
            $table->integer('categoria_idCategoria')->unsigned()->nullable();
            $table->foreign('categoria_idCategoria')->references('id')->on('categorias');    
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
