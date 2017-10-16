import { AdministradoresService } from './../../services/administradores.service';
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

  constructor(private _adminService: AdministradoresService) { }

  ngOnInit() {
  }

  esqueciSenha(form){
    this.spinner = true;

    this._adminService.envia_esqueciSenha(form).subscribe(
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
