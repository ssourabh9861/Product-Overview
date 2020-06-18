import { Sort } from './sort';
import { Pageable } from './pageable';
import { IQuoteContent } from './quotes_content';

export interface IQuotes
{   content : Array<IQuoteContent>,
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