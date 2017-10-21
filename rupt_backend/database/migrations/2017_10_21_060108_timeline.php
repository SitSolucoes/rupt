<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class Timeline extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('timelines', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('leitor_idLeitor')->unsigned()->nullable();
            $table->foreign('leitor_idLeitor')->references('id')->on('leitores');
            $table->integer('post_idPost')->unsigned()->nullable();
            $table->foreign('post_idPost')->references('id')->on('posts');    
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
