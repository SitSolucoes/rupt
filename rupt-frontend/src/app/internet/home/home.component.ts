import { Component, OnInit } from '@angular/core';

declare var $: any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
              //'../../../assets/styles/materialize.css',
              //'../../../assets/styles/materialize.min.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  
  
    $(".regular").slick({
      dots: false,
      infinite: false,
      slidesToShow: 3,
      slidesToScroll: 3
    });
    $(".center").slick({
      dots: false,
      infinite: false,
      centerMode: true,

    });
    $(".variable").slick({
      dots: false,
      infinite: false,
      variableWidth: true,
    });

  }
  
}
