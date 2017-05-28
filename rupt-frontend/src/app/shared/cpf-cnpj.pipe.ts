import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cpfCnpj'
})
export class CpfCnpjPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    let cpf: string;

    if (value.length == 11){
      cpf = value.substring(0,3)+"."+value.substring(3,6)+"."+value.substring(6,9)+"-"+value.substring(9);
    }
    else {
      cpf = value.substring(0,2)+"."+value.substring(2,5)+"."+value.substring(5,8)+"/"+value.substring(8,12)+"-"+value.substring(12);
    }

    return cpf; 
  }
}
