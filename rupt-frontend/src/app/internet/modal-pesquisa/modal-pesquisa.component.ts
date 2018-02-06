import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Validators } from '@angular/forms';

@Component({
  selector: 'modal-pesquisa',
  templateUrl: './modal-pesquisa.component.html',
  styleUrls: ['./modal-pesquisa.component.css']
})
export class ModalPesquisaComponent implements OnInit {

  @Input() focus: boolean;
  @ViewChild("search") searchEl: ElementRef;

  formulario: FormGroup;

  constructor(private _formBuilder: FormBuilder,
              private _router: Router) { }

  ngOnInit() {
    this.createForm();
    
    //this.searchEl.nativeElement.focus();
  }

  createForm(){
      this.formulario = this._formBuilder.group({
          search: ['', Validators.required]
      });
  }

  onSubmit(){
      let search = this.formulario.get('search').value;
      this._router.navigate(['pesquisa/'+ search]);
  }

  ngOnChanges(changes: any) {
      this.searchEl.nativeElement.focus();
  }

}
