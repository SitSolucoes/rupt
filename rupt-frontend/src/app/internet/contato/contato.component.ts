import { Base64 } from './../../shared/Base64';
import { LeitoresService } from './../../services/leitores.service';
import { Option } from './../../shared/option';
import { FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { MensagensService } from './../../services/mensagens.service';
import { Component, OnInit } from '@angular/core';
import { Leitor } from 'app/classes/leitor';

@Component({
  selector: 'app-contato',
  templateUrl: './contato.component.html',
  styleUrls: ['./contato.component.css']
})
export class ContatoComponent implements OnInit {
  base64: Base64 = new Base64();
  msg_form: FormGroup;
  leitor: Leitor;

  constructor(private _formBuilder: FormBuilder, 
              private _leitorService: LeitoresService, 
              private _mensagemService: MensagensService) { }

  ngOnInit() {
    this.createForm();

    this._leitorService.leitor.subscribe(
      (leitor: Leitor) => { this.leitor = leitor }
    )

    this._leitorService.verificaLogin().subscribe(
      (response) => { 
        if (response){
            this.preencheForm();
        }
      }
    )
  }

  createForm(){
    this.msg_form = this._formBuilder.group({
      nome: '',
      email: '',
      leitorId:'',
      assunto: 'assunto',
      conteudo: ''
    })
  }

  preencheForm(){
    this.msg_form.patchValue({
      nome: this.leitor.nome,
      email: this.leitor.email,
      leitorId: this.leitor.id
    })
  }

  assuntoOptions: Option[] = [
    {value: 'Dúvidas', name: 'Dúvidas'},
    {value: 'Sujestão', name: 'Sujestão'},
    {value: 'Sobre Minha Conta', name: 'Duvidas'}
  ]; 

  enviaMensagem(){
    return this._mensagemService.enviaMensagem(this.msg_form).subscribe(
      (data: any) => {
        this.msg_form.reset();
        if (this.leitor)
          this.preencheForm();
    });
  }
}
