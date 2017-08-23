import { Option } from './../../shared/option';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'modal-cadastro-leitor',
  templateUrl: './modal-cadastro-leitor.component.html',
  styleUrls: ['./modal-cadastro-leitor.component.css']
})
export class ModalCadastroLeitorComponent implements OnInit {

  ;
  form: FormGroup;
  selectOptions: Option[] = [
    {value: 'M', name: 'Masculino'},
    {value: 'F', name: 'Feminino'},
    {value: 'O', name: 'Outros'}
  ];
  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit() {
    this.form = this._formBuilder.group({
      nome: [null],
      nick: [null],
      sexo: [null],
      nascimento: [null],
      src_foto: [null],
      email: [null]
    });
  }

  onSubmit(){

  }
  
}
