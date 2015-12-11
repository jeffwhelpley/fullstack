import {Observable} from 'angular2/angular2';
import {HttpAdapter} from '../../adapters/http/http_adapter';
import {PersistAdapter} from '../../adapters/persist/persist_adapter';
import {ProductService, productApi} from './product_service';
import {Product} from './product';
import {Api} from '../service_decorators';

@Api(productApi)
export class ProductServiceBackend implements ProductService {
    name: string = 'user';

    constructor(public http: HttpAdapter,
                public persist: PersistAdapter) {

    }

    findOne() : Observable<Product> {

        // todo: when implement API in new stuff, use persist adapter here

        return Observable.from(null);
    }
}
