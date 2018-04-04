import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { LeitoresService } from './../../services/leitores.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'redefine-senha',
  templateUrl: './redefine-senha.component.html',
  styleUrls: ['./redefine-senha.component.css']
})

export class RedefineSenhaComponent implements OnInit {

  valido: boolean = false;
  form: FormGroup; 
  erros = {
    senha: '',
    token: ''
  }
  mensagem: String = '';

  /*
  constructor(){
  }*/

  ngOnInit() {
    console.log('construtor novo');
  }


  constructor(private _leitoresService: LeitoresService,
              private activatedRoute: ActivatedRoute,
              private _fb: FormBuilder) {
    this.activatedRoute.params.subscribe(
      (params) => {
        console.log("Params: ");
        console.log(params);
        this._leitoresService.validaToken(params['token']).subscribe(
          (response) => {
            if (response.resultado) {
                  console.log("Response: ");
                  console.log(response);
                  this.valido = true;
                  this.createForm();
                  this.setEmailForm(response.leitor);
            }else{
              this.erros.token = response.mensagem;
            }
          },
          (erro) => {
            console.log("deu pau");
            console.log(erro);
          }
        )
      },);
  }

  private createForm(){
    console.log('createForm');
    this.form = this._fb.group({
      email: ['', Validators.required],
      novaSenha: ['', Validators.required],
      confirma_senha: ['', Validators.required]
    });
    console.log('criou form');
  }

  tokenValido(){
    return this.valido;
  }

  onSubmit(){
    if(this.form.value.novaSenha == this.form.value.confirma_senha) {
      this._leitoresService.redefineSenha(this.form).subscribe(
        (data)=> {
          console.log("data: ");
          console.log(data);
          this.mensagem = data;
        },
        (erro) => {
          this.mensagem = "Problemas de conexão, tente novamente mais tarde ou entre em contato com nossa equipe";
        }
      );
    }else {
      this.erros.senha = 'As senhas devem coincidir.';
    }
  }

  setEmailForm(email){
    this.form.patchValue({
      email: email
    });
  }
}
