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
  modalDenuncia = new EventEmitter<string|MaterializeAction>();
  base64: Base64 = new Base64();
  post;
  

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

  getMonthString(month){
    switch(month){
      case 0:
        return 'jan';
      case 1:
        return 'fev'  ;
      case 2:
        return 'mar';
      case 3: 
        return 'abr';
      case 4: 
        return 'mai';
      case 5: 
        return 'jun';
      case 6:
        return 'jul';
      case 7:
        return 'ago';
      case 8: 
        return 'set';
      case 9:
        return 'out';
      case 10:
        return 'nov';
      case 11:
        return 'dez';
    }
  }

  calcHour(date){
    let t = date.split(/[- :]/);
    let result = new Date(t[0], t[1] - 1, t[2], t[3] || 0, t[4] || 0, t[5] || 0);      

    let today = new Date();

    var timeDiff = Math.abs(today.getTime() - result.getTime());
    var diffDays = (timeDiff / (1000 * 3600 * 24)); 

    if (diffDays < 1){
      let hour = Math.round(diffDays*24);
      return hour.toString() + "h";
    }
    else if (diffDays <= 7){
      let day = Math.round(diffDays);
      return day.toString() + 'd';
    }
    else if (today.getFullYear == result.getFullYear){
      return result.getDate().toString() + " " + this.getMonthString(result.getMonth());
    }
    else {
      return result.getDate().toString() + " " + this.getMonthString(result.getMonth()) + ' de ' + result.getFullYear();
    }

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

  interage(post, i){
    console.log('está tentando dar' + i);
    this._postService.interage(post, null, this.leitor.id, 'post', i).subscribe(
      (ret)=>{
        if(ret.status == 'OK'){
          console.log('ok');
          let novainteracoes = new Interacoes(ret.likes.length, ret.love.length, ret.shares.length, ret.sad.length, ret.angry.length, ret.cry.length).interacoes;
          this.changeInteracoes(post, novainteracoes);
          console.log(this.timelineFiltro);
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



}
