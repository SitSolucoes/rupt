import { any } from 'codelyzer/util/function';
import { DateBr } from './../../shared/dateBr';
import { Leitor } from 'app/classes/leitor';
import { ValidaCampo } from './../../shared/valida-campo';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LeitoresService } from './../../services/leitores.service';
import { Option } from './../../shared/option';
import { FormBuilder, FormGroup, Validator } from '@angular/forms';
import { Component, OnInit, EventEmitter, Output, ElementRef, ViewChild } from '@angular/core';
import { UploadFileService } from "./../../services/upload-file.service";
import { UploadItem } from "./../../classes/upload-item";
import { MaterializeAction } from 'angular2-materialize';
import { CropperSettings, ImageCropperComponent } from 'ng2-img-cropper';
import { BackgroundInputFile } from 'app/shared/background-input-file';
import { ConnectionFactory } from 'app/classes/connection-factory';

@Component({
  selector: 'cadastro-leitor',
  templateUrl: './cadastro-leitor.component.html',
  styleUrls: ['./cadastro-leitor.component.css']
})

export class CadastroLeitorComponent implements OnInit {

  //VIEW CHILDS FOR FOCUS
  @ViewChild("email") emailEl: ElementRef;
  @ViewChild("nick") nickEl: ElementRef;
  
  leitor: Leitor = new Leitor();
  form: FormGroup;
  loading: boolean = false;
  message: any;
  textButton: string = "Cadastrar";
  enviado: boolean;
  erro: boolean;
  processando: boolean = false;
  dataInvalida: boolean;
  senhaInvalida: boolean;
  emailInvalido: boolean;
  nickInvalido: boolean;
  nickRepetido: boolean;
  validaCampo: ValidaCampo = new ValidaCampo();
  validando: boolean = false;

  //para visualização de miniaturas
  url_perfil;
  url_capa;

  selectOptions: Option[] = [
    {value: 'm', name: 'Masculino'},
    {value: 'f', name: 'Feminino'},
    {value: 'o', name: 'Outros'}
  ];

  modalImagem = new EventEmitter<string|MaterializeAction>();

  cropperSettings: CropperSettings;
  data:any;
  @ViewChild('cropper', undefined)cropper:ImageCropperComponent;

  constructor(private _formBuilder: FormBuilder,
      private _uploadFileService: UploadFileService,
      private _leitoresService: LeitoresService,
      private _router: Router) { 

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
      this.cropperSettings.touchRadius = 50;
      this.cropperSettings.rounded = true;
      this.data = {};
      //this.data.image = BackgroundInputFile.bg;
  }

  ngOnInit() {
    window.scrollTo( 0, 0);

    this.createForm();

    this._leitoresService.leitor.subscribe(
      (leitor: Leitor) => { 
        this.leitor = leitor ;
        if (this.leitor.src_capa && this.leitor.src_capa != '')
          this.url_capa = 'url("'+ ConnectionFactory.API_IMAGEM + 'profile/' + this.leitor.src_capa +'")';
        if (this.leitor.src_foto && this.leitor.src_foto != ''){
          if(this.leitor.src_foto.indexOf('ttp') > 0){
            this.data.image = this.leitor.src_foto;
            this.url_perfil = 'url("' + this.leitor.src_foto + '")';
          }else{
            this.data.image = ConnectionFactory.API_IMAGEM + 'profile/' + this.leitor.src_foto+'")';
            this.url_perfil = 'url("' + ConnectionFactory.API_IMAGEM + 'profile/' + this.leitor.src_foto +'")';
          }
        }
      }
    ); 
    this._leitoresService.verificaLogin().subscribe(
      (response) => {
          if (response) {
              this.textButton = 'Editar';
              this.preencheForm();
          }            
      }
    )
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
    this.form = this._formBuilder.group({
      id: '0',
      nome: ['', [Validators.required, Validators.minLength(3)]],
      nick: ['', [Validators.required, Validators.minLength(3)]],
      sexo: ['m', Validators.required],
      nascimento: ['', [Validators.required, Validators.minLength(10)]],
      src_foto: [''],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirma_senha: [''],
      ativo: true,
      biografia: ['']
    }); 
  }
  
  preencheForm(){
    this.form.patchValue({
      id: this.leitor.id,
      nome: this.leitor.nome,
      nick: this.leitor.nick,
      sexo: this.leitor.sexo,
      nascimento: DateBr.convert(this.leitor.nascimento),
      src_foto: this.leitor.src_foto,
      src_capa: this.leitor.src_capa,
      biografia: this.leitor.biografia,
      email: this.leitor.email,
      password: 'update',
      confirma_senha: 'update',
      ativo: true,
    })
  }

  validaNick(){
    this.validando = true;
    this.nickInvalido = false;

    if (this.form.get('nick').value){
      if (this.form.get('nick').value.length >= 3){
        this._leitoresService.validaNick(this.form.get('nick').value, this.form.get('id').value).subscribe(
          (nick: boolean) => {
            this.nickRepetido = nick
            if(this.nickRepetido){
              //this.nickEl.nativeElement.focus();
            }
            else {
              var regexp = new RegExp(/[!#$%&'()*+,-./:;?@[\\\]`{|}~]/);
              let result = regexp.test(this.form.get('nick').value);
              if (result == true){
                this.nickInvalido = true;
                //this.nickEl.nativeElement.focus();
              }
            }
            
            this.validando = false;
          }
        );
      }
      else{
        this.nickRepetido = false;
        this.validando = false;
      }
    }
    else{
      this.nickRepetido = false;
      this.validando = false;
    }
  }

  validaEmail(){
    this.validando = true;
    
    if (this.form.get('email').value){
      if (this.form.get('email').value.length >= 6){
        this._leitoresService.validaEmail(this.form.get('email').value, this.form.get('id').value).subscribe(
          (email: boolean) => {
            this.emailInvalido = email;
            this.validando = false;
            /*if(this.emailInvalido == true){
              console.log('retornou true');
              this.emailEl.nativeElement.focus(); 
            }else
              console.log('retornou false nessa porra?');*/
          }
        );
      }
      else {
          this.emailInvalido = false;
          //this.emailEl.nativeElement.focus(); 
          this.validando = false;
      }
    }
    else{
        this.emailInvalido = false;
        //this.emailEl.nativeElement.focus(); 
        this.validando = false;
    }
  }

  showCapa(e){
    if(e.target.files && e.target.files[0]){
      let reader = new FileReader();

      reader.onload = (event:any) => {
        this.url_capa = 'url("'+event.target.result+'")';
      }
      
      reader.readAsDataURL(e.target.files[0]);
    }
  }

  validaData(){
      this.dataInvalida = !DateBr.valida(this.form.get('nascimento').value);
  }
  
  verificaValidTouched(campo: string){
    return this.validaCampo.verificaValidTouched(campo, this.form);
  }

  mensagemErro(campo: string){
    return this.validaCampo.mensagemErro(campo, this.form);
  }

  selectSexo(s){
    this.form.patchValue({
      sexo: s
    })
  }

  openModalImagem(){
    this.modalImagem.emit({action: 'modal', params: ['open']});
  }

  closeModalImagem(){
    this.url_perfil = this.url_perfil = 'url("'+ this.data.image +'")';;
    this.modalImagem.emit({ action:'modal', params:['close']});
  }

  clickSubmit(){
      this.erro = false;
      this.loading = true;

      setTimeout(()=>{ 
        if (this.validando == true)
          this.clickSubmit();
        else 
          this.onSubmit();
      }, 500); 
  }

  onSubmit(){
      if(this.processando)
        return;
        
      this.processando = true;

      this.validaSenhas();

      this.enviado = false;
      if (!this.form.valid){
        Object.keys(this.form.controls).forEach(campo => {
            const control = this.form.get(campo);
            control.markAsTouched();
        });
        this.erro = true;
        this.loading = false;
      }
      else if (!this.nickInvalido && !this.nickRepetido && !this.emailInvalido && !this.dataInvalida && !this.senhaInvalida){
            if (this.form.get('id').value == 0){
              if ((this.form.get('password').value == this.form.get('confirma_senha').value)){
                this._leitoresService.createLeitor(this.form).subscribe(
                  (data: any) => {
                    this.leitor.id = data;
                    this.uploadFiles(false);
                    this.processando = false;
                  }
                );
              }
            }
            else {
              this._leitoresService.updateLeitor(this.form, this.form.get('id').value).subscribe(
                (response) => { 
                  this.uploadFiles(true);
                  this.processando = false;
                })
            }
      }
      else {
        this.processando = false;
        this.erro = true;
        this.loading = false;
      }
  }

  validaSenhas(){
    if(this.form.get('password').value != this.form.get('confirma_senha').value){
      this.senhaInvalida = true;
      return true;
    }
    else{
      this.senhaInvalida = false;
      return false;
    }
  }

  uploadFiles(edit){
    let files = new Array();
    let files_name = new Array();
    
    if ((<HTMLInputElement>window.document.getElementById('foto')).files[0]){
      files.push((<HTMLInputElement>window.document.getElementById('foto')).files[0]);
      files_name.push('doc1');
    }
      
    if ((<HTMLInputElement>window.document.getElementById('capa')).files[0]){
      files.push((<HTMLInputElement>window.document.getElementById('capa')).files[0]);
      files_name.push('doc2');
      
    }

    if (files.length > 0){
        let myUploadItem = new UploadItem(files, files_name, "leitor/uploadImages/"+this.leitor.id);
        
        myUploadItem.formData = { FormDataKey: 'Form Data Value' };  // (optional) form data can be sent with file

        this._uploadFileService.onSuccessUpload = (item, response, status, headers) => {
              this._leitoresService.getLeitor(this.leitor.id).subscribe(
                (leitor) => { 
                  this.leitor = leitor; 
                  this._leitoresService.leitor.emit(leitor);
                }
              );

              // success callback
              if (!edit){
                this.loading = false;
                this.doLogin();
              }
              else{
                this.enviado = true;
                this.loading = false;
              } 
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
        if (!edit)  {
          this.loading = false;
          this.doLogin();
        }
        else {
          this.loading = false;
          this.enviado = true;
        }
  }

  doLogin(){
    this._leitoresService.doLogin(this.form).subscribe(
      (ret: any) => {
          this._router.navigate(['/']);
      },  
    );
  }
}
