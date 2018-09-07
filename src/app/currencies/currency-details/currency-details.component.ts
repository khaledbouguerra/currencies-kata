import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Title} from "@angular/platform-browser";
import {I_CURRENCY} from "../models/currencies.interface";

@Component({
    selector: 'app-currency-details',
    templateUrl: './currency-details.component.html',
    styleUrls: ['./currency-details.component.css']
})
export class CurrencyDetailsComponent implements OnInit {

    constructor(private route: ActivatedRoute, private  titleService: Title) {
    }

    currency: I_CURRENCY;

    ngOnInit() {
        /**
         * getting the currency details from the currencyResolver after  its been loaded
         * @type {Data}
         */
        let currencyDetailsResolver: any = this.route.snapshot.data;
        this.currency = currencyDetailsResolver.currency.data;

        /**
         * put the name of the currency as the title of the current page
         */
        this.titleService.setTitle(this.currency.attributes.name)
    }

}
