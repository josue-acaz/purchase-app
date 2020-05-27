export class Message{
  msg_id: number = 0;
  msg_user_from: number = 0;
  msg_user_to: number = 0;
  msg_source_type: string = '';
  msg_source_key: number = 0;
  msg_text: string = '';
  msg_sent_date_hour: string = '';
  msg_read: boolean = false;
  msg_important: boolean = false;
  msg_excluded: boolean = false;
}
