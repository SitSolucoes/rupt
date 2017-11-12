import { race } from 'rxjs/operator/race';
import { Escritor } from './../../classes/escritor';
import { Component, OnInit, HostListener } from '@angular/core';

import { DenunciasService } from './../../services/denuncias.service';
import { PostsService } from './../../services/posts.service';
import { Denuncia } from './../../classes/denuncia';
import { Option } from './../../shared/option';
import { Post } from './../../classes/post';
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
    {value: "-1", name: 'Sem Motivo'},
  ];

  denuncias = [];

  //getList(){return null};
  getList(){
    this._denunciaService.getDenuncias()
      .subscribe(
        (denuncias: any) => {
          console.log(denuncias);
          this.denuncias = denuncias;
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



}
