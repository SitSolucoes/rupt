import { AuthService } from './../../services/auth.service';
import { Component, OnInit, EventEmitter } from '@angular/core';

import {MaterializeAction} from 'angular2-materialize';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  modalActions = new EventEmitter<string|MaterializeAction>();

  constructor(private _authService: AuthService) { 
  }

  ngOnInit() {
  }

  ngAfterViewChecked() {
    //Called after every check of the component's view. Applies to components only.
    //Add 'implements AfterViewChecked' to the class.
    this.openModal1();
  }

  ngAfterContentChecked() {
    //Called after every check of the component's or directive's content.
    //Add 'implements AfterContentChecked' to the class.
    this.openModal1();
  }

  ngAfterContentInit() {
    //Called after ngOnInit when the component's or directive's content has been initialized.
    //Add 'implements AfterContentInit' to the class.
    this.openModal1();
  }
  
  openModal1() {
    this.modalActions.emit({action:"modal",params:['open']});
    console.log("open")
  }

  closeModal() {
    this.modalActions.emit({action:"modal",params:['close']});
    console.log("close");
  }

  /*login(form) {
    this._authService.signin(form.value.email, form.value.senha).subscribe(
      (response: any) => console.log(response)
    );
  }*/
}
