import { MensagensService } from './../../services/mensagens.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contato',
  templateUrl: './contato.component.html',
  styleUrls: ['./contato.component.css']
})
export class ContatoComponent implements OnInit {

  constructor(private _mensagemService: MensagensService) { }

  ngOnInit() {
  }

  f;

  enviaMensagemTeste(){
    return this._mensagemService.enviaMensagem(this.f).subscribe(
      (data: any) => {
          console.log("sucesso!");
      }
  );
  }

}
