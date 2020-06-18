import { IQuoteItem } from './quotes_item';
import { Address } from './address';
import { IQuoteContact } from './quotes_contact';

export interface IQuoteContent
{
    id: number,
    contactCode: string,
    contact: IQuoteContact
    currency: string,
    exchangeRate: number,
    quotationCode: string,
    documentSequenceCode: string,
    sequenceFormat: string,
    documentDate: string,
    fulfillmentDate: string,
    fulfillmentOn: string,
    validTillDate: string,
    closedDate: string,
    memo: string,
    unitPriceGstInclusive: boolean,
    attachments: string,
    status: string,
    fulfillmentStatus: string,
    deleted: boolean,
    tenantId: number,
    quotationItemDtoList: Array<IQuoteItem>,
    totalAmount: number,
    totalAmountInBaseCurrency: number,
    draft: string,
    shipFrom: string,
    shipTo: Address
    billTo: Address,
    shipByDate: string,
    fulfillmentType: string,
    warehouseCode: string,
    backOrder: boolean,
    linkedDocuments: string,
    contactDto: string,
    customField: string
  }