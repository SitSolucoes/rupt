import { Component, Input, ElementRef, AfterViewInit, AfterContentInit} from '@angular/core';
declare var jQuery: any;

@Component({
    selector: 'slick-slider',
    template: `
        <ng-content></ng-content>
    `
})
export class SlickSliderComponent implements AfterContentInit{
    @Input() options: any;

    $element: any;

    defaultOptions: any = {
      infinite: true,
      slidesToShow: 3,
      slidesToScroll: 3
    };

    constructor(private el: ElementRef) {
    }

    ngAfterContentInit() {
        /*for (var key in this.options) {
            this.defaultOptions[key] = this.options[key];
        }*/



        this.$element = jQuery(this.el.nativeElement).slick(this.defaultOptions);
    }
}
