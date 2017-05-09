import { Component, OnInit } from '@angular/core';

import { DenunciasService } from './../../services/denuncias.service';
import { PostsService } from './../../services/posts.service';
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

  constructor(private _denunciaService: DenunciasService,
              private _postsService: PostsService) { }

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
            //get Leitor
            //get Post
            let post: Post;
            this._denunciaService.getPost(denuncia.post_idPost).subscribe(
              (p: any) =>{
                console.log(p[0].conteudo);
                post = p[0];
                //getEscritor
                //this._postsService.getEscritor().subscribe(
                //  (e: any) => {

                //  }
                //)
                console.log(post);
                //getAdmin
                //monta denuncia
                let d = new Denuncia(denuncia.id, post, 
                                                this.newAdmin(), new Leitor(), 
                                                new Motivo_Denuncia(), denuncia.created_at, 
                                                denuncia.updated_at,
                                                denuncia.quantidade);
                console.log(d);                                             
                this.denuncias.push(d);
              }
            );
            
          }
        }
      );
  }

  getPost(id): Post{
    console.log('antes');
    let post: Post;
    this._denunciaService.getPost(id).subscribe(
              (p: any) =>{
                post = p[0];
                console.log(post);
                console.log('tinha que ser entre');
              }
            );
    //console.log(post);
    return post;
  }

  newAdmin(){
    return {id: 0, name: '', email: '', password: '', 
            createdAt: null, UpdatedAt: null, rememberToken: null, ativo: true};
  }


}
