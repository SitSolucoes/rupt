import { AuthService } from 'angular2-social-login/dist/auth.service';
import { Router } from '@angular/router';
import { LeitoresService } from './../../services/leitores.service';
import { FormGroup, FormBuilder, Validator, Validators } from '@angular/forms';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'modal-login',
  templateUrl: './modal-login.component.html',
  styleUrls: ['./modal-login.component.css']
})
export class ModalLoginComponent implements OnInit {
  
  @Output('closeModalLogin') closeModalLogin = new EventEmitter();
  @Output('openEsqueciSenha') openEsqueciSenha = new EventEmitter();
  
  erro: boolean;
  formulario: FormGroup;
  loading: boolean;
  mensagemErro: string;
  login_sub;

  constructor( private _auth: AuthService, private _formBuilder: FormBuilder,
              private _leitorService: LeitoresService,
              private _router: Router,) { }

  ngOnInit() {
    this.createForm();
  }
  
  signIn(p){
    this.login_sub = this._auth.login(p).subscribe(
      (data: any)=>{
        console.log(data);
        //CRIA UM FORMULARIO FICTÍCIO PRA CRIAR UM LEITOR, JÁ INSERINDO TOKEN
        let form_leitor = this.createFormLeitor(data);

        if(p == 'facebook'){
          form_leitor.patchValue({
            fb_login: true
          })
          this._leitorService.checkFBToken(data.token, data.uid).subscribe(
            (retorno) => {
              if(retorno.resultado == true){
                console.log('logando pelo facebook');
                this.doLogin(form_leitor);
                this.closeModalLogin.emit(true);
              }else{
                this._leitorService.createLeitor(form_leitor).subscribe(
                  (leitor)=>{ 
                    console.log('leitor criado e logando');
                    this.doLogin(form_leitor);
                    this.closeModalLogin.emit(true);
                  },
                  (error)=>{
                    console.log("Deu problema na criação deste usuário.");
                    console.log(typeof error);
                    console.log(error);
                  });
                //this._leitorService.createLeitor()
              }
          });
        }
        
        if(p == 'google'){
          form_leitor.patchValue({
            google_login: true
          });
          this._leitorService.checkGoogleToken(data.token, data.uid).subscribe(
            (retorno) => {
              if(retorno.resultado == true){
                console.log('logando pelo google');
                this.doLogin(form_leitor);
                this.closeModalLogin.emit(true);
              }else{
                this._leitorService.createLeitor(form_leitor).subscribe(
                  (leitor)=>{ 
                    console.log('leitor criado pelo google');
                    this.doLogin(form_leitor);
                    this.closeModalLogin.emit(true);
                  },
                  (error)=>{
                    console.log("Deu problema na criação deste usuário.");
                    console.log(typeof error);
                    console.log(error);
                  });
                //this._leitorService.createLeitor()
              }
          });
        }

      },
      (error) => {
        console.log(error);
      }
    );
  }

  doLogin(form){
    this._leitorService.doLogin(form).subscribe(
      (ret: any) => {
          //this.spinner = false;
          this._router.navigate(['/']);
      },  
    );
  }

  createFormLeitor(data){
    return this._formBuilder.group({
      id: '0',
      nome: [data.name],
      nick: [''],
      sexo: [data.gender === 'male' ? 'm' : 'f'],
      nascimento: [''],
      src_foto: [data.image],
      email: [data.email],
      fb_login: [false],
      google_login: [false],
      token: [data.token],
      uid: [data.uid],
      password: [''],
      confirma_senha: [''],
      ativo: true,
      biografia: ['']
    })
  }

  createForm(){
    this.formulario = this._formBuilder.group({
        email: ['', Validators.required],
        password: ['', Validators.required]
    })
  }

  openModalEsqSen(){
    this.openEsqueciSenha.emit(true);
  }

  onSubmit(){
    this.erro = false;
    this.loading = true;

    this._leitorService.doLogin(this.formulario).subscribe(
      (response) => { 
        this.loading = false;

        if (response[0] == false){
          this.erro = true;
          this.mensagemErro = response[1];

          this.formulario.patchValue({
            password: ''
          })
        }
        else {
          this.closeModalLogin.emit(true);

          this._router.navigate(['perfil']);
        }
      }
    )
  }

}
