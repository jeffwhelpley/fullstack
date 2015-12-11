import {Observable, Injectable} from 'angular2/angular2';
import {UserService} from './user/user_service';
import {Service, ServiceList} from '../core/interfaces';

@Injectable()
export class Services {
    services: ServiceList = {};

    /**
     * Save all adapters into a map so they can be easily accessed later
     */
    constructor(userService: UserService) {

        let services = [
            userService
        ];

        services.forEach((service) => {
            this.services[service.name] = service;
        });
    }

    /**
     * Call init() on all services
     */
    init(): Observable<any> {

        // todo: figure out how to merge observables

        //let merged = Observable.from(true).merge;
        //
        //for (let adapter of this.adapters) {
        //    merged.merge(adapter.init());
        //}
        //
        //return merged;

        return Observable.from(true);
    }

    /**
     * Dynamically grab an service based on its name
     */
    getService(name: string): Service {
        return this.services[name];
    }
}
