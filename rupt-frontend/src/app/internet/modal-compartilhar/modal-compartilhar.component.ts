import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Interacao } from 'app/classes/interacao';
import { InteracaoLeitor } from 'app/classes/interacao-leitor';

@Component({
  selector: 'modal-compartilhar',
  templateUrl: './modal-compartilhar.component.html',
  styleUrls: ['./modal-compartilhar.component.css']
})
export class ModalCompartilharComponent implements OnInit {

  @Input() interacoes: Interacao[];
  @Input() interacoesLeitor: InteracaoLeitor[];
  @Output() compartilhar = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  interage(i: Interacao){
      this.compartilhar.emit([i, this.verifyInteragiu(i)]);
  }

  verifyInteragiu(i: Interacao){
      if (i.externa || !this.interacoesLeitor || this.interacoesLeitor.length == 0)
        return false;
      
      let interacao = this.interacoesLeitor.filter((element) =>{
          if (element.interacao.id == i.id)
              return true;

          return false;
      });

      if (interacao.length > 0)
          return true;

      return false;
  }

}
