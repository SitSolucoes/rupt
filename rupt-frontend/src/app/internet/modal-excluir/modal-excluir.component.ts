import { PostsService } from './../../services/posts.service';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { TimelineService } from 'app/services/timeline.service';
import { Router } from '@angular/router';
import { InteracoesLeitorService } from 'app/services/interacoes-leitor.service';
import { InteracaoLeitor } from 'app/classes/interacao-leitor';

@Component({
  selector: 'modal-excluir',
  templateUrl: './modal-excluir.component.html',
  styleUrls: ['./modal-excluir.component.css']
})
export class ModalExcluirComponent implements OnInit {

  @Input('id') id;
  @Input('leitor') leitor;
  @Input('interacao') interacao;
  @Input('op') op; //1 - post //2 - compartilhado

  @Output('closeModalExcluir') closeModalExcluir = new EventEmitter();
  @Output('excluiuCompartilhamento') excluiuCompartilhamento = new EventEmitter();
  
  constructor(private _timelineService: TimelineService, 
              private _postService: PostsService,
              private _interacoesLeitorService: InteracoesLeitorService,
              private _router: Router) { }

  ngOnInit() {}

  closeModal(){
    this.closeModalExcluir.emit(true);
  }

  confirm(){
    if (this.op == 2){
        let interacaoLeitor = new InteracaoLeitor();
        interacaoLeitor.interacao = this.interacao;
        interacaoLeitor.leitor_idLeitor = this.leitor.id;
        interacaoLeitor.post_idPost = this.id;

        this._interacoesLeitorService.desfazCompartilhamento(interacaoLeitor).subscribe(
          (response) => { 
              this.excluiuCompartilhamento.emit(response);
           }
        )
    }
    else{
      this._postService.delete(this.id).subscribe(
        (response) => {
          this.closeModal();
        }
      )
    }
  }

}
