
import {Injectable} from '@angular/core';
import formatNumber from 'accounting-js/lib/formatNumber.js'
import formatMoney from 'accounting-js/lib/formatMoney.js'

@Injectable({ providedIn: 'root'})
export class ToolsService {

    calcHour(hour1:  string, hour2: string){

        if (hour1=='' || hour1==null) return '';
        if (hour2=='' || hour2==null) return '';

        var h1: string[] = hour1.split(':');
        var h2: string[] = hour2.split(':');

        var hours = parseInt(h2[0]) -  parseInt(h1[0]);
        if (hours<0) hours += 24;

        var minutes = parseInt(h2[1]) -  parseInt(h1[1]);
        if (minutes<0){
            hours--;
            minutes+=60;
        }

        return  this.zeroPad(hours,2) + ':' + this.zeroPad(minutes,2);
    }

    convertHourToDecimal(hour: string){
        if (hour==null)
        {
            return 0;
        }

        var hr = hour.split(":");
        var h = parseInt(hr[0]);
        var m = parseInt(hr[1]);
        var mresult : number = 0;

        if (m > 3  && m <=  9) mresult = 0.1;
        if (m > 9  && m <= 15) mresult = 0.2;
        if (m > 15 && m <= 21) mresult = 0.3;
        if (m > 21 && m <= 27) mresult = 0.4;
        if (m > 27 && m <= 33) mresult = 0.5;
        if (m > 33 && m <= 39) mresult = 0.6;
        if (m > 39 && m <= 45) mresult = 0.7;
        if (m > 45 && m <= 51) mresult = 0.8;
        if (m > 51 && m <= 57) mresult = 0.9;
        if (m > 57) mresult = 1.0;

        return h + mresult;

    }

    zeroPad(num, places) {
        var zero = places - num.toString().length + 1;
        return Array(+(zero > 0 && zero)).join("0") + num;
    }

    convertDatePickerToBr(data: string){
        var data_retorno = new Date(data);
        return this.format_data_sql_br(data_retorno.toJSON());
    }

    convertDatePickerToSql(data: string){
        if (data==''){ return '' }
        if (data==null){ return '' }
        return data.split('T')[0];
    }

    format_data_br_sql(data: string){
        console.log(data);
        if (!data){ return ""; }

        if (data.indexOf("/") != -1){
            var data_split = data.split("/");
            return data_split[2] + "-" + data_split[1] + "-" + data_split[0];
        }else{
            return data;
        }
    }

    // Retorna a data e hora atual
    GetCurrentDateHour(){
      return (new Date(new Date().toString().split('GMT')[0]+' UTC').toISOString().split('.')[0]);
    }

    getDateToDatetime(data: string){
        if (!data) return '';
        var data_split = data.split("T");
        return this.format_data_sql_br(data_split[0]);
    }

    getHourToDatetime(data: string){
        if (!data) return '';
        var data_split = data.split("T");
        return data_split[1].substring(0, 5);;
    }

    format_data_sql_br(data: string) {
        if (!data){ return ''; }

        var data_split = data.split("-");
        return data_split[2].substring(0, 2) + "/" + data_split[1] + "/" + data_split[0];
    }

    format_data_dia(data: string) {
        if (!data){ return ""; }
        var data_split = data.split("-");
        return data_split[2].substring(0, 2);
    }

    show_message_erro(messages){
        let text = "";
        let i;
        if (Array.isArray(messages)) {
            for (i = 0; i < messages.length; i++) {
                text += messages[i] + "<br>";
            }
        } else {
            text = messages;
        }
        return text;
    }

    numberFormat(number, decimal, hideZero) {
        if (hideZero && parseFloat(number)==0) return '';
        return  formatNumber(number, { precision: decimal, thousand: ".", decimal: "," });
    }

    realFormat(price, blank_zero=false) {
        if (blank_zero){
            if (parseFloat(price)==0){
                return "";
            }
        }

        return  formatMoney(price, { symbol: "", precision: 2, thousand: ".", decimal: "," });
    }

    dollarFormat(price, blank_zero=false) {

        if (blank_zero){
            if (parseFloat(price)==0){
                return "";
            }
        }
        return  formatMoney(price, { symbol: "", precision: 2, thousand: ",", decimal: "." });
    }

    moneyBrToSql(numero) {
        if (numero=='') return '0';

        var res = numero.toString().replace(".", "");
        res = res.replace(".", "");
        res = res.replace(".", "");
        res = res.replace(".", "");
        res = res.replace(",", ".");
        return res;
    }

    numberToSql(numero) {
        if (numero=='') return '0';

        var res = numero.toString().replace(",", ".");
        return res;
    }

    sqlToNumber(numero) {
        if (numero=='') return '0';

        var res = numero.toString().replace(".", ",");
        return res;
    }

}
