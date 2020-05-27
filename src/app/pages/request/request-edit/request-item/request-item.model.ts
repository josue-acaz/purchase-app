export class RequestItem{
  itm_id: number = 0;
  itm_request_id: number = 0;

  // Inicia com o status 'Em digitação'
  // Depois que a requisição for efetivada alterar o status para 'Aguardando Aprovação Técnica'
  itm_status_id: number = 1; // Incia com o status 'ED' --> 1
  itm_pn: string = '';
  itm_quantity: number = 0;
  itm_approved_quantity: number = 0;
  itm_description: string = '';
  itm_application: string = '';
  itm_priority: string = '';
  itm_deadline: string = '';
  itm_active: boolean = true;
  itm_excluded: boolean = false;
}
