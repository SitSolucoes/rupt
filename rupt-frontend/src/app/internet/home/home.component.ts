import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css',
              './../../../assets/slick/slick.css',
              './../../../assets/slick/slick-theme.css']
              //'./styles/materialize.css',
              //'./styles/materialize.min.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  
  metodo(){alert("entrou no método")}
}
