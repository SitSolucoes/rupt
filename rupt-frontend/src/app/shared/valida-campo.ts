import { FormGroup } from "@angular/forms";

export class ValidaCampo {
  verificaValidTouched(campo: string, formulario: FormGroup){
      return (!formulario.get(campo).valid && formulario.get(campo).touched);
  }

  mensagemErro(campo: string, formulario: FormGroup){
    if (this.verificaValidTouched(campo, formulario)){
      if (formulario.controls[campo].errors.required)
        return 'Campo obrigatório';
      if (formulario.controls[campo].errors.minlength){
        return 'Mínimo de '+formulario.controls[campo].errors.minlength.requiredLength+" caracteres.";
      }
      return 'Campo inválido';
    }
    return '';
  }
}
