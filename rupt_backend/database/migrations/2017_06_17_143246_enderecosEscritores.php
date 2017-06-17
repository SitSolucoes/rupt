<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class EnderecosEscritores extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('escritores', function (Blueprint $table) {
            $table->string('cep', 8)->nullable();
            $table->string('logradouro', 40)->nullable();
            $table->string('numero', 15)->nullable();
            $table->string('complemento', 20)->nullable();
            $table->string('bairro', 40)->nullable();
            $table->string('cidade', 40)->nullable();
            $table->string('uf', 2)->nullable();
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
