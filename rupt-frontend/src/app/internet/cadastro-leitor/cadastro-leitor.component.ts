import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LeitoresService } from './../../services/leitores.service';
import { Option } from './../../shared/option';
import { FormBuilder, FormGroup, Validator } from '@angular/forms';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { UploadFileService } from "./../../services/upload-file.service";
import { UploadItem } from "./../../classes/upload-item";

@Component({
  selector: 'cadastro-leitor',
  templateUrl: './cadastro-leitor.component.html',
  styleUrls: ['./cadastro-leitor.component.css']
})
export class CadastroLeitorComponent implements OnInit {

  message: any;
  form: FormGroup;
  selectOptions: Option[] = [
    {value: 'M', name: 'Masculino'},
    {value: 'F', name: 'Feminino'},
    {value: 'O', name: 'Outros'}
  ];

  constructor(private _formBuilder: FormBuilder,
    private _uploadFileService: UploadFileService,
    private _leitoresService: LeitoresService,
    private _router: Router) { }

    

  ngOnInit() {
    this.form = this._formBuilder.group({
      nome: [null, [Validators.required, Validators.minLength(3)]],
      nick: [null, [Validators.required]],
      sexo: [null, Validators.required],
      nascimento: [null, Validators.required],
      src_foto: [null],
      email: [null, [Validators.required, Validators.email]],
      senha: [null],
      confirma_senha: [null],
      ativo: true
    });
  }
  

  /*validaNick(){
    if (this.leitor.nick){
      if (this.leitor.nick.length >= 3){
        this._leitorService.validaNick(this.leitor.nick, this.leitor.id).subscribe(
          (nick: boolean) => {this.nickInvalido = nick}
        );
      }
      else
        this.nickInvalido = false;
    }
    else
        this.nickInvalido = false;
  }

  validaEmail(){
    if (this.leitor.email){
      if (this.leitor.email.length >= 6){
        this._leitorService.validaEmail(this.leitor.email, this.leitor.id).subscribe(
          (email: boolean) => {this.emailInvalido = email}
        );
      }
      else
        this.emailInvalido = false;
    }
    else
        this.emailInvalido = false;
  }*/

  onSubmit(){
      this._leitoresService.createLeitor(this.form).subscribe(
        (data: any) => {
          //this.message = response;
          //console.log(data);
          //this.uploadFiles(data);
          this.doLogin();
        },
        (error) =>{
          console.log(error);
        }
      );
  }

  sexoChange(s){
    this.form.controls['sexo'].setValue(s);
    console.log(this.form);
  }

  uploadFiles(id){
    let files = new Array();
    files.push((<HTMLInputElement>window.document.getElementById('src_foto')).files[0]);

    let myUploadItem = new UploadItem(files, "leitores/fotos_perfil/"+id);
    
    myUploadItem.formData = { FormDataKey: 'Form Data Value' };  // (optional) form data can be sent with file

    this._uploadFileService.onSuccessUpload = (item, response, status, headers) => {
          // success callback
    };
    this._uploadFileService.onErrorUpload = (item, response, status, headers) => {
          // error callback
    };
    this._uploadFileService.onCompleteUpload = (item, response, status, headers) => {
          // complete callback, called regardless of success or failure
    };
    this._uploadFileService.upload(myUploadItem);

    //this.afterSubmit("Salvo com sucesso.");
  }

  doLogin(){
    console.log(this.form);
    this._leitoresService.doLogin(this.form).subscribe(
      (ret: any) => {
        //if(ret){
          //this.fechaModal.emit(true);
        //}//redireciona pra pagina de perfil
      },  
      (error) => {
        console.log(error);
      }
    );
  }

  
  

}
