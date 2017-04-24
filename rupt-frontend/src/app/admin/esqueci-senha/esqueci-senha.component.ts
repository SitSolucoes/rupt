import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-esqueci-senha',
  templateUrl: './esqueci-senha.component.html',
  styleUrls: ['./esqueci-senha.component.css']
})
export class EsqueciSenhaComponent implements OnInit {

  titulo : string = "Esqueceu a senha?";
  info : string = "Informe seu email para recuperaração.";
  button : string = "Enviar email";

  constructor(private _authService: AuthService) { }

  ngOnInit() {
  }

  esqueciSenha(form){
    this._authService.envia_esqueciSenha(form).subscribe(
      retorno => {
        this.info = retorno;
        this.titulo = "Verifique seu email."
      },
      error => {
        this.info = error.json().error;
        this.titulo = "Erro"
      }
    );
  }
}
