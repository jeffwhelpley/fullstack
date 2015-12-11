import {Observable, Injectable} from 'angular2/angular2';
import {Adapter} from '../../core/interfaces';

@Injectable()
export class PersistAdapter implements Adapter {
    name: string = 'persist';

    create(criteria: any): Observable<any> {
        return Observable.from(true);
    }
}
