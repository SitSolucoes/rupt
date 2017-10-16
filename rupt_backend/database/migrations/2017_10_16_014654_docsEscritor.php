<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class DocsEscritor extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('escritores', function (Blueprint $table) {
            $table->dropColumn('src_rg');
            $table->dropColumn('src_cpf');
            $table->dropColumn('biografia');

            $table->string('doc_1', 25)->nullable();
            $table->string('doc_2', 25)->nullable();
            $table->string('doc_3', 25)->nullable();
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
