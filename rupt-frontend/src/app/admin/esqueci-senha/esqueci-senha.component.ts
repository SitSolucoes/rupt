import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-esqueci-senha',
  templateUrl: './esqueci-senha.component.html',
  styleUrls: ['./esqueci-senha.component.css']
})
export class EsqueciSenhaComponent implements OnInit {

  titulo : string = "Esqueceu a senha?";
  info : string = "Informe seu e-mail para recuperaração.";
  button : string = "Enviar e-mail";

  constructor(private _authService: AuthService) { }

  ngOnInit() {
  }

  esqueciSenha(form){
    this._authService.envia_esqueciSenha(form).subscribe(
      retorno => {
        if(retorno.json().error){
          this.info = retorno.json().error;
          this.titulo = "Erro";
        }else{
          this.info = retorno.json().retorno;
          this.titulo = "Verifique seu e-mail."
        }
      }
    );

  }
}
