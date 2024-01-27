export type GetOrdeItemDto = {
  name: string;

  basePrice: number;

  price: number;

  quantity: number;

  total: number;

  sku: string;
};

export class GetOrderReqItemDto {
  quantity!: number;

  productSku!: string;
}

export class GetOrderReqDto {
  items!: GetOrderReqItemDto[];

  promoCode?: string;
}

export class SubmitOrderReqDto {
  items!: GetOrderReqItemDto[];

  paymentMethod?: string;

  paymentOrderId?: string;

  promoCode?: string;
}
