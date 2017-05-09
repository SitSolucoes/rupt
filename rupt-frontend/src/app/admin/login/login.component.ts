import { CategoriasComponent } from '../categorias/categorias.component';
import { format } from 'util';
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
  login_error: string = '';
  message: string = '';

  constructor(private _authService: AuthService,
              private _router: Router) { 
  }



  ngOnInit() {
  }

  validaForm(form){
    
  }
  
  mostralog(campo){
    console.log(campo);
  }

  login(form) {
    this._authService.signin(form).subscribe(
      tokenData => {
          this._router.navigate(['admin/home']);
          
      },
      error => {
          this.login_error = error.json().error;
      }
    );
  }

  
}
