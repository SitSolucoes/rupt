import { LeitoresService } from './../../services/leitores.service';
import { Option } from './../../shared/option';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { UploadFileService } from "./../../services/upload-file.service";
import { UploadItem } from "./../../classes/upload-item";

@Component({
  selector: 'modal-cadastro-leitor',
  templateUrl: './modal-cadastro-leitor.component.html',
  styleUrls: ['./modal-cadastro-leitor.component.css']
})
export class ModalCadastroLeitorComponent implements OnInit {

  ;
  form: FormGroup;
  selectOptions: Option[] = [
    {value: 'M', name: 'Masculino'},
    {value: 'F', name: 'Feminino'},
    {value: 'O', name: 'Outros'}
  ];
  message: any;
  constructor(private _formBuilder: FormBuilder,
              private _uploadFileService: UploadFileService,
              private _leitoresService: LeitoresService) { }

  ngOnInit() {
    this.form = this._formBuilder.group({
      nome: [null],
      nick: [null],
      sexo: [null],
      nascimento: [null],
      src_foto: [null],
      email: [null],
      senha: [null],
      ativo: true
    });
  }

  onSubmit(){
      this._leitoresService.createLeitor(this.form).subscribe(
        (data: any) => {
          //this.message = response;
          
          this.uploadFiles(data);

        },
        (error) =>{
          console.log(error);
        }
      );
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
  
}
