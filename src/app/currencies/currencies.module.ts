import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {CurrenciesService} from "./services/currencies.service";
import {CurrencyDetailsComponent} from "./currency-details/currency-details.component";


@NgModule({
    declarations: [
        CurrencyDetailsComponent
    ],
    imports: [
        BrowserModule
    ],
    providers: [CurrenciesService],

})
export class CurrenciesModule {
}
