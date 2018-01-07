<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\Collection;
use App\Interacao;
use App\Http\Controllers\InteracaoLeitorController;

class InteracaoController extends Controller
{
    public function getInteracoes($post_id, $categoria){
        $interacoes = Interacao::where('categoria', $categoria)
                               ->where('ativo', 1)->orderBy('id')->get();

        $interacoesCount = new Collection();
        $c = new InteracaoLeitorController();
        
        foreach($interacoes as $i){
            $i->count = $c->countInteracao($post_id, $i->id);
            $interacoesCount->push($i);
        }

        return $interacoesCount;
    }

    public function getByCategoria($post_id, $categoria){
        $interacoesCount = $this->getInteracoes($post_id, $categoria);

        return response()->json(['interacoes' => $interacoesCount], 200);
    }

}
