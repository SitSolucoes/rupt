<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Timeline;

class TimelineController extends Controller
{
    public function create($leitor_id, $post_id){
        $timeline = new Timeline();
        $timeline->leitor_idLeitor = $leitor_id;
        $timeline->post_idPost = $post_id;
        $timeline->save();
    }

    public function getTimeline($leitor_id){
        $timeline = Timeline::where('leitor_idLeitor', $leitor_id)
                             ->with('post')->get();

        return response()->json(['timeline' => $timeline], 200);
    }
}
