import { LeitoresService } from './../../services/leitores.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'esqueci-senha',
  templateUrl: './esqueci-senha.component.html',
  styleUrls: ['./esqueci-senha.component.css']
})
export class EsqueciSenhaComponent implements OnInit {

	enviado: boolean;
	formulario: FormGroup;
	loading: boolean = false;
	mensagem: string = '';
  
  	@Output('closeModalEsqueciSenha') closeModalEsqueciSenha = new EventEmitter();
  
  	constructor(private _formBuilder: FormBuilder, private _ls: LeitoresService) { }

	ngOnInit() {
		this.createForm();
		this.enviado = false;
	}

  	createForm(){
		this.formulario = this._formBuilder.group({
			email: ['', Validators.required],
			confirma: ['', Validators.required]
		})
	}

	voltar(){
		this.closeModalEsqueciSenha.emit(true);
	}

	onSubmit(){
		this.loading = true;
		this.mensagem = '';

		if (!this.formulario.valid){
			this.mensagem = 'Insira o e-mail';
			this.loading = false;
		}
		else if(this.formulario.value.email != this.formulario.value.confirma){
			this.mensagem = 'Os e-mails não correspondem';
			this.loading = false;
		}
		else {
			this._ls.esqueciSenha(this.formulario).subscribe(
			(retorno)=>{
				if(!retorno.retorno){
				this.mensagem = retorno.mensagem;
				this.loading = false;
				return false;
				}
				
				this.enviado = true;
				this.loading = false;
				this.mensagem = retorno.mensagem;
			});
		}
	}
}
