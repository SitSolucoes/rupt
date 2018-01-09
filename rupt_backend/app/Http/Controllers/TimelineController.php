<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\Collection;
use App\Timeline;
use App\Http\Controllers\InteracaoController;
use App\Http\Controllers\InteracaoLeitorController;

class TimelineController extends Controller
{
    public function create($leitor_id, $post_id){
        $timeline = new Timeline();
        $timeline->leitor_idLeitor = $leitor_id;
        $timeline->post_idPost = $post_id;
        $timeline->save();
    }

    public function getTimeline($autor_id, $leitor_id){
        $timeline = Timeline::where('leitor_idLeitor', $autor_id)
                             ->with('post')
                             ->orderBy('created_at', 'desc')
                             ->get();
        
        $timelineInteracao = new Collection();
        $i = new InteracaoController();
        $il = new InteracaoLeitorController();
        
        foreach($timeline as $t){
            if ($t->post->deleted_at == null && $t->post->publishedAt != null){
                
                if ($t->post->autor_idLeitor == $autor_id){
                    $t->interacoes = $i->getInteracoes($t->post->id, 1, false);
                    if ($leitor_id !=0)
                        $t->interacoesLeitor = $il->getPost($t->post->id, $leitor_id);
                }
                else{
                    $t->interacoes = $i->getInteracoes($t->id, 1, true);
                    if ($leitor_id !=0)
                        $t->interacoesLeitor = $il->getTimeline($t->id, $leitor_id);
                }
                
                $timelineInteracao->push($t);
            }
        }
        
        return response()->json(['timeline' => $timelineInteracao ], 200);
    }

    public function deleteByPost($post_id){
        Timeline::where('post_idPost', $post_id)
                ->delete();
    }

    public function delete($id){
        Timeline::where('id', $id)
                ->delete();
    }

    public function deleteTimeline(Request $request){
        $this->delete($request->timeline_id);

        return response()->json(['deleted' => 'true'], 200);
    }

    public function getIdTimeline($post_id, $leitor_id){
        $timeline = Timeline::where('post_idPost', $post_id)
                           ->where('leitor_idLeitor', $leitor_id)
                           ->first();

        return $timeline->id;
    }
}
