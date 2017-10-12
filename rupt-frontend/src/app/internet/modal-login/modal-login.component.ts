import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'modal-login',
  templateUrl: './modal-login.component.html',
  styleUrls: ['./modal-login.component.css']
})
export class ModalLoginComponent implements OnInit {
  
  @Output() fechaModal = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

}
