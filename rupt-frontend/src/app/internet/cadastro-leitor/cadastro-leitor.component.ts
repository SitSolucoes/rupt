import { DateBr } from './../../shared/dateBr';
import { Leitor } from 'app/classes/leitor';
import { ValidaCampo } from './../../shared/valida-campo';
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
  
  leitor: Leitor;
  form: FormGroup;
  message: any;
  textButton: string = "Cadastrar";

  dataInvalida: boolean;
  emailInvalido: boolean;
  nickInvalido: boolean;
  validaCampo: ValidaCampo = new ValidaCampo();

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
    this.createForm();

    this._leitoresService.leitor.subscribe(
      (leitor: Leitor) => { this.leitor = leitor }
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

  createForm(){
    this.form = this._formBuilder.group({
      id: '0',
      nome: [null, [Validators.required, Validators.minLength(3)]],
      nick: [null, [Validators.required, Validators.minLength(3)]],
      sexo: ["F", Validators.required],
      nascimento: [null, [Validators.required, Validators.minLength(10)]],
      src_foto: [null],
      email: [null, [Validators.required, Validators.email]],
      senha: [null, [Validators.required, Validators.minLength(6)]],
      confirma_senha: [null],
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
      senha: 'update',
      confirma_senha: 'update',
      ativo: true,
    })
  }

  validaNick(){
    if (this.form.get('nick').value){
      if (this.form.get('nick').value.length >= 3){
        this._leitoresService.validaNick(this.form.get('nick').value, this.form.get('id').value).subscribe(
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
    if (this.form.get('email').value){
      if (this.form.get('email').value.length >= 6){
        this._leitoresService.validaEmail(this.form.get('email').value, this.form.get('id').value).subscribe(
          (email: boolean) => {this.emailInvalido = email}
        );
      }
      else
        this.emailInvalido = false;
    }
    else
        this.emailInvalido = false;
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

  onSubmit(){
      if (!this.form.valid){
        Object.keys(this.form.controls).forEach(campo => {
            const control = this.form.get(campo);
            control.markAsTouched();
        })
      }
      else if ((this.form.get('senha').value == this.form.get('confirma_senha').value) &&
        !this.nickInvalido && !this.emailInvalido && !this.dataInvalida){
            if (this.form.get('id').value == 0){
                this._leitoresService.createLeitor(this.form).subscribe(
                  (data: any) => {
                    //this.uploadFiles(data);
                    this.doLogin();
                  },
                  (error) =>{
                    console.log(error);
                  }
                );
            }
            else {
                this._leitoresService.updateLeitor(this.form, this.form.get('id').value).subscribe(
                  (response) => { console.log(response) }
                )
            }
      }
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
    this._leitoresService.doLogin(this.form).subscribe(
      (ret: any) => {
          this._router.navigate(['rupt/perfil']);
      },  
    );
  }
}
