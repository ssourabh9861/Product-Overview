export interface IOrderItem
{
    id: number,
    accountCode: string,
    productCode: string,
    productDescription: string,
    productQuantity: number,
    unitPrice: number,
    discount: number,
    discountInPercent: string,
    taxAmount: string,
    taxCode: string,
    totalAmount: number,
    productOrder: string,
    purchaseOrderItemCode: string,
    customField: string,
    product: string,
    tax: string
  }