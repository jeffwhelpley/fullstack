import {Injectable} from 'angular2/angular2';
import {SessionAdapter} from './session_adapter';
import {LocalStorage} from '../../core/window';

@Injectable()
export class SessionAdapterLocalStorage implements SessionAdapter {
    name: string = 'session';

    constructor(public localStorage: LocalStorage) {

    }

    create(): any {
        // no create needed for localStorage
    }

    // todo: get from cookie as fallback (for social auth)

    get(key: string): any {
        try {
            return this.localStorage.getItem(key);
        } catch (ex) {
            return null;
        }
    }

    set(key: string, value: any) {
        try {
            this.localStorage.setItem(key, value);
        } catch (ex) { }
    }

    remove(key: string) {
        try {
            this.localStorage.removeItem(key);
        } catch (ex) { }
    }
}
