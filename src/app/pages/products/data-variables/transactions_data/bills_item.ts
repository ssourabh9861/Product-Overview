export interface IBillItem
{
    id: number,
    productCode: string,
    productDescription: string,
    productQuantity: number,
    unitPrice: number,
    discount: number,
    discountInPercent: boolean,
    taxCode: string,
    taxAmount: string,
    tdsAccount: string,
    tdsId: string,
    tdsRate: string,
    tdsAmount: string,
    totalAmount: number,
    productOrder: string,
    purchaseInvoiceItemCode:string,
    product: string,
    tax: string,
    customField: string,
    invoiceLineNumber: string
  }