import { LeitoresService } from './../../services/leitores.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'esqueci-senha',
  templateUrl: './esqueci-senha.component.html',
  styleUrls: ['./esqueci-senha.component.css']
})
export class EsqueciSenhaComponent implements OnInit {

  erros;
  formulario: FormGroup;
  enviado: boolean;
  mensagem: string;
  spinner: boolean = false;
  @Output('closeModalEsqueciSenha') closeModalEsqueciSenha = new EventEmitter();
  constructor(private _formBuilder: FormBuilder, private _ls: LeitoresService) { }

  ngOnInit() {
    this.createForm();
    this.enviado = false;
  }

  onSubmit(){
    this.spinner = true;
    if(this.formulario.value.email != this.formulario.value.confirma){
      this.erros = [];
      this.erros.push('Os emails devem ser iguais.');
      this.spinner = false;
      return false;
    }
    this._ls.esqueciSenha(this.formulario).subscribe(
      (retorno)=>{
        if(!retorno.retorno){
          this.erros = [];
          this.erros.push(retorno.mensagem);
          console.log(retorno.mensagem);
          this.spinner = false;
          return false;
        }
        this.enviado = true;
        this.spinner = false;
        this.mensagem = retorno.mensagem;
      });
  }

  createForm(){
    this.formulario = this._formBuilder.group({
        email: ['', Validators.required],
        confirma: ['', Validators.required]
    })
  }
  voltar(){
    this.closeModalEsqueciSenha.emit(true);
  }
}
