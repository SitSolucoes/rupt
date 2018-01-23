import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LeitoresService } from './../../services/leitores.service';
import { Option } from './../../shared/option';
import { FormBuilder, FormGroup, Validator } from '@angular/forms';
import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { UploadFileService } from "./../../services/upload-file.service";
import { UploadItem } from "./../../classes/upload-item";
import { Post } from 'app/classes/post';
import { PostsService } from 'app/services/posts.service';

@Component({
  selector: 'modal-rascunho',
  templateUrl: './modal-rascunho.component.html',
  styleUrls: ['./modal-rascunho.component.css']
})
export class ModalRascunhoComponent implements OnInit {
    
    @Input() post: Post;
    @Output('closeModal') closeModalRascunho = new EventEmitter();
    
    constructor(private _router: Router,
                private _postService: PostsService) { }

    ngOnInit() {
    }

    publicar(){
        this._postService.publicar(this.post.id).subscribe(
          (response) => {
            this.closeModalRascunho.emit(true);
            this._router.navigate(['rascunho']);
          }
        )
    }

    excluir(){
        this._postService.delete(this.post.id).subscribe(
          (response) => {
            this.closeModalRascunho.emit(true);
            this._router.navigate(['rascunho']);
          }
        )
    }

}
