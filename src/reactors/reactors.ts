import {Observable, Injectable} from 'angular2/angular2';
import {AuditReactor} from './audit_reactor';
import {Reactor, ReactorList} from '../core/interfaces';

@Injectable()
export class Reactors {
    reactors: ReactorList = {};

    /**
     * Save all adapters into a map so they can be easily accessed later
     */
    constructor(auditReactor: AuditReactor) {

        [auditReactor].forEach((reactor) => {
            this.reactors[reactor.name] = reactor;
        });
    }

    /**
     * Get all reactors to start listening to event bus
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
    getReactor(name: string): Reactor {
        return this.reactors[name];
    }
}
