
export function validarCpf(obj) {
	if (!obj)
		return false;
	
	var strCPF = (obj).replace(/\D/g,'');
	var tam=(strCPF).length; 
	
	if (tam !=11 )
        return false;

    var Soma, Resto, i;
	
    Soma = 0;
	if (strCPF == "00000000000") return false;
	else if (strCPF == "11111111111") return false;
	else if (strCPF == "22222222222") return false;
	else if (strCPF == "33333333333") return false;
	else if (strCPF == "44444444444") return false;
	else if (strCPF == "55555555555") return false;
	else if (strCPF == "66666666666") return false;
	else if (strCPF == "77777777777") return false;
	else if (strCPF == "88888888888") return false;
	else if (strCPF == "99999999999") return false;
    
	for (i=1; i<=9; i++) Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (11 - i);
	Resto = (Soma * 10) % 11;
	
    if ((Resto == 10) || (Resto == 11))  Resto = 0;
    if (Resto != parseInt(strCPF.substring(9, 10)) ) return false;
	
	Soma = 0;
    for (i = 1; i <= 10; i++) Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (12 - i);
    Resto = (Soma * 10) % 11;
	
    if ((Resto == 10) || (Resto == 11))  Resto = 0;
    if (Resto != parseInt(strCPF.substring(10, 11) ) ) return false;
    return true;	
}

