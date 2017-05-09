<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class EscritorController extends Controller
{
    public function getEscritor($id){
        $escritor = Escritor::where('id', $id)->get();

        return $escritor;
    }
}
