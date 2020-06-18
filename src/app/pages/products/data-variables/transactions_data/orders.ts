import { Pageable } from './pageable';
import { Sort } from './sort';
import { IOrderContent } from './orders_content';

export interface IOrders
{
    content: Array<IOrderContent>,
    pageable: Pageable,
    totalElements: number,
    totalPages: number,
    last: boolean,
    first: boolean,
    sort: Sort,
    numberOfElements: number,
    size: number,
    number: number,
    empty: boolean
  }