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
import { VisualizacoesService } from 'app/services/visualizacoes.service';
import { InteracoesService } from 'app/services/interacoes.service';
import { Interacao } from 'app/classes/interacao';
import { InteracoesLeitorService } from 'app/services/interacoes-leitor.service';
import { InteracaoLeitor } from 'app/classes/interacao-leitor';
import { Leitor } from 'app/classes/leitor';

declare var $: any;
@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {
  @Input('rascunho') rascunho: boolean = false;
  @Input('rascunhoForm') rascunhoForm: any;
  
  calcTime = new CalcTime();
  comentarios;

  data_atual: Date;
  denuncias;
  edited = false;
  ready: boolean = false;
  form;
  leitor = null;
  /*leitorLogado: boolean = localStorage.getItem('l') != null;*/
  loading: boolean;
  maisLidos: Post[];
  opExcluir: number = 1;
  
  post: Post;
  url = ConnectionFactory.API_IMAGEM;

  interacao: Interacao;
  interacoes: Interacao[];
  interacoesLeitor: InteracaoLeitor[];
  interacoesTotal = [0, 0];
  interagiu: boolean = false;

  modalCompartilhar = new EventEmitter<string|MaterializeAction>();
  modalCompartilharMensagem = new EventEmitter<string|MaterializeAction>();
  modalDenuncia = new EventEmitter<string|MaterializeAction>();
  modalExcluir = new EventEmitter<string|MaterializeAction>();
  modalLoading = new EventEmitter<string|MaterializeAction>();
  modalLogin = new EventEmitter<string|MaterializeAction>();
  modalEsqueciSenha = new EventEmitter<string|MaterializeAction>();
  
  constructor( private _activatedRoute: ActivatedRoute, 
               private _postService: PostsService,
               private _router: Router,
               private _formBuilder: FormBuilder,
               private _leitoresService: LeitoresService,
               private _denunciasService: DenunciasService,
               private _visualizacoesService: VisualizacoesService,
               private _interacoesService: InteracoesService,
               private _interacoesLeitorService: InteracoesLeitorService) {}

  ngOnInit() {
    window.scrollTo( 0, 0);

    this._activatedRoute.params.subscribe(params => {
        this._leitoresService.leitor.subscribe(
            (leitor: Leitor) => { 
              this.leitor = leitor ;
        });

        this._leitoresService.verificaLogin().subscribe(
          (response) => {
            this.getPost(params['link']);
        });
    });
  }

  createForm(post_id){
    this.form = this._formBuilder.group({
        id: '0',
        comentario: ['', Validators.required],
        comentario_idComentario: [''],
        post_idPost: post_id,
        leitor_idLeitor: this.leitor.id
    });
  }

  onSubmit(){
    this.loading = true; 

    this._postService.createComentario(this.form).subscribe(
      ( ret ) => {
        this.loading = false;
        if(ret.sucesso === 'OK'){
          this.comentarios = ret.comentarios;
        }
        this.form.patchValue({
          comentario: '',
          comentario_idComentario: ''
        });
      }
    );
  }

  calcHour(date){
    return this.calcTime.calcTime(date);
  }

  
  getPost(link){
    let leitor_id = this.leitor ? this.leitor.id : 0;

    this._postService.getPostsByLink(link, leitor_id).subscribe(
      ( post: Post ) => { 
        if (post){
            if(!post.publishedAt || post.publishedAt == null){
                if (post.autor.id == this.leitor.id)
                    this._router.navigate(['/publicacao/', this.btoa(post.id)]);
                
            }
            else {
                if (this.leitor)
                    this.createForm(post.id);

                this.post = post;

                this.getInteracoes();

                if(new Date(post.updated_at).getTime() - new Date(post.publishedAt).getTime() > 30000)
                  this.edited = true;
                
                  //se o leitor está logado
                if(this.leitor){
                    this.getInteracoesLeitorPost();

                    //se não for o dono do post conta uma visualizacao
                    if (post.autor.id != this.leitor.id){
                        this._visualizacoesService.create(post.id, this.leitor.id).subscribe();
                    }
                }
                else {
                    //se não tiver ninguem logado conta uma visualização sem leitor
                    this._visualizacoesService.create(post.id, 0).subscribe();
                }

                this._postService.getComentarios(this.post.id).subscribe(
                  (response) => {
                    this.comentarios = response.comentarios;
                    this.pronto();
                  }
                );
            }
        }
        else 
          this.pronto();
      }
    );

    this._postService.getMaisLidas().subscribe(
        ( maisLidos: Post[] )  => { this.maisLidos = maisLidos }
    );
  }
  

  getInteracoes(){
      this._interacoesService.getAll( this.post.id, 1).subscribe(
         (interacoes: Interacao[]) => {
            this.interacoes = interacoes;
            this.countInteracao();
         }
      )
  }

  getInteracoesLeitorPost(){
      this._interacoesLeitorService.getInteracaoLeitor( this.post.id, this.leitor.id).subscribe(
          (interacoesLeitor: InteracaoLeitor[]) => {
              this.interacoesLeitor = interacoesLeitor;
              this.verifyInteragiuPost();
          }
      )
  }

  btoa(post_id){
      return btoa(post_id);
  }

  verifyInteragiuPost(){
      if (!this.interacoesLeitor || this.interacoesLeitor.length == 0)
          this.interagiu = false;
      else {
          let interagiu: boolean = false;
          for (let i = 0; i < this.interacoesLeitor.length; i++){
              if (this.interacoesLeitor[i].interacao.compartilhar == false)  
                  interagiu = true;
          }

          this.interagiu = interagiu;
      }
  }

  checkInteracao(interacao_id){
      if (!this.interacoesLeitor || this.interacoesLeitor.length == 0)
        return false;

      let check = false;

      for (let i = 0; i < this.interacoesLeitor.length; i++){
        if (this.interacoesLeitor[i].interacao_idInteracao == interacao_id){
            check = true;
            break;
        }
      }

      return check;
  }

  countInteracao(){
      this.interacoesTotal = [0,0];

      for (let i = 0; i < this.interacoes.length; i++){
        if(this.interacoes[i].compartilhar == true && this.interacoes[i].externa == false)
          this.interacoesTotal[1] = this.interacoes[i].count;
        else 
          this.interacoesTotal[0] = this.interacoesTotal[0] + this.interacoes[i].count;
      }
  }

  interagePost(i: Interacao){
      let interacaoLeitor = new InteracaoLeitor();
      interacaoLeitor.post_idPost = this.post.id;
      interacaoLeitor.leitor_idLeitor = this.leitor.id;
      interacaoLeitor.interacao = i;

      this._interacoesLeitorService.interage(interacaoLeitor).subscribe(
        (response) => { 
            this.interacoes = response.interacoes;
            this.interacoesLeitor = response.interacoesLeitor;

            this.verifyInteragiuPost();
            this.countInteracao();

            if (i.compartilhar == true && i.externa == false)
                this.openModalCompartilharMensagem();
         }
      );
  }

  compartilhar(compartilhar){
      if (compartilhar[1] == true){
          this.interacao = compartilhar[0];
          this.openModalExcluir(2);
      }
      else {
          if (this.leitor)
              this.interagePost(compartilhar[0]);
          else 
              this.openModalLogin();
      }   
      
      this.modalCompartilhar.emit({action: 'modal', params: ['close']});
  }

  openModalCompartilhar(){
      this.interacao = null;
      this.modalCompartilhar.emit({action: 'modal', params: ['open']});
  }

  closeModalCompartilhar(e){
      if (e)
        this.modalCompartilhar.emit({action: 'modal', params: ['close']});
  }

  excluiuCompartilhamento(response){
    this.interacoes = response.interacoes;
    this.interacoesLeitor = response.interacoesLeitor;

    this.verifyInteragiuPost();
    this.countInteracao();

    this.modalExcluir.emit({action: 'modal', params: ['close']});
  }

  openModalCompartilharMensagem(){
    this.modalCompartilharMensagem.emit({ action: 'modal', params: ['open']});

    setTimeout(() => this.closeModalCompartilharMensagem(), 1500);
  }

  closeModalCompartilharMensagem(){
    this.modalCompartilharMensagem.emit({ action:'modal', params:['close'] });
  }

  openModalDenuncia() {
    this.modalDenuncia.emit({ action: 'modal', params: ['open']});
  }

  closeModalDenuncia(e){
    if(e){
      this.modalDenuncia.emit({ action:'modal', params:['close']});
    }
  }

  openModalExcluir(opExcluir){
      this.opExcluir = opExcluir;
      this.modalExcluir.emit({action: 'modal', params: ['open']});
  }

  closeModalExcluir(e){
      if (e){
          this.modalExcluir.emit({action: 'modal', params:['close']});
          this._router.navigate(['/perfil', this.post.autor.nick]);
      }
  }

  openModalLoading() {
    this.modalLoading.emit({ action: 'modal', params: ['open']});
  }

  closeModalLoading(e){
    if(e){
      this.modalLoading.emit({ action:'modal', params:['close']});
    }
  }

  openModalLogin() {
    this.modalLogin.emit({ action: 'modal', params: ['open']});
  }

  openModalEsqueciSenha(e){
    if(e){
      this.modalLogin.emit({action:"modal",params:['close']});
    }
    this.modalEsqueciSenha.emit({ action: 'modal', params: ['open']
    });
  }

  pronto(){
    this.ready = true;
  }
}
