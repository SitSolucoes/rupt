<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Escritor;

class EscritorController extends Controller
{
    public function getById($id){
        $escritor = Escritor::where('leitor_idLeitor', $id)->get();

        return $escritor;
    }
}
