export enum ItemType {
  HIRE_REQUEST = 'hire_request',
  BECOME_PARTNER_REQUEST = 'become_partner_request',
  CONTRACT = 'contract',
  FEEDBACK = 'feedback',
  CUSTOMER_SERVICE = 'customer_service',
  OTHER = 'other',
}

export type GetItemDto = {
  id: string;

  title: string;

  description: number;

  type: ItemType;

  createdAt: string;

  updatedAt: string;
};
