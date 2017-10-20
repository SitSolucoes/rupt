import { AdministradoresService } from './../../services/administradores.service';
import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-redefine-senha',
  templateUrl: './redefine-senha.component.html',
  styleUrls: ['./redefine-senha.component.css']
})
export class RedefineSenhaComponent implements OnInit {

  senhaValida: boolean = true;
  token_valido: boolean = true;
  erro: string;

  constructor(private _route: ActivatedRoute,
              private _adminService: AdministradoresService,
              private _router: Router) { 
    if(this._route.snapshot.params['token']){
      this._adminService.validaTokenRedefine(this._route.snapshot.params['token']).subscribe(
        (valido: any) => {
          if(!valido)
            this.token_valido = false;
            this.erro = "Link inválido, entre em contato com outro administrador";
          //setTimeout(()=> {this.openModal()},2000)
        }
      );
    }
  }

  ngOnInit() {
  }

  redefine(f){
    let token = this._route.snapshot.params['token'];
    this._adminService.redefineSenha(f, token).subscribe(
          retorno => {
              alert("Senha redefinida com sucesso! Efetue novamente o login");
              this._router.navigate(['/admin/login']);
          },
          error => {
              alert("O sistema não conseguiu realizar esta ação");
          }
      );
  }
  validaSenhas(e, f){
    if((f.value.confirma+e.key == f.value.nova_senha) || 
        (f.value.confirma+e.key == '' && 
        f.value.nova_senha == '')){
      this.senhaValida = true;
      return;
    }

    this.senhaValida = false;
  }

}
