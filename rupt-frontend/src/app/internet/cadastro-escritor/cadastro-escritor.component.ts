import { ConnectionFactory } from './../../classes/connection-factory';
import { DateBr } from 'app/shared/dateBr';
import { ValidaCampo } from './../../shared/valida-campo';
import { EscritoresService } from './../../services/escritores.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LeitoresService } from './../../services/leitores.service';
import { Component, OnInit } from '@angular/core';
import { Leitor } from 'app/classes/leitor';
import { Router } from '@angular/router';
import { Option } from 'app/shared/option';
import { Bancos } from 'app/shared/arrayBanco';
import { Estados } from 'app/shared/arrayEstados';
import { validarCpf } from 'app/shared/valida-cpf';
import { Http } from '@angular/http';
import { UploadFileService } from 'app/services/upload-file.service';
import { UploadItem } from 'app/classes/upload-item';

@Component({
  selector: 'app-cadastro-escritor',
  templateUrl: './cadastro-escritor.component.html',
  styleUrls: ['./cadastro-escritor.component.css']
})
export class CadastroEscritorComponent implements OnInit {
  
  cpfInvalido: boolean;
  cpfUsado: boolean;
  erro: boolean;
  processando: boolean = false;
  leitor: Leitor = new Leitor();
  loading: boolean;
  page: number = 1;
  salvo: boolean;
  validaCampo: ValidaCampo = new ValidaCampo();
  validando: boolean;
  url = ConnectionFactory.API_IMAGEM + 'docs/';

  formulario: FormGroup;
  selectBancos: Option[] = Bancos;
  selectEstados: Option[] = Estados;

  constructor(private _leitorService: LeitoresService, 
              private _escritorService: EscritoresService,
              private _router:Router,
              private _formBuilder: FormBuilder,
              private _http: Http,
              private _uploadFileService: UploadFileService) { }

  ngOnInit() {
      window.scrollTo( 0, 0);

      this.createForm();

      this._leitorService.leitor.subscribe(
        (leitor: Leitor) => { 
          this.leitor = leitor; 
        }
      );

      this._leitorService.verificaLogin().subscribe(
          (response) => { 
            if (!response){
              this._router.navigate(['/']);
            }
            else{
              this.formulario.patchValue({
                id: this.leitor.id,
                nome: this.leitor.nome,
                nick: this.leitor.nick,
                email: this.leitor.email,
                nascimento: DateBr.convert(this.leitor.nascimento),
                sexo: this.leitor.sexo,
                ativo: this.leitor.ativo
              });

              if (this.leitor.escritor){
                this.formulario.patchValue({
                  rg: this.leitor.escritor.rg,
                  cpf: this.leitor.escritor.cpf,
                  telefone: this.leitor.escritor.telefone,
                  celular: this.leitor.escritor.celular,
                  cep: this.leitor.escritor.cep,
                  logradouro: this.leitor.escritor.logradouro,
                  numero: this.leitor.escritor.numero,
                  complemento: this.leitor.escritor.complemento,
                  cidade: this.leitor.escritor.cidade,
                  bairro: this.leitor.escritor.bairro,
                  uf: this.leitor.escritor.uf,
                  banco: this.leitor.escritor.banco,
                  agencia: this.leitor.escritor.agencia,
                  conta_corrente: this.leitor.escritor.conta_corrente,
                  status: this.leitor.escritor.status
                });

                if (this.leitor.escritor.status == 'a'){
                  this.formulario.controls.rg.disable();
                  this.formulario.controls.cpf.disable();
                }
              }
            }
          }
      );
  }

  createForm(){
    this.formulario = this._formBuilder.group({
        id: '0',
        nome: '',
        nick: '',
        email: '',
        $date: '',
        nascimento: '',
        sexo: '',
        ativo: '',
        rg: ['', [Validators.required, Validators.minLength(8)]],
        cpf: ['', [Validators.required]],
        telefone: ['', Validators.minLength(14)],
        celular: ['', Validators.minLength(14)],
        cep: ['', [Validators.required, Validators.minLength(9)]],
        logradouro: [''],
        numero: [''],
        complemento: [''],
        cidade: [''],
        bairro: [''],
        uf: [''],
        banco: [''],
        agencia: [''],
        conta_corrente: [''],
        status: 'p'
    });
  }

  verificaValidTouched(campo: string){
    return this.validaCampo.verificaValidTouched(campo, this.formulario);
  }

  mensagemErro(campo: string){
    return this.validaCampo.mensagemErro(campo, this.formulario);
  }

  next(){
    this.page ++;
  }

  prev(){
    this.page --;
  }

  validaCpf(){
    this.cpfUsado = false;
    this.cpfInvalido = false;
    this.validando = true;

    if (this.formulario.get('cpf').value){
      let cpf = this.formulario.get('cpf').value.replace(/\D/g,'');

      if (cpf.length == 11){
        this.cpfInvalido = !validarCpf(cpf);

        if (!this.cpfInvalido){
          this._escritorService.existCpf(cpf, this.formulario.get('id').value).subscribe(
            (cpfUsado: boolean) => {
              this.cpfUsado = cpfUsado;
              this.validando = false;
            }
          );
        }
        else {
          this.validando = false;
        }
      }
      else {
        this.cpfUsado = false;
        this.cpfInvalido = true;
        this.validando = false;
      }
    }
    else {
        this.cpfUsado = false;
        this.validando = false;
    }
      
  }

  consultaCep(){
    if (this.formulario.get('cep').value){
      let cep = this.formulario.get('cep').value.replace(/\D/g, '');

      if (cep != ''){
        let validaCep = /^[0-9]{8}$/;

        if (validaCep.test(cep)){
          this._http.get("//viacep.com.br/ws/"+cep+"/json")
            .map(dados => dados.json())
            .subscribe(dados => {
              this.formulario.patchValue({
                logradouro: dados.logradouro,
                bairro: dados.bairro,  
                cidade: dados.localidade,
                uf: dados.uf,
              })
          });
        }
      }
    }
  }

  onSubmit(){
    if(this.processando)
      return;

    this.processando = true;

    this._escritorService.createEscritor(this.formulario, this.leitor.id, false).subscribe(
      (response) => { 
        this.uploadFiles(false);
        this.processando = false;
      },
      error =>{
        this.processando = false;
      }
    )
  }

  clickSubmitEditar(){
    this.erro = false;
    this.loading = true;

    setTimeout(()=>{ 
      if (this.validando == true)
        this.clickSubmitEditar();
      else 
        this.onSubmitEditar();
    }, 500); 
  }

  onSubmitEditar(){
  if(this.processando)
    return;

  this.processando = true;

    this.salvo = false;

    if (!this.formulario.valid || this.cpfInvalido || this.cpfUsado){
      Object.keys(this.formulario.controls).forEach(campo => {
          const control = this.formulario.get(campo);
          control.markAsTouched();
      });
      this.erro = true;
      this.loading = false;
    }
    else {
        //como o campo ta disable na tela, pode ter algum espertão que libere o campo pelo f12 e edite o campo,
        //e como depois de aceito não pode mais mudar os dados, isso ta aqui pra garantir que não vai mudar
        if (this.leitor.escritor.status == 'a'){
          this.formulario.controls.rg.enable();
          this.formulario.controls.cpf.enable();
          
          this.formulario.patchValue({
            rg: this.leitor.escritor.rg,
            cpf: this.leitor.escritor.cpf,
            status: this.leitor.escritor.status
          });
        };

        this._escritorService.updateEscritor(this.formulario, this.leitor.id).subscribe(
          (response) => { 
            if (this.leitor.escritor.status == 'a'){
              this.formulario.controls.rg.disable();
              this.formulario.controls.cpf.disable();
              this.salvo = true; 
              this.processando = false;
              this.loading = false;
            }
            else {
                this.processando = false;
                this.uploadFiles(true);
            }
          }
        )
    }
  }

  uploadFiles(upload){
      let files = new Array();
      let files_name = new Array();

      if ((<HTMLInputElement>window.document.getElementById('doc1')).files[0]){
          files.push((<HTMLInputElement>window.document.getElementById('doc1')).files[0]);
          files_name.push('doc1');
      }
      if ((<HTMLInputElement>window.document.getElementById('doc2')).files[0]){
          files.push((<HTMLInputElement>window.document.getElementById('doc2')).files[0]);
          files_name.push('doc2');
      }
      if ((<HTMLInputElement>window.document.getElementById('doc3')).files[0]){
          files.push((<HTMLInputElement>window.document.getElementById('doc3')).files[0]);
          files_name.push('doc3');
      }

      if (files.length > 0){
          let myUploadItem = new UploadItem(files, files_name, "escritor/uploadDocs/"+this.leitor.id);
          
          myUploadItem.formData = { FormDataKey: 'Form Data Value' };  // (optional) form data can be sent with file

          this._uploadFileService.onSuccessUpload = (item, response, status, headers) => {
                // success callback
                this.loading = false;

                if(!upload)
                  this._router.navigate(['perfil']);
                else 
                  this.salvo = true; 
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
        if(!upload)
          this._router.navigate(['perfil']);
        else 
          this.salvo = true; 
      }
  }

}
