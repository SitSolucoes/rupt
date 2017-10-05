import { PostsService } from './../../services/posts.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {

  sliderPosts: any[];

  constructor(private _postServices: PostsService) {   

    this.getSliderPosts();
  }

  ngOnInit() {
  }

  getSliderPosts(){
    this._postServices.getSliderPosts().subscribe(
      (retorno: any) => {
        this.sliderPosts = retorno.posts;
      });
  }

}
