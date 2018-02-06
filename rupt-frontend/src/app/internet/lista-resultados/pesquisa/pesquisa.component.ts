import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LeitoresService } from 'app/services/leitores.service';
import { Leitor } from 'app/classes/leitor';
import { Post } from 'app/classes/post';
import { PostsService } from 'app/services/posts.service';

@Component({
    selector: 'app-pesquisa',
    templateUrl: './pesquisa.component.html',
    styleUrls: ['./pesquisa.component.css']
})

export class PesquisaComponent implements OnInit {

    listLeitores: Leitor[] = new Array();
    listPostUltimos: Post[] = new Array();
    listPostDestaques: Post[] = new Array();

    loadingLeitores: boolean = false;
    loadingPostUltimos: boolean = false;
    loadingPostDestaques: boolean = false;

    search: string = "";

    constructor(private _activatedRoute: ActivatedRoute,
                private _leitorService: LeitoresService,
                private _postService: PostsService) { }

    ngOnInit() {
        window.scrollTo(0, 0);

        this._activatedRoute.params.subscribe(params => {
        if (params['search'] && params['search'] != ''){
            this.search = params['search'];

            this.getDestaques();
            this.getUltimos();
            this.getLeitores();
        }
        else {
            this.search = '';
        }
        /*this._leitorService.getCategoriaByLink(params['categoria']).subscribe(
            ( categoria: Categoria) => { 
                if (categoria){
                    this.categoria = categoria; 
                    this.getPosts();
                }
            }
        )*/
        });
    }

    getLeitores(){
        this.loadingLeitores = true;
        this._leitorService.pesquisaLeitor(this.search).subscribe(
            ( response ) => { 
                this.listLeitores = response 
                this.loadingLeitores = false;
            }
        )
    }

    getDestaques(){
        this.loadingPostDestaques = true;
        this._postService.pesquisaDestaques(this.search).subscribe(
            ( response ) => { 
                this.listPostDestaques = response;
                this.loadingPostDestaques = false;
            }
        )
    }

    getUltimos(){
        this.loadingPostUltimos = true;
        this._postService.pesquisaUltimos(this.search).subscribe(
            ( response ) => { 
                this.listPostUltimos = response;
                this.loadingPostUltimos = false;
            }
        )
    }

}
