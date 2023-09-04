export class Page<T> {
    content!: Array<T>;
    totalPages!: number;
    number!:number;
    size!:number;
    pageNumber!:number;
    pageSize!: number;
    pageSortField!: string;
    pageSortOrder!: string
}