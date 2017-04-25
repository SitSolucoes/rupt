<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Leitor extends Model
{
    protected $table = 'leitores';

    protected $fillable = [
        'nome',
        'nick',
        'sexo',
        'nascimento',
        'src_foto',
        'email',
        'password'
    ];
}
