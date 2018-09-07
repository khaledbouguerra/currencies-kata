import {BrowserModule} from '@angular/platform-browser';
import {NgModule, ErrorHandler} from '@angular/core';

import {AppComponent} from './app.component';
import {CurrenciesModule} from './currencies/currencies.module';
import {CurrenciesComponent} from './currencies/currencies.component';
import {CurrencyDetailsComponent} from './currencies/currency-details/currency-details.component';
import {HttpClientModule} from "@angular/common/http";
import {AppRoutingModule} from "./app-routing.module";
import {currencyResolver} from "./helpers/resolvers/currencyResolver";
import {PaginationComponent} from './widgets/pagination/pagination.component';
import {FormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {HttpHeaderInterceptor} from "./helpers/http-interceptor/http-interceptor";
import {LocationStrategy, HashLocationStrategy} from "@angular/common";
import {GlobalErrorHandler} from "./helpers/errorHandler/globalErrorHandler";

@NgModule({
    declarations: [
        AppComponent,
        CurrenciesComponent,
        PaginationComponent
    ],
    imports: [
        BrowserModule,
        CurrenciesModule,
        HttpClientModule,
        AppRoutingModule,
        FormsModule
    ],
    providers: [
        currencyResolver,
        {
            provide: LocationStrategy,
            useClass: HashLocationStrategy
        },
        {provide: HTTP_INTERCEPTORS, useClass: HttpHeaderInterceptor, multi: true},
        { provide: ErrorHandler, useClass: GlobalErrorHandler },
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
