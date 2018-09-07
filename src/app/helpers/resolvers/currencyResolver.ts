import {Injectable} from '@angular/core';

import {Resolve} from '@angular/router';

import {ActivatedRouteSnapshot} from '@angular/router';
import {CurrenciesService} from "../../currencies/services/currencies.service";
import {map, catchError} from "rxjs/internal/operators";

@Injectable()
export class currencyResolver implements Resolve<any> {
    constructor(private currenciesService: CurrenciesService) {
    }

    resolve(route: ActivatedRouteSnapshot) {
        return this.currenciesService.getCurrencyById(route.params['id']).pipe(
            map(currency => currency),
            catchError(error => {
                throw error
            })
        )
    }
}
