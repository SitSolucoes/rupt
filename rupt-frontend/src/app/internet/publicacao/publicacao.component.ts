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
import { Component, OnInit } from '@angular/core';

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
  
  constructor(private _formBuilder: FormBuilder,
              private _leitorService: LeitoresService,
              private _router: Router,
              private _categoriaService: CategoriasService,
              private _postService: PostsService,
              private _uploadFileService: UploadFileService,
              private _activatedRoute: ActivatedRoute
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
        //esse id é o da timeline!
        //porque o post pode ser do cara e ele vai editar, 
        //mas também pode ser um post compartilhado, então ele não pode editar o post.
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
  public editorOptions = {
    placeholder: "Escreva seu texto aqui...",
  };

  onEditorBlured(quill) {
    //console.log('editor blur!', quill);
  }

  onEditorFocused(quill) {
    //console.log('editor focus!', quill);
  }

  onEditorCreated(quill) {
    this.editor = quill;
    //console.log('quill is ready! this is current quill instance object', quill);
  }

  onContentChanged({ quill, html, text }) {
    //console.log('quill content is changed!', quill, html, text);
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

}
