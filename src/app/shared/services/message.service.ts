import { Injectable } from '@angular/core';
import { Message } from './message.model';
import { Observable } from 'rxjs';
import { ToolsService } from '../tools/tools.service';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  // Cria mensagem
  message: Message = new Message();
  msg_type: string;

  constructor(public toolsService: ToolsService) { }

  // Cria a mensagem
  generateMsg(
    msg_source_type: string,
    msg_source_key: number,
    msg_from: number,
    msg_to: number)
  {
    console.log("Msg_user_from: " + msg_from);
    if(msg_source_type == 'request')
    {
      this.msg_type = 'requisição';
    }

    this.message.msg_user_from = msg_from;
    console.log("Passei :)");
    this.message.msg_user_to = msg_to;
    this.message.msg_source_type = msg_source_type;
    this.message.msg_source_key = msg_source_key;
    this.message.msg_sent_date_hour = this.toolsService.GetCurrentDateHour();
    this.message.msg_text = 'Você possui uma nova '+this.msg_type+' de compra!\nSolicitado por: ' + msg_from;

    return this.message;
  }
}
