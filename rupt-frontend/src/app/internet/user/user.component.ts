import { CalcTime } from './../../shared/calcTime';
import { MaterializeAction } from 'angular2-materialize';
import { Interacoes } from './../../interacoes';
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

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  filtro: string;
  leitor: Leitor;
  leitorLogado: Leitor;
  timeline: Timeline[] = new Array;
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
              private _postService: PostsService) { }

  ngOnInit() {
      this.leitor = new Leitor();
      this.leitor.escritor = new Escritor();
      this.leitorLogado = new Leitor();

      this._activatedRoute.params.subscribe(params => {
        this._leitorService.getLeitorByNick(params['nick']).subscribe(
          (leitor: Leitor) => {
            this.leitor = leitor;
            this.getTimeline();
          }
        );
        if(params['torne-se-um-escritor']){
          this.torne_se = true;
        }else
          this.torne_se = false;

      });
      this._leitorService.leitor.subscribe(
        (leitor: Leitor) => { this.leitorLogado = leitor }
      );
      this._leitorService.verificaLogin().subscribe();
  }

  getTimeline(){
      this._timelineService.getTimeline(this.leitor.id).subscribe(
        ( timeline) => { 
          this.timeline = timeline;
          this.timelineFiltro = timeline;
        }
      )
  }

  calcHour(date){
    return this.calcTime.calcTime(date);
  }

  search(){
      console.log(this.timelineFiltro);

      if (!this.filtro || this.filtro == '')
        this.timelineFiltro = this.timeline;
      else {
        this.timelineFiltro = this.timelineFiltro.filter((t) => {
          if (t.tl.post.titulo.toLowerCase().indexOf(this.filtro.toLowerCase()) >= 0 ||
              t.tl.post.conteudo.toLowerCase().indexOf(this.filtro.toLowerCase()) >= 0) {

            return true;
          }
          return false;
        })
      }
  }

  interage(post, i){
    this._postService.interage(post, null, this.leitor.id, 'post', i).subscribe(
      (ret)=>{
        if(ret.status == 'OK'){
          let novainteracoes = new Interacoes(ret.likes.length, ret.love.length, ret.shares.length, ret.sad.length, ret.angry.length, ret.cry.length).interacoes;
          this.changeInteracoes(post, novainteracoes);
        }
      }
    );
  }

  changeInteracoes(post, i){
    for(let t of this.timelineFiltro){
      if(t.tl.post_idPost === post)
        t.interacoes = i;
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
