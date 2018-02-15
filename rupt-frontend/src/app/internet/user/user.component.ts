import { CalcTime } from './../../shared/calcTime';
import { MaterializeAction } from 'angular2-materialize';
import { Base64 } from '../../shared/Base64';
import { pairs } from 'rxjs/observable/pairs';
import { PostsService } from '../../services/posts.service';
import { Timeline } from './../../classes/timeline';
import { TimelineService } from './../../services/timeline.service';
import { ConnectionFactory } from 'app/classes/connection-factory';
import { Escritor } from './../../classes/escritor';
import { LeitoresService } from './../../services/leitores.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, EventEmitter } from '@angular/core';
import { Leitor } from 'app/classes/leitor';
import { Post } from 'app/classes/post';
import { InteracoesService } from 'app/services/interacoes.service';
import { Interacao } from 'app/classes/interacao';
import { InteracaoLeitor } from 'app/classes/interacao-leitor';
import { InteracoesLeitorService } from 'app/services/interacoes-leitor.service';
import { SeguidorService } from 'app/services/seguidor.service';
import { Seguidor } from 'app/classes/seguidor';

declare var $: any;

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  
  base64: Base64 = new Base64();
  calcTime = new CalcTime();
  filtro: string;
  idExcluir = 0;
  opExcluir = 1;
  loading: boolean;
  url = ConnectionFactory.API_IMAGEM;
  ready: boolean = false;
  
  leitor: Leitor;
  leitorLogado: Leitor;
  
  timeline;//: Timeline[] = new Array;
  timelineFiltro = new Array;
  
  post = new Post();
  rascunhos: Post[] = new Array();
  
  interacao: Interacao;
  interacoes: Interacao[];
  interacoesLeitor: InteracaoLeitor[];
  
  modalCompartilhar = new EventEmitter<string|MaterializeAction>();
  modalCompartilharMensagem = new EventEmitter<string|MaterializeAction>();
  modalDenuncia = new EventEmitter<string|MaterializeAction>();
  modalExcluir = new EventEmitter<string|MaterializeAction>();

  seguindo: boolean;
  listSeguidores: Seguidor[] = new Array();
  listSeguindo: Seguidor[] = new Array();

  constructor(private _activatedRoute: ActivatedRoute,
              private _leitorService: LeitoresService, 
              private _timelineService: TimelineService,
              private _postService: PostsService,
              private _interacoesLeitorService: InteracoesLeitorService,
              private _seguidorService: SeguidorService) { }

  ngOnInit() {
      window.scrollTo(0, 0);

      this.leitor = new Leitor();
      this.leitor.escritor = new Escritor();
      this.leitorLogado = new Leitor();

      this._activatedRoute.params.subscribe(params => {
          this._leitorService.getLeitorByNick(params['nick']).subscribe(
            (leitor: Leitor) => {
              this.leitor = leitor;
              this.verifyFollow();
            }
          );
          
          this._leitorService.leitor.subscribe(
              (leitor: Leitor) => { this.leitorLogado = leitor }
          );

          this._leitorService.verificaLogin().subscribe(
              (response) => {
                this.verifyFollow();
                this.getTimeline();
                this.getRascunhos();
                this.getSeguidores();
                this.getSeguindo();
          });
      });
  }

  getTimeline(){
      this.timelineFiltro = new Array();

      this._timelineService.getTimeline(this.leitor.id, this.leitorLogado.id).subscribe(
        ( timeline) => { 
          this.timeline = timeline;
          this.timelineFiltro = timeline;
          
          /*for(let t of this.timeline){
              this.timelineFiltro.push(t);
          }*/
        
        }
      )
  }

  getRascunhos(){
    this.rascunhos = new Array();

    if (this.leitor.id == this.leitorLogado.id){
        this._postService.getRascunhos(this.leitorLogado.id).subscribe(
          (rascunhos: Post[]) => {
              this.rascunhos = rascunhos;

              setTimeout(()=>{ 
                $('.tabs').tabs();  
              }, 500); 
              $('.tabs').tabs();  
          }
        )
    }

  }

  calcHour(date){
    return this.calcTime.calcTime(date);
  }

  btoa(post_id){
      return btoa(post_id);
  }

  search(){
      if (!this.filtro || this.filtro == '')
        this.timelineFiltro = this.timeline;
      else {
        this.timelineFiltro = this.timelineFiltro.filter((t) => {
          if (t.post.titulo.toLowerCase().indexOf(this.filtro.toLowerCase()) >= 0 ||
              t.post.conteudo.toLowerCase().indexOf(this.filtro.toLowerCase()) >= 0) {

            return true;
          }
          return false;
        })
      }
  }

  countInteracoes(interacoes: Interacao[]){
      let soma = 0;
      for (let i = 0; i < interacoes.length; i++){
        if (interacoes[i].compartilhar == false)
          soma = soma + interacoes[i].count;
      }

      return soma;
  }

  checkInteracao(interacao_id, interacoesLeitor: InteracaoLeitor[]){
      if (!interacoesLeitor || interacoesLeitor.length == 0)
        return true;

      let notCompartilhar = interacoesLeitor.filter((element) => {
        if (element.interacao.compartilhar == false)
          return true;
        return false;
      });

      if (notCompartilhar.length == 0)
        return true;

      let check = false;

      for (let i = 0; i < interacoesLeitor.length; i++){
        if (interacoesLeitor[i].interacao.compartilhar == false && interacoesLeitor[i].interacao_idInteracao == interacao_id){
            check = true;
            break;
        }
      }

      return check;
  }

  interageTimeline(t: Timeline, interacao){
    let interacaoLeitor = new InteracaoLeitor();
    interacaoLeitor.post_idPost = t.post.id;
    interacaoLeitor.leitor_idLeitor = this.leitorLogado.id;
    interacaoLeitor.interacao = interacao;
    
    if (t.post.autor_idLeitor != this.leitor.id)
        interacaoLeitor.timeline_idTimeline = t.id;

    this._interacoesLeitorService.interage(interacaoLeitor).subscribe(
      (response) => { 
          if (t.post.autor_idLeitor != this.leitor.id)
            this.refreshInteracao(t.id, response.interacoes, response.interacoesLeitor, true);
          else
            this.refreshInteracao(t.post.id, response.interacoes, response.interacoesLeitor, false);
       }
    );
  }

  private refreshInteracaoPost(id, interacoes, interacoesLeitor, timeline){
    for (let i = 0; i < timeline.length; i++){
      if (timeline[i].post.id == id){
          timeline[i].interacoes = interacoes;
          timeline[i].interacoesLeitor = interacoesLeitor;
      }
    }
  }

  private refreshInteracaoTimeline(id, interacoes, interacoesLeitor, timeline){
    for (let i = 0; i < timeline.length; i++){
      if (timeline[i].id == id){
          timeline[i].interacoes = interacoes;
          timeline[i].interacoesLeitor = interacoesLeitor;
      }
    }
  }

  refreshInteracao(id, interacoes: Interacao[], interacoesLeitor: InteracaoLeitor[], timeline:boolean){
      if (timeline == false){
          this.refreshInteracaoPost(id, interacoes, interacoesLeitor, this.timelineFiltro);
          this.refreshInteracaoPost(id, interacoes, interacoesLeitor, this.timeline);
      }
      else{
          this.refreshInteracaoTimeline(id, interacoes, interacoesLeitor, this.timelineFiltro);
          this.refreshInteracaoTimeline(id, interacoes, interacoesLeitor, this.timeline);
      }
  }

  compartilhar(compartilhar){
    if (compartilhar[1] == true){
        this.interacao = compartilhar[0];
        this.opExcluir = 2;
        this.idExcluir = this.post.id;
        this.modalExcluir.emit({action: 'modal',params: ['open']});
    }
    else {
        this.interageCompartilhar(compartilhar[0]);
    }   
    
    this.modalCompartilhar.emit({action: 'modal', params: ['close']});
  }

  interageCompartilhar(i){
    let interacaoLeitor = new InteracaoLeitor();
    interacaoLeitor.post_idPost = this.post.id;
    interacaoLeitor.leitor_idLeitor = this.leitorLogado.id;
    interacaoLeitor.interacao = i;

    this._interacoesLeitorService.interage(interacaoLeitor).subscribe(
      (response) => { 
          this.refreshInteracao(this.post.id, response.interacoes, response.interacoesLeitor, false);
       }
    );

    this.openModalCompartilharMensagem();
  }

  verifyFollow(){
      let seguidor = new Seguidor();
      seguidor.escritor_id = this.leitor.id;
      seguidor.leitor_id = this.leitorLogado.id;
      
      this._seguidorService.verify(seguidor).subscribe(
        ( response ) => { this.seguindo = response }
      )
  }

  follow(){
      let seguidor = new Seguidor();
      seguidor.escritor_id = this.leitor.id;
      seguidor.leitor_id = this.leitorLogado.id;

      this._seguidorService.follow(seguidor).subscribe(
        (response) => { 
            this.seguindo = response;
            this.getSeguidores();
        }
      )
  }

  unfollow(){
      let seguidor = new Seguidor();
      seguidor.escritor_id = this.leitor.id;
      seguidor.leitor_id = this.leitorLogado.id;

      this._seguidorService.unfollow(seguidor).subscribe(
        (response) => { 
            this.seguindo = response;
            this.getSeguidores();
        }
      )
  } 

  getSeguidores(){
      this._seguidorService.seguidores(this.leitor.id).subscribe(
        ( response ) => { this.listSeguidores = response }
      )
  }

  getSeguindo(){
      this._seguidorService.seguindo(this.leitor.id).subscribe(
          ( response ) => { this.listSeguindo = response }
      )
  }

  openModalCompartilhar(interacoes: Interacao[], interacoesLeitor: InteracaoLeitor[], post: Post){
    this.post = post;
    this.interacoes = interacoes;
    this.interacoesLeitor = interacoesLeitor;
    this.interacao = null;

    this.modalCompartilhar.emit({action: 'modal', params: ['open']});
  }

  closeModalCompartilhar(e){
      if (e)
        this.modalCompartilhar.emit({action: 'modal', params: ['close']});
  }

  excluiuCompartilhamento(response){
    //this.refreshInteracao(this.post.id, response.interacoes, response.interacoesLeitor, false);
    this.getTimeline();

    this.modalExcluir.emit({action: 'modal', params: ['close']});
  }

  openModalCompartilharMensagem(){
    this.modalCompartilharMensagem.emit({ action: 'modal', params: ['open']});

    setTimeout(() => this.closeModalCompartilharMensagem(), 1500);
  }

  closeModalCompartilharMensagem(){
    this.modalCompartilharMensagem.emit({ action:'modal', params:['close'] });
  }

  openModalDenuncia(p){
    this.post = p;
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

  openModalExcluir(t: Timeline){
      this.post = t.post;

      let interacoes = t.interacoes.filter((element) => {
          if (element.compartilhar == true && element.externa == false)
              return true;

          return false;
      });

      this.interacao = interacoes[0];
      this.idExcluir = this.post.id;
      this.opExcluir = 2;
      this.modalExcluir.emit({action: 'modal',params: ['open']});
  }

  closeModalExcluir(e){
    if(e){
        this.modalExcluir.emit({action:'modal',params:['close']});
        this.getTimeline();
        //this.getRascunhos();

        this._postService.getRascunhos(this.leitorLogado.id).subscribe(
          (rascunhos: Post[]) => {
              this.rascunhos = rascunhos;
          }
        )
    }
  }

  openModalExcluirRascunho(p: Post){
      this.post = p;
      this.idExcluir = this.post.id;
      this.opExcluir = 1;
      this.modalExcluir.emit({action: 'modal',params: ['open']});
  }


    pronto(){
        this.ready = true;
    }

  

}
