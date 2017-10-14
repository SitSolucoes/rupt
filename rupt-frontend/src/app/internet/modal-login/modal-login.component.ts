import { LeitoresService } from './../../services/leitores.service';
import { FormGroup, FormBuilder, Validator, Validators } from '@angular/forms';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'modal-login',
  templateUrl: './modal-login.component.html',
  styleUrls: ['./modal-login.component.css']
})
export class ModalLoginComponent implements OnInit {
  
  @Output() fechaModal = new EventEmitter();

  formulario: FormGroup;

  constructor(private _formBuilder: FormBuilder,
              private _leitorService: LeitoresService) { }

  ngOnInit() {
    this.createForm();
  }

  createForm(){
    this.formulario = this._formBuilder.group({
        email: ['', Validators.required],
        senha: ['', Validators.required]
    })
  }

  onSubmit(){
    this._leitorService.doLogin(this.formulario).subscribe(
      (response) => { console.log(response) }
    )
  }

}
