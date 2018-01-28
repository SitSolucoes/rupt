import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LeitoresService } from './../../services/leitores.service';
import { Option } from './../../shared/option';
import { FormBuilder, FormGroup, Validator } from '@angular/forms';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { UploadFileService } from "./../../services/upload-file.service";
import { UploadItem } from "./../../classes/upload-item";
import { AuthService } from 'angular2-social-login/dist/auth.service';


@Component({
  selector: 'modal-cadastro-leitor',
  templateUrl: './modal-cadastro-leitor.component.html',
  styleUrls: ['./modal-cadastro-leitor.component.css']
})
export class ModalCadastroLeitorComponent implements OnInit {
  @Output('closeModal') closeModal = new EventEmitter();
  
  constructor(private _router: Router, 
              private _auth: AuthService, 
              private _leitorService: LeitoresService,
              private _fb: FormBuilder) { }

  private login_sub;
  ngOnInit() {}

  redirectCadastro(){
    this.closeModal.emit(true);
    this._router.navigate(['cadastro']);
  }

  signIn(p){
    this.login_sub = this._auth.login(p).subscribe(
      (data: any)=>{
        console.log(data);
        //CRIA UM FORMULARIO FICTÍCIO PRA CRIAR UM LEITOR, JÁ INSERINDO TOKEN
        let form_leitor = this.createFormLeitor(data);
        this._leitorService.checkFBToken(data.token, data.uid).subscribe(
          (retorno) => {
            if(retorno.resultado == true){
              this.doLogin(form_leitor);
              this.closeModal.emit(true);
            }else{
              this._leitorService.createLeitor(form_leitor).subscribe(
                (leitor)=>{ 
                  this.doLogin(form_leitor);
                  this.closeModal.emit(true);
                },
                (error)=>{
                  console.log("Deu problema na criação deste usuário.");
                  console.log(typeof error);
                  console.log(error);
                });
              //this._leitorService.createLeitor()
            }
        });
      },
      (error) => {
        console.log(error);
      }
    );
  }

  doLogin(form){
    console.log("formulário que chegou na doLogin");
    console.log(form);
    this._leitorService.doLogin(form).subscribe(
      (ret: any) => {
          //this.spinner = false;
          this._router.navigate(['/']);
      },  
    );
  }

  createFormLeitor(data){
    return this._fb.group({
      id: '0',
      nome: [data.name],
      nick: [''],
      sexo: [data.gender == 'male' ? 'm' : 'f'],
      nascimento: [''],
      src_foto: [data.image],
      email: [data.email],
      fb_login: [true],
      token: [data.token],
      fb_uid: [data.uid],
      password: [''],
      confirma_senha: [''],
      ativo: true,
      biografia: ['']
    })
  }

  fechaModal(){
      this.closeModal.emit(true);
  }



}
