import { ConnectionFactory } from 'app/classes/connection-factory';
import { Router } from '@angular/router';
import { LeitoresService } from './../../services/leitores.service';
import { MaterializeAction } from 'angular2-materialize';
import { NgForm } from '@angular/forms/src/directives';
import { Leitor } from './../../classes/leitor';
import { any } from 'codelyzer/util/function';
import { Component, OnInit, EventEmitter } from '@angular/core';
import { AuthService } from 'angular2-social-login/dist/auth.service';
import { CategoriasService } from 'app/services/categorias.service';
import { Categoria } from 'app/classes/categoria';
import { PostsService } from 'app/services/posts.service';
import { NotificacaoService } from '../../services/notificacao.service';
import { Notificacao } from '../../classes/notificacao';
declare var $: any;

@Component({
    selector: 'header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {

    categorias: Categoria[] = new Array();
    leitor: Leitor;
    modalActions = new EventEmitter<string|MaterializeAction>();
    modalLogin = new EventEmitter<string|MaterializeAction>();
    modalEsqueciSenha = new EventEmitter<string|MaterializeAction>();
    modalGenerico = new EventEmitter<string|MaterializeAction>();
    modalRascunho = new EventEmitter<string|MaterializeAction>();
    modalPesquisa= new EventEmitter<string|MaterializeAction>();
    openedSearch: boolean = false;

    notificacoes: Notificacao[] = new Array();

    url = ConnectionFactory.API_IMAGEM;

    constructor(private _leitorService: LeitoresService,
                private _router: Router,
                private _auth: AuthService,
                private _categoriaService: CategoriasService,
                private _postService: PostsService,
                private _notificacaoService: NotificacaoService
                ) { }

    ngOnInit() {
        this._leitorService.leitor.subscribe(
            (leitor: Leitor) => { 
            this.leitor = leitor;
            this.getNotificacoes();  
            }
        )

        $('.button-collapse').sideNav({
            closeOnClick: true,
        });

        this._leitorService.verificaLogin().subscribe();
        this.getCategorias();
    }

    getNotificacoes(){
        this._notificacaoService.getNotificacoes(this.leitor.id).subscribe(
            ( response ) => { 
                this.notificacoes = response ;
                setTimeout(()=>{ 
                    this.getNotificacoes();
                }, 1000*30);
            }
        )
    }

    countNotificacoesNaoLidas(){
        let nLidas = this.notificacoes.filter((element) => {
            if (element.lida == false)
                return true;
            return false;
        });

        return nLidas.length;
    }

    markAsRead(){
        this._notificacaoService.markAsRead(this.leitor.id).subscribe(
            ( response ) => { this.notificacoes = response }
        );
    }

    getCategorias(){
        this._categoriaService.getCategoriasAtivas().subscribe(
            (categorias) => { this.categorias = categorias; }
        )
    }

    openModal() {
        this.modalActions.emit({ action: 'modal', params: ['open']});
    }

    openModalLogin() {
        this.modalLogin.emit({ action: 'modal', params: ['open']});
    }

    openModalPesquisa() {
        this.modalPesquisa.emit({ action: 'modal', params: ['open']});
        this.openedSearch = true;  

        setTimeout(() => {
            this.openedSearch = false;
        }, 1000);
    }

    openModalEsqueciSenha(e){
        if(e){
            this.modalLogin.emit({action:"modal",params:['close']});
        }
            this.modalEsqueciSenha.emit({ action: 'modal', params: ['open']});
    }
    
    closeModal(e){
        if(e){
            this.modalActions.emit({action:"modal",params:['close']});
        }
    }

    closeModalLogin(e){
        if(e){
            this.modalLogin.emit({action:"modal",params:['close']});
        }
    }

    closeModalRascunho(e){
        if(e){
            this.modalRascunho.emit({action:"modal",params:['close']});
        }
    }

    closeModalGenerico(e){
        if(e){
            this.modalGenerico.emit({action:"modal",params:['close']});
        }
    }

    closeModalEsqueciSenha(e){
        if(e){
            this.modalEsqueciSenha.emit({action:"modal",params:['close']});
        }
    }

    closeModalPesquisa(e){
        if(e){
            this.modalPesquisa.emit({action:"modal",params:['close']});
        }
    }

    logout(){
        this._leitorService.logout();
        this._fb_logout();
        this._router.navigate(['/']);
    }

    private _fb_logout(){
        this._auth.logout().subscribe(
        (data)=>{}
        )
    }

}
