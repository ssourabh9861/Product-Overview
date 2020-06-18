import { Sort } from './sort';
import { Pageable } from './pageable';
import { IInvoiceContent } from './invoice_content';

export interface IInvoice
{
    content: Array<IInvoiceContent>,
    pageable: Pageable,
    totalElements: number,
    totalPages: number,
    last: boolean,
    first: boolean,
    sort: Sort
    numberOfElements: number,
    size: number,
    number: number,
    empty: boolean
  }