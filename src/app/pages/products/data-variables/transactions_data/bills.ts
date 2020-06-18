import { Sort } from './sort';
import { Pageable } from './pageable';
import { IBillContent } from './bills_content';

export interface IBills
{
    content: Array<IBillContent>,
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