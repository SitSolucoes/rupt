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
import { Component, OnInit, EventEmitter, ViewChild } from '@angular/core';

import * as $ from 'jquery';
import { UploadItem } from 'app/classes/upload-item';
import { Post } from 'app/classes/post';
import { ValidaCampo } from 'app/shared/valida-campo';
import {ImageCropperComponent, CropperSettings} from 'ng2-img-cropper';
import { ConnectionFactory } from 'app/classes/connection-factory';

@Component({
  selector: 'app-publicacao',
  templateUrl: './publicacao.component.html',
})

export class PublicacaoComponent implements OnInit {
  categorias: Categoria[];
  erro: boolean = false;
  formulario: FormGroup;
  leitor: Leitor;
  loading: boolean = false;
  mensagemErro: string = '';
  post: Post = new Post();
  url_imagem = ConnectionFactory.API_IMAGEM;
  validaCampo: ValidaCampo = new ValidaCampo();
  
  estilos = [
    {value: 1, option: 'Imagem e Texto'},
    {value: 2, option: 'Apenas imagens'},
    {value: 3, option: 'Texto'}
  ]

  modalExcluir = new EventEmitter<string|MaterializeAction>();
  modalImagem = new EventEmitter<string|MaterializeAction>();
  modalRascunho = new EventEmitter<string|MaterializeAction>();

  cropperSettings: CropperSettings;
  data:any;
  @ViewChild('cropper', undefined)cropper:ImageCropperComponent;

  constructor(private _formBuilder: FormBuilder,
              private _leitorService: LeitoresService,
              private _router: Router,
              private _categoriaService: CategoriasService,
              private _postService: PostsService,
              private _uploadFileService: UploadFileService,
              private _activatedRoute: ActivatedRoute,
              ) {
                
      this.cropperSettings = new CropperSettings();                

      this.cropperSettings = new CropperSettings();
      this.cropperSettings.minWidth = 400;
      this.cropperSettings.minWidth = 400;
      this.cropperSettings.croppedWidth = 400;
      this.cropperSettings.croppedHeight = 400;
      //this.cropperSettings.canvasWidth = 400;
      //this.cropperSettings.canvasHeight = 400;
      this.cropperSettings.preserveSize = true;
      this.cropperSettings.cropperClass = 'canvas';
      this.cropperSettings.noFileInput = true;
      this.data = {};
  }

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

  fileChangeListener($event) {
    var image:any = new Image();
    var file:File = $event.target.files[0];
    var myReader:FileReader = new FileReader();
    var that = this;
    myReader.onloadend = function (loadEvent:any) {
        image.src = loadEvent.target.result;
        that.cropper.setImage(image);

    };

    myReader.readAsDataURL(file);
  }

  createForm(){
    this.formulario = this._formBuilder.group({
      id: '0',
      categoria_id: ['', Validators.required],
      leitor_id: [''],
      titulo: ['', Validators.required],
      conteudo: ['', Validators.required],
      adulto: '',
      tipo_post: 3,
      regiao_id: [''],
    });
  }

  getPost(){
    this._activatedRoute.params.subscribe(params => {
      if (params['id']){
        let post_id = atob(params['id']);

        this._postService.getPost(post_id).subscribe(
          (post: Post) => { 

            if (!post || post.autor.id != this.leitor.id){
              this._router.navigate(['/publicacao']);
            }
            else {
                this.post = post; 

                this.formulario.patchValue({
                  id: post.id,
                  titulo: post.titulo,
                  conteudo: post.conteudo,
                  categoria_id: post.categorias_post[0].categoria.id,
                  adulto: post.adulto == true ? true : false,
                });
            }
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

  verificaValidTouched(campo: string){
    return this.validaCampo.verificaValidTouched(campo, this.formulario);
  }

  onSubmit(){
    if (!this.formulario.valid){
      Object.keys(this.formulario.controls).forEach(campo => {
          const control = this.formulario.get(campo);
          control.markAsTouched();
          this.erro = true;
          this.mensagemErro = 'Preencha os campos em vermelho.';
      });

      var s = $(window).scrollTop();

      if (this.data.image || (this.post && this.post.src_imagem && this.post.src_imagem != ''))
        $(window).scrollTop(s + 400);
      else
        $(window).scrollTop(s + 100);
    }
    else {
      this.loading = true;
      
      //tipo 1 = imagem com texto // 2 = imagem só // 3 = so texto
      let tipo = 3;
      
      if ((<HTMLInputElement>window.document.getElementById('imagem')).files[0]){
          tipo = 1;
      }

      this.formulario.patchValue({
          tipo_post: tipo
      });

      if (!this.post.id){
          this._postService.create(this.formulario).subscribe(
            (response) => { 
              this.post = response;
              this.uploadFiles(true); 
            }
          )
      }
      else {
        this._postService.update(this.formulario).subscribe(
          (response) => { 
            this.post = response;
            if (this.post.publishedAt == null)
                this.uploadFiles(true); 
            else 
                this.uploadFiles(false);
          }
        )
      }
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
              this.loading = false;

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
      else {
          this.loading = false;

          if (rascunho == true)
              this.openModalRascunho();
          else
            this._router.navigate(['noticia/' + this.post.id]);
      }
  }

  openModalExcluir(){
    this.modalExcluir.emit({action: 'modal',params: ['open']});
  }

  closeModalExcluir(e){
    if(e){
        this.modalExcluir.emit({action:'modal',params:['close']});
        this._router.navigate(['/perfil/'+ this.leitor.nick]);
    }
  }

  openModalImagem(){
      this.modalImagem.emit({action: 'modal', params: ['open']});
  }

  closeModalImagem(){
      this.modalImagem.emit({ action:'modal', params:['close']});
  }

  openModalRascunho() {
      this.modalRascunho.emit({action: 'modal', params: ['open']});
  }

  closeModalRascunho(e){
      if(e){
          this.modalRascunho.emit({ action:'modal', params:['close']});
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
