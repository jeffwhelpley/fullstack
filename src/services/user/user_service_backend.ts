import {Observable} from 'angular2/angular2';
import {HttpAdapter} from '../../adapters/http/http_adapter';
import {PersistAdapter} from '../../adapters/persist/persist_adapter';
import {UserService, userApi} from './user_service';
import {User} from './user';
import {Api} from '../service_decorators';

@Api(userApi)
export class UserServiceBackend implements UserService {
    name: string = 'user';

    constructor(public http: HttpAdapter,
                public persist: PersistAdapter) {

    }

    findMe() : Observable<User> {

        // todo: when implement API in new stuff, use persist adapter here

        return Observable.from(null);
    }

    findOne() : Observable<User> {

        // todo: when implement API in new stuff, use persist adapter here

        return Observable.from(null);
    }
}
