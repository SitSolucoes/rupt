import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'modal-generico',
  templateUrl: './modal-generico.component.html',
  styleUrls: ['./modal-generico.component.css']
})
export class ModalGenericoComponent implements OnInit {

    @Output('closeModalGenerico') closeModalGenerico = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

}
