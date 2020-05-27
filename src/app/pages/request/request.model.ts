
export class Request {
  req_id: number = 0;
  req_user_id: number = 1;
  req_sent_date_hour: string = '';
  req_description: string = '';
  req_application: string = '';
  req_priority: string = '';
  req_deadline: string = '';
  req_status: string = 'E';
  req_active: boolean = true;
  req_excluded: boolean = false;
}
