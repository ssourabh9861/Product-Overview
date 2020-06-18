export interface IInvoiceItem
{
    id: number,
    productCode: string,
    documentSequenceCode: string,
    productDescription: string,
    productQuantity: number,
    unitPrice: number,
    discount: number,
    discountInPercent: string,
    taxCode: string,
    taxAmount: number,
    totalAmount: number,
    productOrder: string,
    salesInvoiceItemCode: string,
    type: string,
    availableQuantity: string,
    product: string,
    tax: string,
    customField: string,
    invoiceLineNumber: string
  }