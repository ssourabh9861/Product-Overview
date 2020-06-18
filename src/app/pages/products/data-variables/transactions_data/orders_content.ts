import { IQuoteContact } from './quotes_contact'
import { IOrderItem } from './orders_item';

export interface IOrderContent
{
    "vendorCode": string,
    "currencyCode": string,
    "contact": IQuoteContact,
    "deliveryDate": string,
    "documentDate": string,
    "dueDate": string,
    "exchangeRate": number,
    "memo": string,
    "orderType": string,
    "unitPriceGstInclusive": boolean,
    "attachments": string,
    "totalAmount": number,
    "openingOrder": boolean,
    "linkedDocuments": Array<string>,
    "status": string,
    "purchaseOrderItems": Array<IOrderItem>,
    "dropShip": boolean,
    "attachmentIds": string,
    "warehouseCode": string,
    "backOrder": boolean,
    "receiptStatus": string,
    "id": number,
    "poCode": string,
    "billed": boolean,
    "draft": boolean,
    "pendingReceipt": boolean,
    "shipFrom": string,
    "shipTo": string,
    "billTo": string,
    "customField": string,
    "documentSequenceCode": string,
    "contactDto": string,
    "totalAmountInBaseCurrency": number
  }

  