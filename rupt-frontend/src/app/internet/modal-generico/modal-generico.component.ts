import { Base64 } from 'app/shared/Base64';
import { Router } from '@angular/router';
import { DenunciasService } from './../../services/denuncias.service';
import { FormBuilder } from '@angular/forms';
import { PostsService } from './../../services/posts.service';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Validators } from '@angular/forms';

@Component({
  selector: 'modal-generico',
  templateUrl: './modal-generico.component.html',
  styleUrls: ['./modal-generico.component.css']
})
export class ModalGenericoComponent implements OnInit {

    @Output('closeModalGenerico') closeModalGenerico = new EventEmitter();
    @Input('action') action;
    @Input('idObj') idObj;

    formDenuncia;
    leitor;
    motivos;
    post;
    mensagem;
    base64: Base64 = new Base64();
  constructor(private _postService: PostsService,
              private _formBuilder: FormBuilder,
              private _denunciasService: DenunciasService,
              private _router: Router) { }

  ngOnInit() {
    if(this.action=="denuncia"){
      this.preparaDenuncia();
    }
  }

  preparaDenuncia(){
    this._denunciasService.getMotivosDenuncia().subscribe(
      (ret)=>{
        this.motivos = ret.motivos;
        console.log(this.motivos);
      }
    );
  }

  denuncia(motivo){
    
    this._denunciasService.create(motivo, this.idObj, this.base64.decode(localStorage.getItem('l'))).subscribe(
      (ret) =>{
        if(ret.status){
          this.action = "mensagemDenuncia";
          this.mensagem = "Sua denúncia foi computada com sucesso, estamos analisando para tomar as devidas providências! Obrigado.";
          console.log(this.mensagem);
          console.log(this.action);
        }else{
          this.action = "mensagemDenuncia";
          this.mensagem = ret.mensagem;
        }
      },
      (error) => {
        this.action = "mensagemDenuncia";
        this.mensagem = "Ops, algo deu errado, tente novamente mais tarde.";
      }
    )
  }
  closeModal(){
    this.closeModalGenerico.emit(true);
    if(this.action=='mensagemDenuncia')
      this._router.navigate(['rupt/noticia/'+this.idObj]); 
  }



}
