import { Option } from './../../shared/option';
import { FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { MensagensService } from './../../services/mensagens.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contato',
  templateUrl: './contato.component.html',
  styleUrls: ['./contato.component.css']
})
export class ContatoComponent implements OnInit {

  msg_form: FormGroup;

  constructor(private _formBuilder: FormBuilder, private _mensagemService: MensagensService) { }

  ngOnInit() {
    this.msg_form = this._formBuilder.group({
      nome: [localStorage.getItem('leitorNome')],
      email: [localStorage.getItem('leitorEmail')],
      leitorId: [localStorage.getItem('leitorId')],
      assunto: [null],
      conteudo: [null]
    });
  }

  assuntoOptions: Option[] = [
    {value: 'Dúvidas', name: 'Dúvidas'},
    {value: 'Sujestão', name: 'Sujestão'},
    {value: 'Sobre Minha Conta', name: 'Duvidas'}
  ]; 

  enviaMensagem(){
    return this._mensagemService.enviaMensagem(this.msg_form).subscribe(
      (data: any) => {
          console.log("sucesso!");
      }
  );
  }

}
