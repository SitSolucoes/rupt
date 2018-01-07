<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class InteracaoLeitorTimeline extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('interacao_leitores', function (Blueprint $table) {
            $table->integer('timeline_idTimeline')->unsigned()->nullable();
            $table->foreign('timeline_idTimeline')->references('id')->on('timelines');
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
