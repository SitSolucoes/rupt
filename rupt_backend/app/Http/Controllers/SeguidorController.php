<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Seguir;

class SeguidorController extends Controller
{
    public function follow(Request $request){
        $seguir = new Seguir();

        $seguir->leitor_idLeitor = $request->leitor_id;
        $seguir->escritor_idEscritor = $request->escritor_id;
        $seguir->save();

        return response()->json(['follow' => true], 201);
    }

    public function unfollow(Request $request){
        Seguir::where('leitor_idLeitor', $request->leitor_id)
              ->where('escritor_idEscritor', $request->escritor_id)
              ->delete();

        return response()->json(['follow' => false], 200);
    }

    public function verify(Request $request){
        $seguir = Seguir::where('leitor_idLeitor', $request->leitor_id)
                        ->where('escritor_idEscritor', $request->escritor_id)
                        ->first();

        if ($seguir)
            return response()->json(['follow' => true], 200);

        return response()->json(['follow' => false], 200);
    }
}
