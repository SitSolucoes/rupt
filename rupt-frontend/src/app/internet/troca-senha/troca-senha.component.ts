import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidaCampo } from './../../shared/valida-campo';

@Component({
  selector: 'app-troca-senha',
  templateUrl: './troca-senha.component.html',
  styleUrls: ['./troca-senha.component.css']
})
export class TrocaSenhaComponent implements OnInit {

  private _fb: FormBuilder = new FormBuilder();
  public form: FormGroup;
  public validaCampo: ValidaCampo = new ValidaCampo();

  constructor() { }

  ngOnInit() {
    this.form = this._fb.group({
      antiga: ['', Validators.required ],
      senha: ['', Validators.required ],
      confirma: ['', Validators.required]
    });
  }

  verificaValidTouched(campo: string){
    return this.validaCampo.verificaValidTouched(campo, this.form);
  }

  mensagemErro(campo: string){
    return this.validaCampo.mensagemErro(campo, this.form);
  }

  onSubmit(){
    console.log(this.form);
  }

}
