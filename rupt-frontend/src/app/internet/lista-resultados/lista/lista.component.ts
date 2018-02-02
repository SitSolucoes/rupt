import { Component, OnInit, Input } from '@angular/core';
import { Post } from 'app/classes/post';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit {

  @Input() search: string;
  @Input() posts: Post[];

  XXX: string = 'teste<br>';

  constructor() { }

  ngOnInit() {
  }

}
