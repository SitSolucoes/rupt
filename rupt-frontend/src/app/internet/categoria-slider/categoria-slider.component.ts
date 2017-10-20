import { EscritoresService } from './../../services/escritores.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'categoria-slider',
  templateUrl: './categoria-slider.component.html',
  styleUrls: ['./categoria-slider.component.css']
})
export class CategoriaSliderComponent implements OnInit {

  @Input('categoria') categoria: any;

  nomeCategoria;
  posts;/////tipo 1 = imagem com texto ///// 2 = imagem só //////// 3 = so texto
  constructor(private _escritoresService: EscritoresService) {   
   }

  ngOnInit() {
    console.log(this.categoria);  
  }

}
