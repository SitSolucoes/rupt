import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { TimelineService } from 'app/services/timeline.service';
import { Router } from '@angular/router';

@Component({
  selector: 'modal-excluir',
  templateUrl: './modal-excluir.component.html',
  styleUrls: ['./modal-excluir.component.css']
})
export class ModalExcluirComponent implements OnInit {

  @Output('closeModalExcluir') closeModalExcluir = new EventEmitter();
  @Input('id') id;
  @Input('leitor') leitor;

  constructor(private _timelineService: TimelineService, 
              private _router: Router) { }

  ngOnInit() {}

  closeModal(){
    this.closeModalExcluir.emit(true);
  }

  confirm(){
    this._timelineService.deletePost(this.id).subscribe(
      (response) => {
        this.closeModal();
      }
    )
  }

}
