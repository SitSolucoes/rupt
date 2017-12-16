export class CalcTime{

    private getMonthString(month){
        switch(month){
          case 0:
            return 'jan';
          case 1:
            return 'fev'  ;
          case 2:
            return 'mar';
          case 3: 
            return 'abr';
          case 4: 
            return 'mai';
          case 5: 
            return 'jun';
          case 6:
            return 'jul';
          case 7:
            return 'ago';
          case 8: 
            return 'set';
          case 9:
            return 'out';
          case 10:
            return 'nov';
          case 11:
            return 'dez';
        }
    }

    public calcTime(date){
        let t = date.split(/[- :]/);
        let result = new Date(t[0], t[1] - 1, t[2], t[3] || 0, t[4] || 0, t[5] || 0);      
    
        let today = new Date();
    
        var timeDiff = Math.abs(today.getTime() - result.getTime());
        var diffDays = (timeDiff / (1000 * 3600 * 24)); 
    
        if (diffDays < 1){
          let hour = Math.round(diffDays*24);
          if(hour < 1){
            return 'Há menos de 1 hora';

          }
          return hour.toString() + "h";
        }
        else if (diffDays <= 7){
          let day = Math.round(diffDays);
          return day.toString() + 'd';
        }
        else if (today.getFullYear == result.getFullYear){
          return result.getDate().toString() + " " + this.getMonthString(result.getMonth());
        }
        else {
          return result.getDate().toString() + " " + this.getMonthString(result.getMonth()) + ' de ' + result.getFullYear();
        }
    }
}