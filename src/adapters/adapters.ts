import {Observable, Injectable} from 'angular2/angular2';
import {CacheAdapter} from './cache/cache_adapter';
import {PersistAdapter} from './persist/persist_adapter';
import {HttpAdapter} from './http/http_adapter';
import {SessionAdapter} from './session/session_adapter';
import {Adapter, AdapterList} from '../core/interfaces';

@Injectable()
export class Adapters {
    adapters: AdapterList = {};

    /**
     * Save all adapters into a map so they can be easily accessed later
     */
    constructor(cacheAdapter: CacheAdapter,
                persistAdapter: PersistAdapter,
                httpAdapter: HttpAdapter,
                sessionAdapter: SessionAdapter) {

        let adapters = [cacheAdapter, persistAdapter, httpAdapter, sessionAdapter];
        adapters.forEach((adapter) => {
            this.adapters[adapter.name] = adapter;
        });
    }

    /**
     * Call init() on all adapters
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
     * Dynamically grab an adapter based on its name
     */
    getAdapter(name: string): Adapter {
        return this.adapters[name];
    }
}
