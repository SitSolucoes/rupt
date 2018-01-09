import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LeitoresService } from './../../services/leitores.service';
import { Option } from './../../shared/option';
import { FormBuilder, FormGroup, Validator } from '@angular/forms';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { UploadFileService } from "./../../services/upload-file.service";
import { UploadItem } from "./../../classes/upload-item";
import { AuthService } from 'angular2-social-login/dist/auth.service';

@Component({
  selector: 'modal-cadastro-leitor',
  templateUrl: './modal-cadastro-leitor.component.html',
  styleUrls: ['./modal-cadastro-leitor.component.css']
})
export class ModalCadastroLeitorComponent implements OnInit {
  @Output('closeModal') closeModal = new EventEmitter();
  
  constructor(private _router: Router, private _auth: AuthService) { }

  private login_sub;
  ngOnInit() {}

  redirectCadastro(){
    this.closeModal.emit(true);
    this._router.navigate(['cadastro']);
  }

  signIn(p){
    console.log('signin');
    this.login_sub = this._auth.login(p).subscribe((data)=>{
      console.log('retorno fb');
      console.log(data);
      console.log('retorno fb');
    });
  }
  
}
