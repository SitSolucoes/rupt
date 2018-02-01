<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Seguidor;

class SeguidorController extends Controller
{
    public function follow(Request $request){
        $seguidor = new Seguidor();

        $seguidor->leitor_idLeitor = $request->leitor_id;
        $seguidor->escritor_idEscritor = $request->escritor_id;
        $seguidor->save();

        return response()->json(['follow' => true], 201);
    }

    public function unfollow(Request $request){
        Seguidor::where('leitor_idLeitor', $request->leitor_id)
              ->where('escritor_idEscritor', $request->escritor_id)
              ->delete();

        return response()->json(['follow' => false], 200);
    }

    public function verify(Request $request){
        $seguidor = Seguidor::where('leitor_idLeitor', $request->leitor_id)
                        ->where('escritor_idEscritor', $request->escritor_id)
                        ->first();

        if ($seguidor)
            return response()->json(['follow' => true], 200);

        return response()->json(['follow' => false], 200);
    }

    public function seguindo($escritor_id){
        $seguindo = Seguidor::where('leitor_idLeitor', $escritor_id)
                            ->with('escritor')
                            ->get();

        return response()->json(['seguindo' => $seguindo], 200);
    }

    public function seguidores($escritor_id){
        $seguidores = Seguidor::where('escritor_idEscritor', $escritor_id)
                              ->with('leitor')
                              ->get();

        return response()->json(['seguidores' => $seguidores], 200);
    }
}
