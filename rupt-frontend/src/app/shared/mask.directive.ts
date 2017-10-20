import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[mask]'
})
export class MaskDirective {

  constructor() { 
  }

  @HostListener('keyup', ['$event']) 
  onKeyup($event: any) {
  }
 
  @HostListener('blur', ['$event']) 
  onBlur($event: any) {
  }
}
