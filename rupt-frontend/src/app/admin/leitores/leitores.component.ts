import { Leitor } from './../../classes/leitor';
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
  filtro: string;
  leitores;
  leitor;
  selectOptions: Option[] = [
    {value: "f", name: 'Feminino'},
    {value: "m", name: 'Masculino'}
  ];

  constructor(private _leitorService: LeitoresService) {}

  ngOnInit() {
    this.leitor = new Leitor();
    this._leitorService.getLeitores().subscribe(
        (leitores: Leitor[]) => {this.leitores = leitores}
      );
  }

  getLeitores(){
    if ( this.filtro === undefined || this.leitores.length === 0 || this.filtro.trim() === ''){
      return this.leitores;
    }
      return this.leitores.filter((v) => {
      if (
        v.nome.toLowerCase().indexOf(this.filtro.toLowerCase()) >= 0 ||
        v.nick.toLowerCase().indexOf(this.filtro.toLowerCase()) >= 0 ||
        v.email.toLowerCase().indexOf(this.filtro.toLowerCase()) >= 0
      ) 
        return true;
      
      return false;
    });
  }

  openModal() {
    this.leitor = new Leitor();
    this.modalActions.emit({action:"modal",params:['open']});
  }

  closeModal() {
    this.modalActions.emit({action:"modal",params:['close']});
  }

  onSubmit(form){
      this._leitorService.createLeitor(form).subscribe(
        (response: any) => {
          this.message = response;
          
         this._leitorService.getLeitores().subscribe(
            (leitores: Leitor[]) => {this.leitores = leitores}
          );
        }
      );
      
    }

}
