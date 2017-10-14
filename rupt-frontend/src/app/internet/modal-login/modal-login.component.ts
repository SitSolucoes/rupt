import { Router } from '@angular/router';
import { LeitoresService } from './../../services/leitores.service';
import { FormGroup, FormBuilder, Validator, Validators } from '@angular/forms';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'modal-login',
  templateUrl: './modal-login.component.html',
  styleUrls: ['./modal-login.component.css']
})
export class ModalLoginComponent implements OnInit {
  
  @Output('closeModalLogin') closeModalLogin = new EventEmitter();
  
  erro: boolean;
  formulario: FormGroup;
  mensagemErro: string;

  constructor(private _formBuilder: FormBuilder,
              private _leitorService: LeitoresService,
              private _router: Router) { }

  ngOnInit() {
    this.createForm();
  }

  createForm(){
    this.formulario = this._formBuilder.group({
        email: ['', Validators.required],
        senha: ['', Validators.required]
    })
  }

  onSubmit(){
    this.erro = false;

    this._leitorService.doLogin(this.formulario).subscribe(
      (response) => { 
        if (response[0] == false){
          this.erro = true;
          this.mensagemErro = response[1];
        }
        else {
          this.closeModalLogin.emit(true);

          this._router.navigate(['rupt/perfil']);
        }
      }
    )
  }

}
