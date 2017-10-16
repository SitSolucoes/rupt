import { AdministradoresService } from './../../services/administradores.service';
import { CategoriasComponent } from '../categorias/categorias.component';
import { format } from 'util';
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
  spinner: boolean = false;

  constructor(private _adminService: AdministradoresService,
              private _router: Router) { 
  }

  ngOnInit() {
  }
 
  login(form){
    this.spinner = true;
    this.login_error = '';

    this._adminService.signin(form).subscribe(
      (response) => { 
        if (response[0] == false){
          this.login_error = response[1];
          this.spinner = false;
        }
        else {
          this.spinner = false;
          this._router.navigate(['admin/home']);
        }
      }
    )
  }
}
