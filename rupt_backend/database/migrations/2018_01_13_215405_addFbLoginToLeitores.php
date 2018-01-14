<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddFbLoginToLeitores extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('leitores', function (Blueprint $table) {
            $table->string('token_fb', 100)->nullable();
            $table->string('uid_fb', 100)->nullable();
            $table->date('nascimento')->nullable()->change();
            $table->string('email', 30)->nullable()->change();
            $table->string('password', 80)->nullable()->change();

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('leitores', function (Blueprint $table) {
            //
        });
    }
}
