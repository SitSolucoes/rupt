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

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  filtro: string;
  leitor: Leitor;
  leitorLogado: Leitor;
  timeline;//: Timeline[] = new Array;
  timelineFiltro = new Array;
  url = ConnectionFactory.API_IMAGEM;
  calcTime = new CalcTime();
  modalDenuncia = new EventEmitter<string|MaterializeAction>();
  modalExcluir = new EventEmitter<string|MaterializeAction>();
  base64: Base64 = new Base64();
  post = new Post();
  timelineId = 0;
  private torne_se: boolean = false
  
  constructor(private _activatedRoute: ActivatedRoute,
              private _leitorService: LeitoresService, 
              private _timelineService: TimelineService,
              private _postService: PostsService,
              private _interacoesLeitorService: InteracoesLeitorService) { }

  ngOnInit() {
      window.scrollTo(0, 0);

      this.leitor = new Leitor();
      this.leitor.escritor = new Escritor();
      this.leitorLogado = new Leitor();

      this._activatedRoute.params.subscribe(params => {
        this._leitorService.getLeitorByNick(params['nick']).subscribe(
          (leitor: Leitor) => {
            this.leitor = leitor;
          }
        );
        if(params['torne-se-um-escritor']){
          this.torne_se = true;
        }else
          this.torne_se = false;

        this._leitorService.leitor.subscribe(
            (leitor: Leitor) => { this.leitorLogado = leitor }
          );
        this._leitorService.verificaLogin().subscribe(
            (response) => {
              this.getTimeline();
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

  calcHour(date){
    return this.calcTime.calcTime(date);
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
        if (!interacoes[i].compartilhar)
          soma = soma + interacoes[i].count;
      }

      return soma;
  }

  checkInteracao(interacao_id, interacoesLeitor: InteracaoLeitor[]){
      if (!interacoesLeitor || interacoesLeitor.length == 0)
        return true;

      let check = false;

      for (let i = 0; i < interacoesLeitor.length; i++){
        if (!interacoesLeitor[i].interacao.compartilhar && interacoesLeitor[i].interacao.categoria == 1 && interacoesLeitor[i].interacao_idInteracao == interacao_id){
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

  refreshInteracao(id, interacoes: Interacao[], interacoesLeitor: InteracaoLeitor[], timeline:boolean){
      if (timeline == false){
        for (let i = 0; i < this.timelineFiltro.length; i++){
          if (this.timelineFiltro[i].post.id == id){
              this.timelineFiltro[i].interacoes = interacoes;
              this.timelineFiltro[i].interacoesLeitor = interacoesLeitor;
          }
        }
      }
      else{
        for (let i = 0; i < this.timelineFiltro.length; i++){
          if (this.timelineFiltro[i].id == id){
              console.log('achou');
              this.timelineFiltro[i].interacoes = interacoes;
              this.timelineFiltro[i].interacoesLeitor = interacoesLeitor;
          }
        }
      }
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

  openModalExcluir(id){
      this.timelineId = id;
      this.modalExcluir.emit({
          action: 'modal',
          params: ['open']});
  }

  closeModalExcluir(e){
    if(e){
        this.modalExcluir.emit({action:'modal',params:['close']});
        this.getTimeline();
    }
  }

}
