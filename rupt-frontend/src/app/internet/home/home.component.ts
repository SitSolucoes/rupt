import { Leitor } from 'app/classes/leitor';
import { CategoriaLeitorService } from './../../services/categoria-leitor.service';
import { LeitoresService } from './../../services/leitores.service';
import { MaterializeAction } from 'angular2-materialize';
import { Component, OnInit, EventEmitter, HostListener } from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  leitor: Leitor = new Leitor();
  modalCategoria = new EventEmitter<string|MaterializeAction>();
  
  slidersProntos = 0;

  constructor(private _leitorService: LeitoresService,
              private _categoriaLeitorService: CategoriaLeitorService) {}

  ngOnInit() {
    setTimeout(()=>{
      this.openModalLoading();
    }, 1)
    this._leitorService.leitor.subscribe(
      (leitor: Leitor) => { this.leitor = leitor; }
    );

    this._leitorService.verificaLogin().subscribe(
      ( response )  => { 
          if (response && this.leitor.categoria_leitor.length == 0){
            this.openModalCategoria();
          }
       }
    )

    this.createSlick();
  }

  createSlick(){
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

  openModalCategoria() {
    this.modalCategoria.emit({
        action: 'modal',
        params: ['open']});
  }

  closeModalCategoria(e){
    if(e){
        this.modalCategoria.emit({action:"modal",params:['close']});
    }
  }

  @HostListener('window:popstate', ['$event'])
  onPopState(event) {
    this.modalCategoria.emit({action:"modal",params:['close']});
  }

  modalLoading = new EventEmitter<string|MaterializeAction>();

  openModalLoading() {
    
    this.modalLoading.emit({
         action: 'modal',
         params: ['open']});
  }

  closeModalLoading(e){
    if(e){
      this.modalLoading.emit({
        action:'modal',
        params:['close']
      });
    }
  }

  pronto(){
    
    this.slidersProntos += 1;
    if(this.slidersProntos == 2){
      this.closeModalLoading(true);
    }
  }
}
