import { PostsService } from './../../services/posts.service';
import { Component, OnInit, Renderer, ElementRef, ViewChild} from '@angular/core';

@Component({
  selector: 'slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {
  sliderPosts: any = [];
  sliderPostsHTML:string = '';

  constructor(private _postServices: PostsService,
              private _elementRef: ElementRef) {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.getSliderPostsHTML();
  }


  getSliderPostsHTML(){
    this._postServices.getSliderPosts().subscribe(
      (retorno: any) => {
        //console.log(retorno);
        this.sliderPosts = retorno.posts;
        for(let p = 0; p < this.sliderPosts.length ; p++){
          this.sliderPostsHTML = this.sliderPostsHTML + ' <div class="banner"><img src="../../../assets/img/banner4.png" class="img"><div class="section"> entreterimento </div><div class="banner-title"> Chega nova temporada de House of Cards</div></div>';
        }
      });
  }

}
