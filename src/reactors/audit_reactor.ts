import {Injectable} from 'angular2/angular2';
import {Reactor} from '../core/interfaces';

@Injectable()
export class AuditReactor implements Reactor {
    name: string = 'audit';

    react() {

    }

    cleanup() {

    }
}
