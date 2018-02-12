import { Component, Input, ElementRef, AfterViewInit, AfterContentInit} from '@angular/core';
declare var jQuery: any;

@Component({
  selector: 'slick-slider-mobile',
  template: `
        <ng-content></ng-content>
    `
})
export class SlickSliderMobileComponent implements AfterContentInit{
    @Input() options: any;

    $element: any;

    defaultOptions: any = {
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    constructor(private el: ElementRef) {
    }

    ngAfterContentInit() {
        this.$element = jQuery(this.el.nativeElement).slick(this.defaultOptions);
    }
}