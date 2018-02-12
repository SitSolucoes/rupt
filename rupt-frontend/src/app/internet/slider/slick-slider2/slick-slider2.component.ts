import { Component, Input, ElementRef, AfterViewInit, AfterContentInit} from '@angular/core';
declare var jQuery: any;

@Component({
    selector: 'slick-slider2',
    template: `
        <ng-content></ng-content>
    `
})
export class SlickSlider2Component implements AfterContentInit{
    @Input() options: any;

    $element: any;

    defaultOptions: any = {
        infinite: true,
        variableWidth: true
    };

    constructor(private el: ElementRef) {
    }

    ngAfterContentInit() {
        this.$element = jQuery(this.el.nativeElement).slick(this.defaultOptions);
    }
}