import { FormBuilder, FormGroup } from '@angular/forms';
import { MaterializeAction } from 'angular2-materialize';
import { race } from 'rxjs/operator/race';
import { Escritor } from './../../classes/escritor';
import { Component, OnInit, HostListener, EventEmitter } from '@angular/core';

import { DenunciasService } from './../../services/denuncias.service';
import { PostsService } from './../../services/posts.service';
import { Denuncia } from './../../classes/denuncia';
import { Option } from './../../shared/option';
import { Post } from './../../classes/post';
import { Leitor } from './../../classes/leitor';
import { Motivo_Denuncia } from './../../classes/motivo_denuncia';
import { ConnectionFactory } from '../../classes/connection-factory';

@Component({
	selector: 'app-denuncias',
	templateUrl: './denuncias.component.html',
	styleUrls: ['./denuncias.component.css']
})
export class DenunciasComponent implements OnInit {

	url: string = ConnectionFactory.API_IMAGEM;
	selectOptions: Option[] = [
		{value: "-1", name: 'Sem Motivo'},
	];

	modalActions = new EventEmitter<string|MaterializeAction>();

	denuncia_selecionada = null;
	post = null;
	form: FormGroup;
	
	denuncias = [];
	denunciasFiltro = [];

	constructor(private _denunciaService: DenunciasService,
				private _postsService: PostsService,
				private _fb: FormBuilder) { }

	ngOnInit() {
		this.getList();
	}

	//getList(){return null};
	getList(){
		this._denunciaService.getDenuncias()
		.subscribe(
			(denuncias: any) => {
			this.denuncias = denuncias;
			this.denunciasFiltro = denuncias;
			}
		);
	}

	getPost(id): Post{
		let post: Post;
		this._denunciaService.getPost(id).subscribe(
				(p: any) =>{
					post = p[0];
				}
				);
		return post;
	}

	closeModal(){
		this.getList();
		this.modalActions.emit({action:"modal",params:['close']});
	}

	openModal(d){
		this._denunciaService.getDetalhes(d).subscribe(
		(ret: any) =>{
			this.denuncia_selecionada = ret.denuncia;
			this.montaForm();
			this.modalActions.emit({action:"modal",params:['open']});
		}
		);
	}

	montaForm(){
		this.form = this._fb.group({
		idAdminDeleted: [localStorage.getItem('admin_id')],
		deletedAt: [new Date()],
		post_idPost: [this.denuncia_selecionada.post.id],
		motivo_idMotivo: [this.denuncia_selecionada.detalhes.motivo_idMotivo]
		});
	}
	

	action(action){
		if(action=="i"){
			this._denunciaService.agir(this.form, 'i').subscribe(
				(ret: any) => {
				if(ret.status)
					this.getList();
				}
			);
		}else
			this._denunciaService.agir(this.form, 'd').subscribe(
				(ret: any) => {
					if(ret.status)
					this.getList();
				}
			);
	}
}
