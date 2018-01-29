import { Global } from './../../../classes/global';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Interacao } from 'app/classes/interacao';
import { InteracaoLeitor } from 'app/classes/interacao-leitor';
import { FacebookService, UIParams, InitParams, UIResponse } from 'ngx-facebook';
import { Router } from '@angular/router';

@Component({
    selector: 'modal-compartilhar',
    templateUrl: './modal-compartilhar.component.html',
    styleUrls: ['./modal-compartilhar.component.css']
})
export class ModalCompartilharComponent implements OnInit {

    @Input() interacoes: Interacao[];
    @Input() interacoesLeitor: InteracaoLeitor[];
    @Output() compartilhar = new EventEmitter();

    

    constructor(private fb: FacebookService, private _router: Router) { 
        let initParams: InitParams = {
            appId: '832278863618741',
            xfbml: true,
            version: 'v2.11'
          };
       
          fb.init(initParams);
    }

    ngOnInit() {
        
    }

    interage(i: Interacao){
        console.log(Global.URL+this._router.url);
        let params: UIParams = {
            href: Global.URL + this._router.url,
            method: 'share'
          };
         
          this.fb.ui(params).then(
                (res: UIResponse) =>{
                    console.log(res)
                    this.compartilhar.emit([i, this.verifyInteragiu(i)]);
                } 
            )
            .catch((e: any) => console.error(e));
    }

    verifyInteragiu(i: Interacao){
        if (i.externa == true || !this.interacoesLeitor || this.interacoesLeitor.length == 0)
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
