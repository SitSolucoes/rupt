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
  erro : string = "";
  button : string = "Enviar e-mail";
  spinner: boolean = false;
  succes: boolean = false;

  constructor(private _authService: AuthService) { }

  ngOnInit() {
  }

  esqueciSenha(form){
    this.spinner = true;

    this._authService.envia_esqueciSenha(form).subscribe(
      retorno => {
        if(retorno.json().error){
          this.erro = retorno.json().error;
        }else{
          this.info = retorno.json().retorno;
          this.titulo = "Verifique seu e-mail."
          this.succes = true;
        }
        this.spinner = false;
      }
    );

    
  }
}
