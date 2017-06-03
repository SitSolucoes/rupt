<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Sugestao extends Model
{
    protected $table = 'sugestoes';

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
