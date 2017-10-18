import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'categoria-slider',
  templateUrl: './categoria-slider.component.html',
  styleUrls: ['./categoria-slider.component.css']
})
export class CategoriaSliderComponent implements OnInit {

  @Input('categoria') categoria: any;

  nomeCategoria;
  posts;
  constructor() {
    console.log(this.categoria)
    
   }

  ngOnInit() {
    
  }

}
