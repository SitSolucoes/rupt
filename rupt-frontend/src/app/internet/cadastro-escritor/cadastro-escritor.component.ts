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

@Component({
  selector: 'app-cadastro-escritor',
  templateUrl: './cadastro-escritor.component.html',
  styleUrls: ['./cadastro-escritor.component.css']
})
export class CadastroEscritorComponent implements OnInit {
  
  cpfInvalido: boolean;
  cpfUsado: boolean;
  leitor: Leitor = new Leitor();
  page: number = 1;
  validaCampo: ValidaCampo = new ValidaCampo();

  formulario: FormGroup;
  selectBancos: Option[] = Bancos;
  selectEstados: Option[] = Estados;

  constructor(private _leitorService: LeitoresService, 
              private _escritorService: EscritoresService,
              private _router:Router,
              private _formBuilder: FormBuilder,
              private _http: Http) { }

  ngOnInit() {
      this.createForm();

      this._leitorService.leitor.subscribe(
        (leitor: Leitor) => { this.leitor = leitor }
      );

      this._leitorService.verificaLogin().subscribe(
          (response) => { 
             if (!response)
              this._router.navigate(['/']);
          }
      );
  }

  createForm(){
    this.formulario = this._formBuilder.group({
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
    })
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
    if (this.formulario.get('cpf').value){
      let cpf = this.formulario.get('cpf').value.replace(/\D/g,'');

      if (cpf.length == 11){
        this.cpfInvalido = !validarCpf(cpf);

        if (!this.cpfInvalido){
          this._escritorService.existCpf(cpf, 0).subscribe(
            (cpfUsado: boolean) => {
              this.cpfUsado = cpfUsado;
            }
          );
        }
      }
      else {
        this.cpfUsado = false;
        this.cpfInvalido = true;
      }
    }
    else
      this.cpfUsado = false;
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

}
