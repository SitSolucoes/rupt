<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class Pagamento extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('pagamentos', function (Blueprint $table) {
            $table->increments('id');
            $table->float('valor', 10,2);
            $table->integer('escritor_idEscritor')->unsigned()->nullable();
            $table->foreign('escritor_idEscritor')->references('id')->on('escritores');                                
            $table->integer('admin_idAdmin')->unsigned()->nullable();
            $table->foreign('admin_idAdmin')->references('id')->on('admins');                                
            $table->string('src_comprovante')->nullable();
            $table->boolean('pago')->nullable();
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
