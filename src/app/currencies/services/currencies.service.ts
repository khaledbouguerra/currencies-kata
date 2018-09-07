import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, catchError} from "rxjs/internal/operators";

@Injectable({
    providedIn: 'root'
})
export class CurrenciesService {
    rootpath: string = 'https://api.openfintech.io/v1/currencies';

    constructor(private httpClient: HttpClient) {
    }

    /**
     * get all currencies
     * @returns {Observable<B>}
     */
    getCurrencies(pageSize, pageNumber, pageLink?) {
        let url = "https://api.openfintech.io/v1/currencies?page%5Bnumber%5D=" + pageNumber + "&page%5Bsize%5D=" + pageSize;
        return this.httpClient.get(url).pipe(
            map(res => {
                return res;
            }),
            catchError(err => {
                return err
            })
        )
    }

    /**
     * get a currency by id
     */
    getCurrencyById(id: string) {
        return this.httpClient.get(this.rootpath + '/' + id).pipe(
            map(result => {
                console.log('this is the response', result);
                return result
            }),
            catchError(error => {
                return error
            })
        )
    }
}
