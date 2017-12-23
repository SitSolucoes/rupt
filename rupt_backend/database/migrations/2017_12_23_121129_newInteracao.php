<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class NewInteracao extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('interacoes', function (Blueprint $table) {
            $table->dropColumn('post_idPost');
            $table->dropColumn('comentario_idComentario');
            $table->dropColumn('leitor_idLeitor');
            $table->dropColumn('tipo_interacao');
            $table->dropColumn('alvo');
            $table->dropColumn('status');
            
            $table->string('nome', 20);
            $table->string('src_icone', 50);
            $table->integer('peso');
            $table->boolean('ativo');
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
