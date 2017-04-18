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

  login(form) {
    alert('entrou no método do form');
    this._authService.signin(form.value.email, form.value.senha).subscribe(
      (response: any) => console.log(response)
    );
    alert('saiu no método do form');
  }
}
