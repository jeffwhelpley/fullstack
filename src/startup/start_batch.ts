import {Observable, Injectable} from 'angular2/angular2';
import {StartProcess} from './start_process';
import {Reactors} from '../reactors/reactors';
import {Adapters} from '../adapters/adapters';
import {Services} from '../services/services';

@Injectable()
export class StartBatch implements StartProcess {

    constructor(public reactors: Reactors,
                public adapters: Adapters,
                public services: Services) { }

    start() : Observable<any> {

        // todo: merge reactors, adapters and services init

        return Observable.from(true);
    }
}
