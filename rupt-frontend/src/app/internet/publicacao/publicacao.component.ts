import { Component, OnInit } from '@angular/core';

import * as $ from 'jquery';

@Component({
  selector: 'app-publicacao',
  templateUrl: './publicacao.component.html',
  styleUrls: ['./publicacao.component.css']
})
export class PublicacaoComponent implements OnInit {

  text;
  public options: Object = { 
    placeholderText: 'Escreva seu texto aqui!',
    language: 'pt_br'
  }

  constructor() { }

  ngOnInit() {

  }

  onSubmit(){
    console.log(this.text);
  }

}
