import { LeitoresService } from './../../services/leitores.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';


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
  constructor(private _formBuilder: FormBuilder, private _ls: LeitoresService) { }

  ngOnInit() {
    this.createForm();
    this.enviado = false;
  }

  onSubmit(){
    if(this.formulario.value.email != this.formulario.value.confirma){
      this.erros = [];
      this.erros.push('Os emails devem ser iguais.');
      return false;
    }
    this._ls.esqueciSenha(this.formulario).subscribe(
      (retorno)=>{
        if(!retorno.retorno){
          this.erros = [];
          this.erros.push(retorno.mensagem);
          console.log(retorno.mensagem);
          return false;
        }
        this.enviado = true;
        this.mensagem = retorno.mensagem;
      });
  }

  createForm(){
    this.formulario = this._formBuilder.group({
        email: ['', Validators.required],
        confirma: ['', Validators.required]
    })
  }
}
