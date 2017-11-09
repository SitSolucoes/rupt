<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Timeline;
use App\Http\Controllers\InteracaoController;

class TimelineController extends Controller
{
    public function create($leitor_id, $post_id){
        $timeline = new Timeline();
        $timeline->leitor_idLeitor = $leitor_id;
        $timeline->post_idPost = $post_id;
        $timeline->save();
    }

    public function delete($leitor_id, $post_id){
        $timeline = Timelike::where('leitor_idLeitor', $leitor_id)
                            ->where('post_idPost', $post_id)
                            -get()
                            ->delete();
    }

    public function getTimeline($leitor_id){
        $timeline = Timeline::where('leitor_idLeitor', $leitor_id)
                             ->with('post')->get();
        $retorno = [];
        $int_c = new InteracaoController();
        foreach($timeline as $t){
            $retorno[] = (object)['tl' => $t,
                                  'interacoes' => $int_c->interacoesFromPost($t->id)
            ];
        }
        return response()->json(['timeline' => $retorno], 200);
    }
}
