import { Directive, HostListener, Input, ElementRef, OnInit, EventEmitter, Output } from '@angular/core';


const placeholders = {
  'A': '^[a-zA-ZA-zА-яЁё]',
  '9': '\\d'
};


interface IState {
  value: string;
}

@Directive({
  selector: '[Masks]'
})
export class MasksDirective implements OnInit {

  private state: IState;

  @Input() mask: any;
  @Output() ngModelChange = new EventEmitter();

  /**
   *
   * @param element
   * @param model
   */
  constructor(private element: ElementRef) {
    this.state = {
      value: this.getValue()
    };
  }


  /**
   *
   */
  @HostListener('ngModelChange')
  public onChange(): void {
    this.applyMask(this.getClearValue(this.getValue()));
  }

  /**
   *
   * @param event
   */
  @HostListener('keypress', ['$event'])
  public onKeyPress(event): void {
    const cursorPosition = this.getCursorPosition();
    let regexp = this.createRegExp(cursorPosition);
    if(regexp != null && !regexp.test(event.key) || this.getValue().length >= this.mask.length) {
      event.preventDefault();
    }
  }

  /**
   *
   * @param event
   */
  @HostListener('keydown', ['$event'])
  public onKeyDown(event): void {
    const key = event.keyCode || event.charCode;
    if((key == 8 || key == 46) && this.getClearValue(this.getValue()).length === 1) {
      this.setValue('');
      this.state.value = '';
      this.ngModelChange.emit('');
    }
  }

  /**
   *
   */
  public ngOnInit(): void {
    this.applyMask(this.getClearValue(this.getValue()));
  }

  /**
   *
   * @param value
   */
  private applyMask(value): void {
    let newValue = '';
    let maskPosition = 0;
    if(value){
      if (this.getClearValue(value).length > this.getClearValue(this.mask).length) {
        this.setValue(this.state.value);
        return;
      }
      for (let i = 0; i < value.length; i++) {
        let current = value[i];

        let regexp = this.createRegExp(maskPosition);
        if (regexp != null) {
          if (!regexp.test(current)) {
            this.setValue(this.state.value);
            break;
          }
          newValue += current;
        } else if (this.mask[maskPosition] === current) {
          newValue += current;
        } else {
          newValue += this.mask[maskPosition];
          i--;
        }

        maskPosition++;
      }
      const nextMaskElement = this.mask[maskPosition];
      if (value.length && nextMaskElement != null && /^[-\/\\^$#&@№:<>_\^!*+?.()|\[\]{}]/.test(nextMaskElement)) {
        newValue += nextMaskElement;
      }

      const oldValue = this.state.value;
      const cursorPosition = this.getCursorPosition();
      this.setValue(newValue);
      this.state.value = newValue;

      if (oldValue.length >= cursorPosition) {
        this.setCursorPosition(cursorPosition);
      }
    }
  }

  /**
   *
   * @param position
   * @returns {any}
   */
  private createRegExp(position): RegExp | null {
    if (this.mask[position] == null) {
      return null;
    }

    const currentSymbol = this.mask[position].toUpperCase();
    const keys = Object.keys(placeholders);
    const searchPosition = keys.indexOf(currentSymbol);
    if (searchPosition >= 0) {
      return new RegExp(placeholders[keys[searchPosition]], 'gi');
    }
    return null;
  }


  /**
   *
   * @returns {any}
   */
  private getValue(): string {
    return this.element.nativeElement.value;
  }

  /**
   *
   * @param value
   * @returns {string}
   */
  private getClearValue(value): string {
    if(value)
      return value.trim().replace(/[-\/\\^$#&@№:<>_\^!*+?.()|\[\]{}]/gi, '');
  }

  /**
   *
   * @param value
   */
  private setValue(value: string): void {
    this.element.nativeElement.value = value;
  }

  /**
   *
   * @returns {number}
   */
  private getCursorPosition(): number {
    return this.element.nativeElement.selectionStart;
  }

  /**
   *
   * @param start
   * @param end
   */
  private setCursorPosition(start: number, end: number = start): void {
    this.element.nativeElement.setSelectionRange(start, end);
  }

}




































/*import { Directive, HostListener, Input, ElementRef } from '@angular/core';
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
    $event.target.value = '';
  }

  /**
   * Aplica a máscara a determinado valor.
   
    @param string valor
    @return string
   
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
*/