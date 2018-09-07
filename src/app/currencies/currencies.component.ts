import {Component, OnInit} from '@angular/core';
import {CurrenciesService} from "./services/currencies.service";
import {Router} from "@angular/router";
import {I_CURRENCY} from "./models/currencies.interface";

@Component({
    selector: 'app-currencies',
    templateUrl: 'currencies.component.html',
    styleUrls: ['currencies.component.css']
})
export class CurrenciesComponent implements OnInit {
    title = 'Available currencies';
    currencies: Array<I_CURRENCY> = [];
    total: number;
    limit: number = 10;
    pages: number = 0;
    currentPage: number = 1;
    lastPageLink: string;
    firstPageLink: string;
    filterValue: string = 'id';
    searchInput: string = '';
    data:Array<I_CURRENCY>=[];
    loading: boolean = false;

    constructor(private currenciesService: CurrenciesService, private router: Router) {
    }

    ngOnInit() {
        /**
         * calling this.getCurrencies to load the currencies after the page is initiated
         */
        this.getCurrencies()
    }

    /**
     * load currencies list
     */
    getCurrencies(): void {
        this.loading = true;
        console.log('getting currencies again', this.limit);
        this.currenciesService.getCurrencies(this.limit, this.currentPage)
            .subscribe((result: any) => {
                    this.currencies = result.data;
                    this.total = result.meta.total;
                    console.log('this is the total', this.total);
                    console.log('this is the result', this.currencies);
                    this.pages = result.meta.pages;
                    this.firstPageLink = result.links.first;
                    this.lastPageLink = result.links.last;
                    /**
                     * this.data will be used to filter the value and not loose the previous value so we filter from this.data instead of this.currencies
                     */
                    this.data = result.data;
                    this.loading = false;
                },
                error => {
                    console.log('oops somthing happend', error);
                    throw new error(error)
                })
    }

    /**
     * redirect the user to the specified currency page
     * @param id
     */
    goToDetailsPage(id): void {
        this.router.navigate(['/currency', id])
    }

    /**
     * paginate to the next page
     */
    onNext(e): void {
        console.log('this is the event onNext', e);
        this.currentPage++;
        this.getCurrencies();
    }

    /**
     * paginate to the previous page
     */
    onPrev(e): void {
        console.log('this is the event onPrev', e);
        this.currentPage--;
        this.getCurrencies();
    }

    /**
     * paginating to the first page
     * @param e
     */
    goToFirstPage(e): void {
        console.log('this is the event', e);
        this.getCurrencies();
    }

    /**
     * navigate to the last page
     * @param e
     */
    goToLastPage(e) {
        console.log('paginating to the last page', e);
        this.getCurrencies();
    }

    /**
     * navigate to a page => we change the pageIndex and call getCurrencies again
     * @param pageIndex
     */
    goToPage(pageIndex) {
        this.currentPage = pageIndex;
        console.log('this is the current page', this.currentPage);
        this.getCurrencies();
    }

    /**
     * we change the value of the limit and we call getCurrencies to load the currencies again with the new limit
     * @param e
     */
    selectLimit(e: number) {
        console.log('here we are selecting a limit', e);
        this.limit = e;
        this.getCurrencies();
    }

    /**
     * function executed when when we change the filter value ( from id to name)
     * @param value
     */
    onFilterChange(value) {
        /**
         * initialising the searchinput variable
         * @type {string}
         */
        this.searchInput = '';
        this.filterValue = value;


    }

    /**
     * function executed when we change write into the filter
     * @param e
     */
    onValueChange(e) {
        /**
         * if condiftion to test if the filter value is inside the attributes object or outside it
         * @type {promise.Promise<T[]>|Int16Array|string|Uint32Array|Uint8ClampedArray|T[]|any}
         */
        if (this.filterValue === 'id' || this.filterValue == 'type') {
            this.currencies = this.data.filter(item => item[this.filterValue].toLowerCase().indexOf(e.toLocaleLowerCase()) > -1)
        }
        else {
            this.currencies = this.data.filter(item => item.attributes[this.filterValue].toLowerCase().indexOf(e.toLocaleLowerCase()) > -1)
        }

    }


}
