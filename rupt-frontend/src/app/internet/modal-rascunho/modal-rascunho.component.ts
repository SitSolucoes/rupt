import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LeitoresService } from './../../services/leitores.service';
import { Option } from './../../shared/option';
import { FormBuilder, FormGroup, Validator } from '@angular/forms';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { UploadFileService } from "./../../services/upload-file.service";
import { UploadItem } from "./../../classes/upload-item";

@Component({
  selector: 'modal-rascunho',
  templateUrl: './modal-rascunho.component.html',
  styleUrls: ['./modal-rascunho.component.css']
})
export class ModalRascunhoComponent implements OnInit {
    @Output('closeModal') closeModalRascunho = new EventEmitter();
    constructor(private _router: Router) { }

  ngOnInit() {
  }

    redirectRascunho(){
        this.closeModalRascunho.emit(true);
        this._router.navigate(['rascunho']);
    }

}
