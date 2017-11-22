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

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      console.log(params);
      this._leitoresService.validaToken(params.token).subscribe(
        (response) => {
            if (response.resultado) {
                this.valido = true;
                this.montaForm(response.email);
                //this.doLogin(response.email);
            }
              
        }
      )
    });
    
  }

  tokenValido(){
    return this.valido;
  }

  onSubmit(){
    this._leitoresService.redefineSenha(this.form).subscribe(

    );
  }

  montaForm(email){
    this.form = this._fb.group({
      email: [email],
      novaSenha: ['', Validators.required]
    });
  }

  doLogin(email){

  }

}
