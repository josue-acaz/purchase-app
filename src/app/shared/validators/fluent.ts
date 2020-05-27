import { AbstractControl } from '../../../../node_modules/@angular/forms';
import {Injectable} from '@angular/core';

@Injectable({ providedIn: 'root'})
export class Fluent{

  // Valida uma determinada data
  isValidDate(date){
    var notValid = false;
    var ardt = new Array;
    var expReg = new RegExp("(0[1-9]|[12][0-9]|3[01])/(0[1-9]|1[012])/[12][0-9]{3}");
    ardt = date.split("/");
    var new_date = new Date(ardt[2], ardt[1] - 1, ardt[0]);

    if(date.search(expReg) == -1)
    {
      notValid = true;
    }
    else if(((ardt[1]==4)||(ardt[1]==6)||(ardt[1]==9)||(ardt[1]==11))&&(ardt[0]>30))
    { notValid = true; }
    else if(ardt[1]==2)
    {
      if ((ardt[0]>28)&&((ardt[2]%4)!=0))
      { notValid = true; }
      if ((ardt[0]>29)&&((ardt[2]%4)==0))
      { notValid = true; }
    }
    // Verifica se a data é igual à data atual ou superior
    else if(new_date < new Date())
    {
      notValid=true;
    }

    // Verifica se a data não excede o limite de 1 ano
    var future_date = new Date();
    future_date.setFullYear(future_date.getFullYear()+1);
    if(new_date > future_date)
    {
      notValid = true;
    }

    if(notValid)
    {
      return false;
    }

    return true;
  }
}
