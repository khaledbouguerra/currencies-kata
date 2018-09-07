import {Routes, RouterModule} from "@angular/router";
import {NgModule} from "@angular/core";
import {CurrencyDetailsComponent} from "./currencies/currency-details/currency-details.component";
import {CurrenciesComponent} from "./currencies/currencies.component";
import {currencyResolver} from "./helpers/resolvers/currencyResolver";
export const routes: Routes = [
    {
        path: '',
        redirectTo: 'availableCurrencies',
        pathMatch: 'full',
    },
    {
        path: 'availableCurrencies',
        component: CurrenciesComponent,
    },
    {
        path: 'currency/:id',
        component: CurrencyDetailsComponent,
        resolve: {currency: currencyResolver}
    },
    /**
     * redirect the user to availableCurrencies page when he writes a wrong url
     */
    {
        path: '**',
        redirectTo: 'availableCurrencies',
        pathMatch: 'full',
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}