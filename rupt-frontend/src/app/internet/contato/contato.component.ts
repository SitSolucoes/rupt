import { LeitoresService } from './../../services/leitores.service';
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

  constructor(private _formBuilder: FormBuilder, private _leitorService: LeitoresService, private _mensagemService: MensagensService) { }

  ngOnInit() {
    
    if(localStorage.getItem('l'))
      this._leitorService.getLeitor(localStorage.getItem('l')).subscribe(
        (l) => {
          this.msg_form = this._formBuilder.group({
            nome: [l.nome],
            email: [l.email],
            leitorId: [l.id],
            assunto: [null],
            conteudo: [null]
          });
        }
      );
    else  
      this.msg_form = this._formBuilder.group({
        nome: [null],
        email: [null],
        leitorId: [null],
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
    console.log('msg_form');
    console.log(this.msg_form);
    return this._mensagemService.enviaMensagem(this.msg_form).subscribe(
      (data: any) => {
        console.log(data);
          if(data.resultado){
            console.log(data.resultado)
          }
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

}
