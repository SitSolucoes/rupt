import { LeitoresService } from './../../services/leitores.service';
import { Leitor } from 'app/classes/leitor';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import * as $ from 'jquery';

@Component({
  selector: 'app-publicacao',
  templateUrl: './publicacao.component.html',
  styleUrls: ['./publicacao.component.css']
})
export class PublicacaoComponent implements OnInit {

  formulario: FormGroup;
  leitor: Leitor;

  constructor(private _formBuilder: FormBuilder,
              private _leitorService: LeitoresService
              ) { }

  ngOnInit() {
      this.createForm();

      this._leitorService.leitor.subscribe(
        (leitor: Leitor) => { 
          this.leitor = leitor;
          this.formulario.patchValue({
            leitor_id: this.leitor.id
          })
        }
      )

      this._leitorService.verificaLogin().subscribe();
  }

  createForm(){
    this.formulario = this._formBuilder.group({
      categoria_id: ['', Validators.required],
      leitor_id: [''],
      texto: ['', Validators.required]
    })
  }

  onSubmit(){
    console.log(this.formulario);
  }

  public editor;
  public editorContent = `<h3>I am Example content</h3>`;
  public editorOptions = {
    placeholder: "Escreva seu texto aqui..."
  };

  onEditorBlured(quill) {
    //console.log('editor blur!', quill);
  }

  onEditorFocused(quill) {
    //console.log('editor focus!', quill);
  }

  onEditorCreated(quill) {
    this.editor = quill;
    //console.log('quill is ready! this is current quill instance object', quill);
  }

  onContentChanged({ quill, html, text }) {
    //console.log('quill content is changed!', quill, html, text);
  }

}
