import { CalcTime } from './../../shared/calcTime';
import { DenunciasService } from './../../services/denuncias.service';
import { MaterializeAction } from 'angular2-materialize';
import { Base64 } from './../../shared/Base64';
import { LeitoresService } from '../../services/leitores.service';
import { FormBuilder } from '@angular/forms';
import { ConnectionFactory } from 'app/classes/connection-factory';
import { Post } from './../../classes/post';
import { Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, EventEmitter, Input } from '@angular/core';

import { PostsService } from './../../services/posts.service';

declare var $: any;
@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {
  url = ConnectionFactory.API_IMAGEM;
  calcTime = new CalcTime();
  
  post: Post;
  leitor = null;
  comentarios;
  form;
  maisLidos: Post[];
  leitorLogado: boolean = localStorage.getItem('l') != null;
  data_atual: Date;
  
  interacoes: any = {
    likes: 0,
    loves: 0,
    sad: 0,
    cry: 0,
    angry: 0,
    shares: 0
  };

  @Input('rascunho') rascunho: boolean = false;
  @Input('rascunhoForm') rascunhoForm: any;
  
  modalDenuncia = new EventEmitter<string|MaterializeAction>();
  denuncias;


  constructor( private _activatedRoute: ActivatedRoute, 
               private _postService: PostsService,
               private _router: Router,
               private _formBuilder: FormBuilder,
               private _leitoresService: LeitoresService,
               private _denunciasService: DenunciasService) {
                setInterval(() => { 
                  this._postService.getComentarios(this.post.id).subscribe(
                  (response) => {
                    this.comentarios = response.comentarios;
                  }
                ); }, 1000 * 30);
   }

  ngOnInit() {
    this._activatedRoute.params.subscribe(params => {
        if(params['id']){
          this.carregaPost(+params['id']);
          if(this.leitorLogado)
            this.form = this._formBuilder.group({
                id: '0',
                comentario: ['', Validators.required],
                comentario_idComentario: ['', [Validators.required, Validators.minLength(3)]],
                post_idPost: [params['id']],
                leitor_idLeitor: [new Base64().decode(localStorage.getItem('l'))]
              }); 
        }else{
          if(this.rascunho){
            //console.log(this.rascunhoForm);
            this.montaRascunho();
          }
        }
        
    });
  }

  onSubmit(){
    this._postService.createComentario(this.form).subscribe(
      ( ret ) => {
        if(ret.sucesso === 'OK')
          this.comentarios = ret.comentarios;
        else
          this.comentarios = [];
      }
    );
  }

  montaRascunho(){
    let f = this.rascunhoForm;
    console.log(f);
    this.post = {
      id: null,
      titulo: f.titulo,
      conteudo: f.conteudo,
      autor_idLeitor: null, 
      //escritor: ,
      idAdmin_deleted: null,
      src_imagem: null,//f.src_imagem,
      visualizacoes: null,
      publishedAt: null,
      subtitulo: null,
      created_at: null,
      updated_at: null,
      deleted_at: null,
      tipo_post: null,
    };
  }

  carregaPost(id){
    this._postService.getPost(id).subscribe(
      ( post ) => { 
        //retorno do método
        console.log(this.post);
        this.post = post;
        //se o leitor está logado
        if(localStorage.getItem('l')){
          let base64: Base64 = new Base64();
          //Popula o leitor + get interações
          const leitor_id = base64.decode(localStorage.getItem('l'));
          this._leitoresService.getLeitor(leitor_id).subscribe(
            (leitor) => {
              console.log(this.post);
              /*if(this.post.autor_idLeitor = leitor_id){
                this.publicaButton = true;
              }*/
              this.leitor = leitor;
              this.getInteracoes();
            }
          );
        }
        this._postService.getComentarios(this.post.id).subscribe(
          (response) => {
            this.comentarios = response.comentarios;
          }
        );
      }
    );

    this._postService.getMaisLidas().subscribe(
        ( maisLidos: Post[] )  => { this.maisLidos = maisLidos }
    );
  }

  getInteracoes(){
        this._postService.getInteracoes(this.post.id).subscribe(
          (ret) => {
            if(ret.status == 'OK'){
              this.interacoes.likes = ret.likes.length;
              this.interacoes.loves = ret.loves.length;
              this.interacoes.angry = ret.angry.length;
              this.interacoes.sad = ret.sads.length;
              this.interacoes.cry = ret.cry.length;
              this.interacoes.shares = ret.shares.length;
            }
          }
        );
  }

  interagePost(i){
    this._postService.interage(this.post.id, null, this.leitor, 'post', i).subscribe(
      (ret)=>{
        if(ret.status == 'OK'){
          console.log(ret);
          this.interacoes.likes = ret.likes.length;
          this.interacoes.loves = ret.love.length;
          this.interacoes.angry = ret.angry.length;
          this.interacoes.sad = ret.sad.length;
          this.interacoes.cry = ret.cry.length;
          this.interacoes.shares = ret.shares.length;
        }
      }
    );
  }

  openModalDenuncia() {
    this.modalDenuncia.emit({
         action: 'modal',
         params: ['open']});
  }

  closeModalDenuncia(e){
    if(e){
      this.modalDenuncia.emit({
        action:'modal',
        params:['close']
      });
    }
  }

  
  calcHour(date){
    console.log(this.calcTime.calcTime(date));
    return this.calcTime.calcTime(date);
  }

}
