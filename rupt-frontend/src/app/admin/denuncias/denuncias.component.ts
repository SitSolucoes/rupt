import { race } from 'rxjs/operator/race';
import { Escritor } from './../../classes/escritor';
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

  getList(){return null};
  /*getList(){
    this._denunciaService.getDenuncias()
      .subscribe(
        (denuncias: any) => {
          for(let denuncia of denuncias){
            if(denuncia.admin_idAdmin == null){
                let post: Post;
                let autor: Escritor;
                //getPost()
                this._denunciaService.getPost(denuncia.post_idPost).subscribe(
                  (p: any) =>{
                    //getEscritor()
                    this._postsService.getEscritor(p.autor_idLeitor).subscribe(
                        (data: any) => {
                        
                          //NÃO MEXA NA PORRA DO MEU CONSTRUTOR CARALHO
                          //let leitor = new Leitor(data.leitor.id, data.leitor.nome, data.leitor.nick, data.leitor.sexo, 
                                          data.leitor.nascimento, data.leitor.src_foto, data.leitor.email, data.leitor.password);
                          
                          let leitor = new Leitor();

                          console.log(data.escritor.rg);
                          let escritor = new Escritor(leitor, data.escritor.rg, data.escritor.cpf, data.escritor.src_rg, data.escritor.src_cpf,
                                                      data.escritor.src_foto, data.escritor.biografia, data.escritor.banco, data.escritor.agecia, 
                                                      data.escritor.conta_corrente, data.escritor.created_at, data.escritor.updated_at);
                          post = new Post(p.id, p.titulo, null, 
                                          escritor, p.conteudo, p.subtitulo, 
                                          p.visualizacoes, p.deleted_at, p.created_at, p.updated_at);
                          //getLeitor() // quem denunciou
                          this._denunciaService.getLeitor(denuncia.leitor_idLeitor).subscribe(
                            (ret: any) =>{
                              
                              //NÃO ALTERE A PORRA DO MEU CONSTRUTOR
                              //let relator = new Leitor(ret.id, ret.nome, ret.nick, ret.sexo, ret.nascimento, ret.src_foto, ret.email, ret.password);
                              this._denunciaService.getMotivo(denuncia.motivo_idMotivo).subscribe(
                                (mot: any) => {
                                  let motivo = new Motivo_Denuncia(mot.id, mot.motivo, mot.ativo, mot.created_at, mot.updated_at);
                                  //monta denuncia
                                  let d = new Denuncia(denuncia.id, post, 
                                                                  null, relator, 
                                                                  motivo, denuncia.created_at, 
                                                                  denuncia.updated_at,
                                                                  denuncia.quantidade);
                                  //console.log(d);                                             
                                  this.denuncias.push(d);
                                }
                              )
                              
                            }
                          )
                          
                        }
                    )
                  }
                )
              }
            }
          }
        );
  }*/

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
