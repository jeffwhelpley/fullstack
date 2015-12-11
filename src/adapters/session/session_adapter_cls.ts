import {SessionAdapter} from './session_adapter';
import * as cls from 'continuation-local-storage';

export class SessionAdapterCls implements SessionAdapter {
    name: string = 'session';

    create(): any {
        return cls.createNamespace('appSession');
    }

    get(key: string): any {
        let session = cls.getNamespace('appSession');
        return session.active && session.get('caller');
    }

    set(key: string, value: any) {
        let session = cls.getNamespace('appSession');
        session.set(key, value);
    }

    remove(key: string) {
        return this.set(key, null);
    }
}
