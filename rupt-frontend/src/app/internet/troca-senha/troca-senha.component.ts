import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidaCampo } from './../../shared/valida-campo';
import { LeitoresService } from 'app/services/leitores.service';
import { Base64 } from './../../shared/Base64';
import { Location } from '@angular/common';

@Component({
  selector: 'app-troca-senha',
  templateUrl: './troca-senha.component.html',
  styleUrls: ['./troca-senha.component.css']
})
export class TrocaSenhaComponent implements OnInit {

  private _fb: FormBuilder = new FormBuilder();
  public form: FormGroup;
  public validaCampo: ValidaCampo = new ValidaCampo();
  private base64: Base64;
  public mensagem: string;
  public trocou: boolean = false;

  constructor(private _leitorService: LeitoresService, private _location: Location) { }

  ngOnInit() {
    this.base64 = new Base64();
    this.form = this._fb.group({
      antiga: ['', Validators.required ],
      senha: ['', Validators.required ],
      confirma: ['', Validators.required],
      idLeitor: [this.base64.decode(localStorage.getItem('l'))]
    });
  } 

  verificaValidTouched(campo: string){
    if(this.form)
      return this.validaCampo.verificaValidTouched(campo, this.form);
  }

  mensagemErro(campo: string){
    if(this.form)
      return this.validaCampo.mensagemErro(campo, this.form);
  }

  onSubmit(form){
    console.log(form);
    console.log(this.form);
    this._leitorService.trocaSenha(this.form).subscribe(
      (retorno)=>{
        this.trocou = !this.trocou;
      },
      (erro) => {
        this.mensagem = erro.json().erro;
      }
    )
  }

  voltar(){
    this._location.back();
  }

}
