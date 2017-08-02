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
            $table->integer('leitor_idLeitor')->unsigned()->nullable();
            $table->foreign('leitor_idLeitor')->references('id')->on('leitores');                                
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
