<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateLeitoresTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
         Schema::create('leitores', function (Blueprint $table) {
            $table->increments('id');
            $table->string('nick', 20);
            $table->string('nome', 60);
            $table->string('sexo', 1);
            $table->date('nascimento');
            $table->string('src_foto', 30);
            $table->string('email', 30)->unique();
            $table->string('password', 80);
            $table->rememberToken();
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
