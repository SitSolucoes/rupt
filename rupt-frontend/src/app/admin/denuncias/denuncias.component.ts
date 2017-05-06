import { Component, OnInit } from '@angular/core';

import { DenunciasService } from './../../services/denuncias.service';
import { Denuncia } from './../../classes/denuncia';
import { Option } from './../../shared/option';
import { Post } from './../../classes/post';
import { Admin } from './../admin';
import { Leitor } from './../../classes/leitor';
import { Motivo_Denuncia } from './../../classes/motivo_denuncia';

@Component({
  selector: 'app-denuncias',
  templateUrl: './denuncias.component.html',
  styleUrls: ['./denuncias.component.css']
})
export class DenunciasComponent implements OnInit {

  constructor(private _denunciaService: DenunciasService) { }

  ngOnInit() {
    this.getList();
  }
  selectOptions: Option[] = [
    {value: "f", name: 'Feminino'},
    {value: "m", name: 'Masculino'}
  ];

  denuncias: Denuncia[] = [];

  getList(){
    this._denunciaService.getDenuncias()
      .subscribe(
        (denuncias: any) => {
          for(let denuncia of denuncias){
            //get data to denuncia
            this.denuncias.push(new Denuncia(denuncia.id, new Post(), 
                                             this.newAdmin(), new Leitor(), 
                                             new Motivo_Denuncia(), denuncia.created_at, 
                                             denuncia.updated_at,
                                             denuncia.quantidade));
          }
            
            
        }
      );
  }

  newAdmin(){
    return {id: 0, name: '', email: '', password: '', 
            createdAt: null, UpdatedAt: null, rememberToken: null, ativo: true};
  }


}
