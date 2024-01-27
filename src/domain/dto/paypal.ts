export enum PaypalOrderIntent {
  CAPTURE = 'CAPTURE',
  AUTHORIZE = 'AUTHORIZE',
}

export enum PaypalOrderStatus {
  CREATED = 'CREATED',
  SAVED = 'SAVED',
  APPROVED = 'APPROVED',
  VOIDED = 'VOIDED',
  COMPLETED = 'COMPLETED',
  PAYER_ACTION_REQUIRED = 'PAYER_ACTION_REQUIRED',
}

export interface PaypalOrderResponse {
  id: string;
  intent: PaypalOrderIntent;
  status: PaypalOrderStatus;
}

export interface PaypalOrderDataResponse {
  facilitatorAccessToken: string;
  orderID: string;
  payerID: string;
  paymentID: string;
  paymentSource: string;
}
