<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Denuncia;
use App\Post;
use App\MotivoDenuncia;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\PostController;
use App\Http\Controllers\LeitorController;

class DenunciasController extends Controller{
    public function getDenuncias(){
        $denuncias = Denuncia::select(DB::raw('denuncias.*, count(post_idPost) as quantidade'))
                             ->whereIn('status', ['A', 'I'])
                             ->groupBy('denuncias.post_idPost', 'denuncias.motivo_idMotivo')
                             ->orderBy('created_At', 'desc');
        $denuncias_ret = [];

        foreach($denuncias->get() as $d){
            $denuncias_ret[] = (object)[
                'id'=> $d->id,
                'data' => $d->created_at,
                'post' => $d->post->id,
                'status' => $d->status,
                'titulo' => $d->post->titulo,
                'motivo' => $d->motivo->motivo,
                'quantidade' => $d->quantidade
            ];
        }

        $response = [
            'denuncias' => $denuncias_ret
        ];
        return response()->json($response, 200);
    }

    public function getDetalhes($id){
        $dados = Denuncia::where('id', $id)->get();
        $dado = $dados[0];
        $ret = (object)[
            'motivo' => $dado->motivo->motivo,
            'detalhes' => $dado,
            'post' => $dado->post,
            'autor' => $dado->autor
        ];
        return response()->json([
            'denuncia' => $ret
        ], 200);
    }

    public function agir(Request $request){
        if($request->action != 'i'){
            //atualiza post
            try{
                $c = new PostController();
                $c->removePorDenuncia($request->post_idPost, $request->idAdmin_Deleted);

                //atualiza denuncia
                $denuncias = Denuncia::where('post_idPost', $request->post_idPost)
                                    ->where('motivo_idMotivo', $request->motivo_idMotivo)
                                    ->get();
                foreach($denuncias as $d){
                    $d->status = "R";
                    $d->admin_idAdmin = $request->idAdmin_deleted;
                    $d->save();
                }


                return response()->json([
                    'status' => true
                ], 200);
            }catch(Exception $ex){
                return response()->json([
                    'status' => false
                ], 500);
            }
        }else{
            try{    
                //atualiza denuncia
                $denuncias = Denuncia::where('post_idPost', $request->post_idPost)
                                    ->where('motivo_idMotivo', $request->motivo_idMotivo)
                                    ->get();
                foreach($denuncias as $d){
                    $d->status = "I";
                    $d->admin_idAdmin = $request->idAdmin_deleted;
                    $d->save();
                }
                return response()->json([
                    'status' => true
                ], 200);
            }catch(Exception $ex){
                return response()->json([
                    'status' => false
                ], 500);
            }
        }
    }

    public function getPost($id){
        $c = new PostController();
        $response = [
            'post' => $c->getById($id)
        ];
        return response()->json($response, 200);
    }

    public function getLeitor($id){
        $c = new LeitorController();
        $response = [
            'leitor' => $c->getLeitor($id)
        ];
        return response()->json($response, 200);
    }

    public function getMotivos(){
        $response = [
            'motivos' => $this->motivosDenuncia()
        ];
        return response()->json($response, 200);
    }

    public function motivosDenuncia(){
        return MotivoDenuncia::where('ativo', true)->get();
    }

    private function validaDenunciaLeitor($leitor_idLeitor, $post_idPost){
        return Denuncia::where('leitor_idLeitor', $leitor_idLeitor)
                       ->where('post_idPost', $post_idPost)
                       ->get();
    }
    //set denuncias
    public function create(Request $request){
        $d = new Denuncia();
        //valida leitor ja denunciou
        if($this->validaDenunciaLeitor($request->leitor_idLeitor, $request->post_idPost)->count() > 0)
            return response()->json(['status'=> false, 'mensagem'=> "Sua denúncia já está sendo analisada, caso deseje, entre em contato com nossa equipe."], 200);
        else
            $d = $this->createDenuncia($request, $d);
        try{
            $d->save();
            $response = [
                'status' => true
            ];
        }catch(Exception $ex){
            $response = [
                'status' => false,
                'mensagem' => $ex
            ];
            return response()->json($response, 500);
        }
        return response()->json($response, 200);
    }

    private function createDenuncia(Request $request, $i){
        $i = new Denuncia();

        $i->post_idPost = $request->post_idPost;
        $i->leitor_idLeitor = $request->leitor_idLeitor;
        $i->motivo_idMotivo = $request->motivo_idMotivo;
        $i->status = 'A';

        return $i;
    }
    
    public function countDenunciasPendentes(){
        $count = Denuncia::select(DB::raw('count(*) as quantidade'))
        ->where('status', 'A')
        ->get();

        return response()->json((object)['quantidade' => $count[0]['quantidade']], 200);
    }
}
