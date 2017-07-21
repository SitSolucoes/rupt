import { Directive, HostListener, Input, ElementRef } from '@angular/core';
import {NG_VALUE_ACCESSOR, ControlValueAccessor} from '@angular/forms';

@Directive({
  selector: '[Masks]',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: MasksDirective,
    multi: true
  }]
})
export class MasksDirective implements ControlValueAccessor{
  onTouched: any;
  onChange: any;

  @Input('Masks') mask: string;
  
  writeValue(value: any): void {
    if (value) {
      this.el.nativeElement.value = this.aplicarMascara(value);
    }
  }
 
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
 
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  ngOnInit(){}

  @HostListener('keyup', ['$event'])
  onKeyUp($event: any){
    let valor = $event.target.value.replace(/\D/g, '');
    
    //pega a posição atual do mouse
    let mouse1 = $event.target.selectionStart;
    let mouse2 = $event.target.selectionEnd;
    
    //verifica se o mouse ta no final do campo
    let final: boolean = false;
    if (valor.length <= mouse1)
      final = true;

    // retorna caso pressionado backspace
    if ($event.keyCode === 8) {
      this.onChange(valor);
      return;
    }

    let pad = this.mask.replace(/\D/g, '').replace(/9/g, '_');
    if (valor.length <= pad.length) {
      this.onChange(valor);
    }

    let valorMascara = this.aplicarMascara(valor);

    $event.target.value = valorMascara;
    
    if (final){
      console.log('no final');
      mouse1 = valorMascara.length;
      mouse2 = mouse1;
    }

    $event.target.setSelectionRange(mouse1, mouse2);
  }
  
  @HostListener('blur', ['$event'])
  onBlur($event: any){
    return;

    /*if ($event.target.value.length === this.mask.length) {
      return;
    }
    
    this.onChange('');
    $event.target.value = '';*/
  }

  /**
   * Aplica a máscara a determinado valor.
   *
   * @param string valor
   * @return string
   */
  aplicarMascara(valor: string): string {
    valor = valor.replace(/\D/g, '');
    let pad = this.mask.replace(/\D/g, '').replace(/9/g, '_');
    let valorMask = valor + pad.substring(0, pad.length - valor.length);
    let valorMaskPos = 0;
    
    valor = '';
    for (let i = 0; i < this.mask.length; i++) {
      if (isNaN(parseInt(this.mask.charAt(i)))) {
        valor += this.mask.charAt(i);
      } else {
        valor += valorMask[valorMaskPos++];
      }
    }

    if (valor.indexOf('_') > -1) {
      valor = valor.substr(0, valor.indexOf('_'));
    }

    return valor;
  }

  constructor(private el: ElementRef) { }
}
