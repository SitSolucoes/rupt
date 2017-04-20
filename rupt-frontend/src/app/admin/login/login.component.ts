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

  login_error: string = '';

  ngOnInit() {
  }

  login(form) {
    //console.log(form);
    this._authService.signin(form).subscribe(
      (response: any) => {
          if(response.json().error == null){
            console.log("Login Efetuado");        
            this._router.navigate(['/admin/home']);
          }else{
            this.login_error = response.json().error
          }
      }
    );
  }
}
