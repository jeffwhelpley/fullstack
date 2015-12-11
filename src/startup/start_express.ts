import {Injectable} from 'angular2/angular2';
import {StartProcess} from './start_process';

@Injectable()
export class ExpressProcess implements StartProcess {
    start() {
        console.log('not yet implemented');
    }
}
