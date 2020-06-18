export interface IQuoteItem
{
    id: number,
    productCode: string,
    documentSequenceCode: string,
    productName: string,
    productDescription: string,
    productQuantity: number,
    unitPrice: number,
    discount: number,
    discountInPercent: boolean,
    taxCode: string,
    taxName: string,
    taxAmount: number,
    amount: number,
    productOrder: string,
    quotationItemCode: string,
    type: string,
    availableQuantity: number,
    product: string,
    tax: string,
    customField: string
  }