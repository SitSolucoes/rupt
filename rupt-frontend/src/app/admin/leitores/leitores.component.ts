import { Component, OnInit, EventEmitter } from '@angular/core';

import {MaterializeAction} from 'angular2-materialize';
import { Option } from './../../shared/option';
import { LeitoresService } from './../../services/leitores.service';

@Component({
  selector: 'app-leitores',
  templateUrl: './leitores.component.html',
  styleUrls: ['./leitores.component.css']
})
export class LeitoresComponent implements OnInit {

  message: string;
  modalActions = new EventEmitter<string|MaterializeAction>();
  leitores;
  leitor_selecionado;
  selectOptions: Option[] = [
    {value: "f", name: 'Feminino'},
    {value: "m", name: 'Masculino'}
  ];

  constructor(private _leitorService: LeitoresService) {}

  ngOnInit() {
    this.leitor_selecionado = null;
  }

  getLeitores(){
    return this.leitores;
  }

  openModal() {
    this.modalActions.emit({action:"modal",params:['open']});
  }

  onSubmit(form){
      this._leitorService.createLeitor(form).subscribe(
        (response: any) => {
          this.message = response;
          /*this._adminService.getAdmins().subscribe(
            (admins: Admin[]) => {
              this.admins = admins;
              //console.log(this.admins);
              }
          );*/
          alert(this.message);
        }
      );
      
    }
  
}
