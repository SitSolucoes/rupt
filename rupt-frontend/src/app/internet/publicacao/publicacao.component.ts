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
  
  url_img;
  estilos = [
    {value: 1, option: 'Imagem e Texto'},
    {value: 2, option: 'Apenas imagens'},
    {value: 3, option: 'Texto'}
  ]

  modalExcluir = new EventEmitter<string|MaterializeAction>();
  modalRascunho = new EventEmitter<string|MaterializeAction>();

  constructor(private _formBuilder: FormBuilder,
              private _leitorService: LeitoresService,
              private _router: Router,
              private _categoriaService: CategoriasService,
              private _postService: PostsService,
              private _uploadFileService: UploadFileService,
              private _activatedRoute: ActivatedRoute,
              ) { }

  ngOnInit() {
      window.scrollTo( 0, 0);

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
      id: '0',
      categoria_id: [0, Validators.required],
      leitor_id: [''],
      titulo: ['', Validators.required],
      conteudo: ['', Validators.required],
      adulto: '',
      tipo_post: 3,
      regiao_id: [0, Validators.required],
    });
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
              categoria_id: post.categorias_post[post.categorias_post.length - 1].categoria.id,
              adulto: post.adulto == true ? true : false,
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
    /*if(rascunho){
      this.formulario.value.rascunho = true;
    }
    if(this.formulario.value.tipo_post == -1)
      this.formulario.patchValue({
        tipo_post: 3
      });

    //quantidade de imagens
    let qnt_imgs = this.formulario.value.conteudo.split('<img').length - 1;
    if(qnt_imgs === 0)
      this.formulario.patchValue({
        tipo_post: 3
      });

    if(qnt_imgs <= 2)
      this.formulario.patchValue({
        tipo_post: 1
      });

    if(qnt_imgs > 2)
      this.formulario.patchValue({
        tipo_post: 2
      });
    
    this._postService.create(this.formulario).subscribe(
      (response) => { this.uploadFiles(response) }
    )*/

    if (this.formulario.get('id').value == 0){
        this._postService.create(this.formulario).subscribe(
          (response) => { 
            this.post = response;
            console.log(this.post);
            this.uploadFiles(true); 
          }
        )
    }
  }

  //UPLOAD
  uploadFiles(rascunho: boolean){
    let files = new Array();
    let files_name = new Array();
    
    if ((<HTMLInputElement>window.document.getElementById('imagem')).files[0]){
      files.push((<HTMLInputElement>window.document.getElementById('imagem')).files[0]);
      files_name.push('doc1');
    }

    if (files.length > 0){
        let myUploadItem = new UploadItem(files, files_name, "posts/uploadImages/" + this.post.id);
        
        myUploadItem.formData = { FormDataKey: 'Form Data Value' };  // (optional) form data can be sent with file

        this._uploadFileService.onSuccessUpload = (item, response, status, headers) => {
              // success callback
              if (rascunho == true)
                  this.openModalRascunho();
              else 
                  this._router.navigate(['noticia/'+ this.post.id]);
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
          if (rascunho == true)
            this.openModalRascunho();
          else
            this._router.navigate(['noticia/' + this.post.id]);
  }

/////////MODAIS/////////
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

  openModalRascunho() {
      this.modalRascunho.emit({action: 'modal', params: ['open']});
  }

  closeModalRascunho(e){
      if(e){
          this.modalRascunho.emit({ action:'modal', params:['close']});
      }
  }

  //IMAGEM CADASTRO
  imgShow(e){
    if(e.target.files && e.target.files[0]){
      let reader = new FileReader();

      //console.log(target);
      reader.onload = (event:any) => {
          this.url_img = event.target.result;
      }
      //console.log(e.target);
      reader.readAsDataURL(e.target.files[0]);
    }
  }

  public editor;
  public editorContent = `<h3>I am Example content</h3>`;
  public editorToolbarOptions = [
    'bold', 
    'italic', 
    'underline', 
    'strike', 
    'blockquote', 
    { 'header': 2 }, 
    { 'list': 'ordered'}, 
    { 'list': 'bullet' },
    { 'indent': '-1'}, 
    { 'indent': '+1' },
    { 'direction': 'rtl' },
    'link',
    'image',
  ];

  public editorOptions = { 
    placeholder: "Escreva seu texto aqui...",
    modules: { 
        toolbar: this.editorToolbarOptions
    }
  };

//////////QUILL EDITOR////////////
  onEditorBlured(quill) {}

  onEditorFocused(quill) {}

  onContentChanged({ quill, html, text }) {}

  onEditorCreated(quill) {
    this.editor = quill;
  }

}
