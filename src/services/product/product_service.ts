import {Observable} from 'angular2/angular2';
import {Service} from '../../core/interfaces';
import {Product} from './product';
import {HttpAdapter} from '../../adapters/http/http_adapter';
import {ApiClient} from '../service_decorators';

export let productApi = {
    find: { method: 'GET', url: '/products' }
};

@ApiClient(productApi)
export class ProductService implements Service {
    name: string = 'product';

    constructor(public http: HttpAdapter) {

    }

    findOne(criteria: any) : Observable<Product> {
        criteria = criteria || {};
        criteria.findOne = true;        
        return this.http.request(productApi.find, criteria);
    }

    // todo: add other methods as needed
}
