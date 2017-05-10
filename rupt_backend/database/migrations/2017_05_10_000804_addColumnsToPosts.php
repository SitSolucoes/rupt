<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddColumnsToPosts extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('posts', function (Blueprint $table) {
            $table->integer('autor_idLeitor')->unsigned();
            $table->integer('idAdmin_deleted')->unsigned();
            $table->string('subtitulo', 60);
            $table->string('conteudo', 20000)->change();
            $table->string('src_imagem',30);
            $table->bigInteger('visualizacoes', 30);
            $table->date('deleted_at');
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
