import {Observable} from 'angular2/angular2';
import {Service} from '../../core/interfaces';
import {User} from './user';
import {HttpAdapter} from '../../adapters/http/http_adapter';
import {ApiClient} from '../service_decorators';

export let userApi = {
    findMe: { method: 'GET', url: '/users/me' },
    find: { method: 'GET', url: '/users' }
};

@ApiClient(userApi)
export class UserService implements Service {
    name: string = 'user';

    constructor(public http: HttpAdapter) {

    }

    // used from client side to get user currently logged in
    findMe() : Observable<User> {
        return this.http.request(userApi.findMe, null);
    }

    findOne(criteria: any) : Observable<User> {
        criteria = criteria || {};
        criteria.findOne = true;        
        return this.http.request(userApi.find, criteria);
    }

    // todo: add other methods as needed
}
