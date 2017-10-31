import { FormBuilder } from '@angular/forms';
import { PostsService } from './../../services/posts.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Validators } from '@angular/forms';

@Component({
  selector: 'modal-generico',
  templateUrl: './modal-generico.component.html',
  styleUrls: ['./modal-generico.component.css']
})
export class ModalGenericoComponent implements OnInit {

    @Output('closeModalGenerico') closeModalGenerico = new EventEmitter();

    idObj;
    action;
    
    
  constructor(private _postService: PostsService,
              private _formBuilder: FormBuilder) { }

  ngOnInit() {
    this.action = "denuncia";
    this.idObj = 2;
    if(this.action=="denuncia"){
      let id = this.idObj;
      let formDenuncia = this.montaModalDenuncia();
      this.denuncia(formDenuncia)
    }
  }

  montaModalDenuncia(){
    return this._formBuilder.group({
      id: '0',
    }); 
  }

  denuncia(f){

  }
}
