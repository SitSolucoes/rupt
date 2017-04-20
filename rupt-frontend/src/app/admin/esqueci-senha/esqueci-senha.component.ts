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

  constructor() { }

  ngOnInit() {
  }

  enviarEmail(){
    this.titulo = "Verifique seu email."
    this.info = "Enviamos um email com as instruções para recuperação da senha.";
    this.button = "Reenviar email";
  }

}
