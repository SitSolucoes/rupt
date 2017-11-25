import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { LeitoresService } from './../../services/leitores.service';
import { Component, OnInit } from '@angular/core';
import { Params } from '@angular/router/src/shared';

@Component({
  selector: 'redefine-senha',
  templateUrl: './redefine-senha.component.html',
  styleUrls: ['./redefine-senha.component.css']
})
export class RedefineSenhaComponent implements OnInit {

  constructor(private _leitoresService: LeitoresService, private activatedRoute: ActivatedRoute, private _fb: FormBuilder) { }

  valido: boolean = false;
  form: FormGroup; 
  erros = {
    senha: '',
    token: ''
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      console.log(params);
      this._leitoresService.validaToken(params.token).subscribe(
        (response) => {
          console.log('response');
          console.log(response);
            if (response.resultado) {
                this.valido = true;
                console.log(response);
                this.montaForm(response.leitor);
                //this.doLogin(response.email);
            }else{
              console.log(response);
              this.erros.token = response.mensagem;
            }
              
        }
      )
    });
    
  }

  tokenValido(){
    return this.valido;
  }

  onSubmit(){
    if(this.form.value.novaSenha == this.form.value.confirma_senha)
      this._leitoresService.redefineSenha(this.form).subscribe(
        (data)=> {
          console.log(data);
        }
      );
    else
      this.erros.senha = "As senhas devem coincidir."
  }

  montaForm(email){
    this.form = this._fb.group({
      email: [email],
      novaSenha: ['', Validators.required],
      confirma_senha: ['', Validators.required]
    });
  }

  teste(){
    console.log(this.form);
  }

  doLogin(email){

  }

}
