import { MaterializeAction } from 'angular2-materialize';
import { UploadFileService } from './../../services/upload-file.service';
import { PostsService } from './../../services/posts.service';
import { Categoria } from 'app/classes/categoria';
import { CategoriasService } from './../../services/categorias.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LeitoresService } from './../../services/leitores.service';
import { Leitor } from 'app/classes/leitor';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Component, OnInit, EventEmitter } from '@angular/core';

import * as $ from 'jquery';
import { UploadItem } from 'app/classes/upload-item';
import { Post } from 'app/classes/post';

@Component({
  selector: 'app-publicacao',
  templateUrl: './publicacao.component.html',
  styleUrls: ['./publicacao.component.css']
})
export class PublicacaoComponent implements OnInit {
  categorias: Categoria[];
  formulario: FormGroup;
  leitor: Leitor;
  post: Post = new Post();

  modalExcluir = new EventEmitter<string|MaterializeAction>();
  
  constructor(private _formBuilder: FormBuilder,
              private _leitorService: LeitoresService,
              private _router: Router,
              private _categoriaService: CategoriasService,
              private _postService: PostsService,
              private _uploadFileService: UploadFileService,
              private _activatedRoute: ActivatedRoute,
              ) { }

  ngOnInit() {
      this.createForm();
      this.getCategorias();

      this._leitorService.leitor.subscribe(
        (leitor: Leitor) => { 
          this.leitor = leitor;
          this.formulario.patchValue({
            leitor_id: this.leitor.id
          })
        }
      )

      this._leitorService.verificaLogin().subscribe(
        (response) => {
          if (!response)
            this._router.navigate(['/']);
          else{
            if (!this.leitor.escritor || this.leitor.escritor.status == 'r')
              this._router.navigate(['cadastro-escritor']);
            else 
              this.getPost();
          }
        }
      );
  }

  createForm(){
    this.formulario = this._formBuilder.group({
      id: '',
      categoria_id: ['', Validators.required],
      leitor_id: [''],
      titulo: ['', Validators.required],
      conteudo: ['', Validators.required],
      adulto: ''
    })
  }

  getPost(){
    this._activatedRoute.params.subscribe(params => {
      if (params['id']){
        this._postService.getPost(params['id']).subscribe(
          (post: Post) => { 
            this.post = post; 

            this.formulario.patchValue({
              id: post.id,
              titulo: post.titulo,
              conteudo: post.conteudo,
            });

          }
        )
      }
    });
  }

  getCategorias(){
    this._categoriaService.getCategoriasAtivas().subscribe(
      ( response ) => { this.categorias = response }
    )
  }

  onSubmit(){
    this._postService.create(this.formulario).subscribe(
      (response) => { this.uploadFiles(response) }
    )
  }

  public editor;
  public editorContent = `<h3>I am Example content</h3>`;
  public editorOptions = { placeholder: "Escreva seu texto aqui...", };

  onEditorBlured(quill) {}
  onEditorFocused(quill) {}
  onContentChanged({ quill, html, text }) {}
  onEditorCreated(quill) {
    this.editor = quill;
  }

  uploadFiles(post_id){
    let files = new Array();
    let files_name = new Array();
    
    if ((<HTMLInputElement>window.document.getElementById('imagem')).files[0]){
      files.push((<HTMLInputElement>window.document.getElementById('imagem')).files[0]);
      files_name.push('doc1');
    }

    if (files.length > 0){
        let myUploadItem = new UploadItem(files, files_name, "posts/uploadImages/"+post_id);
        
        myUploadItem.formData = { FormDataKey: 'Form Data Value' };  // (optional) form data can be sent with file

        this._uploadFileService.onSuccessUpload = (item, response, status, headers) => {
              // success callback
              this._router.navigate(['noticia/'+post_id]);
        };
        this._uploadFileService.onErrorUpload = (item, response, status, headers) => {
              // error callback
        };
        this._uploadFileService.onCompleteUpload = (item, response, status, headers) => {
              // complete callback, called regardless of success or failure
        };
        this._uploadFileService.upload(myUploadItem);
      }
      else 
          this._router.navigate(['noticia/'+post_id]);
  }

  openModalExcluir(){
    this.modalExcluir.emit({
        action: 'modal',
        params: ['open']});
  }

  closeModalExcluir(e){
    if(e){
        this.modalExcluir.emit({action:'modal',params:['close']});
        this._router.navigate(['/perfil/'+ this.leitor.nick]);
    }
  }

}
