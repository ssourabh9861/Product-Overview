import { Content } from "./content";
import { Pageable } from "./pageable";
import { Sort } from "./sort";

export interface DataOverview {
    content: Array<Content>,
    pageable: Pageable,
    totalOpeningValuation: number,
    totalPages: number,
    totalElements: number,
    first: boolean,
    sort: Sort,
    last: boolean,
    numberOfElements: number,
    size: number,
    number: number,
    empty: boolean
    }
              
            