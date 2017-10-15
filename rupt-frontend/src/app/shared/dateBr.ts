export class DateBr{
    static mask(date){
        if (date.length == 2 || date.length == 5)
            date += "/";
        return date;
    }

    static convert(date){
        if (date && !date.includes("/"))
            date = date.substring(8,10)+"/"+date.substring(5,7)+"/"+date.substring(0,4);
    
        return date;
    }

    static valida(date) {
        var ardt=new Array;
        var ExpReg=new RegExp("(0[1-9]|[12][0-9]|3[01])/(0[1-9]|1[012])/[12][0-9]{3}");
        ardt = date.split("/");
        var erro = false;
        
        if ( date.search(ExpReg)==-1)
            erro = true;
        else if (((ardt[1]==4)||(ardt[1]==6)||(ardt[1]==9)||(ardt[1]==11))&&(ardt[0]>30))
            erro = true;
        else if ( ardt[1]==2) {
            if ((ardt[0]>28)&&((ardt[2]%4)!=0))
                erro = true;
            if ((ardt[0]>29)&&((ardt[2]%4)==0))
                erro = true;
        }
        if (erro)
            return false;
        return true;
    }
}