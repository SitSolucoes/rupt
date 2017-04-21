import { AuthService } from './../../services/auth.service';
import { Component, OnInit, EventEmitter } from '@angular/core';

import {MaterializeAction} from 'angular2-materialize';
import { Router } from '@angular/router';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  modalActions = new EventEmitter<string|MaterializeAction>();

  constructor(private _authService: AuthService,
              private _router: Router) { 
  }

  ngOnInit() {
  }

  login_error: string = '';

  login(form) {
    this._authService.signin(form).subscribe(
      (response: any) => {
        if(response.admin_name != null){
          this._router.navigate(['admin/home']);
        }else
          this.login_error = 'Email ou senha incorretos.'
      }
    );
  }
}
