import { LeitoresService } from './../../services/leitores.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'esqueci-senha',
  templateUrl: './esqueci-senha.component.html',
  styleUrls: ['./esqueci-senha.component.css']
})
export class EsqueciSenhaComponent implements OnInit {

  formulario: FormGroup;
  constructor(private _formBuilder: FormBuilder, private _ls: LeitoresService) { }

  ngOnInit() {
    this.createForm();
  }

  onSubmit(){
    if(this.formulario.value.email != this.formulario.value.confirma)
      console.log('teste de form invalido');
      console.log('passou');
    this._ls.esqueciSenha(this.formulario).subscribe(
      (retorno)=>{
        console.log('retorno');
        console.log(retorno);
      });
  }

  createForm(){
    this.formulario = this._formBuilder.group({
        email: ['', Validators.required],
        confirma: ['', Validators.required]
    })
  }
}
