import {appInjector} from '../di/app_injector';
import {Injectable} from 'angular2/angular2';

export function Api(api: any) {
    return function (classPrototype: any) {
        //classPrototype[methodName].api = opts;

        // apply Injectable as well

    };
}

export function ApiClient(api: any) {
    return function (classPrototype: any) {
        //classPrototype[methodName].api = opts;

        // apply Injectable as well

    };
}

export function ApiDefaults() {
    return function (classPrototype: any) {
        let baseUrl = '/' + classPrototype.name + 's';

        if (classPrototype.create) {
            classPrototype.create.api = { method: 'POST', url: baseUrl };
        }

        if (classPrototype.find) {
            classPrototype.find.api = { method: 'GET', url: baseUrl };
        }

        if (classPrototype.findById) {
            classPrototype.findById.api = { method: 'GET', url: baseUrl + '/{_id}' };
        }

        if (classPrototype.update) {
            classPrototype.update.api = { method: 'POST', url: baseUrl + '/{_id}' };
        }

        if (classPrototype.remove) {
            classPrototype.remove.api = { method: 'POST', url: baseUrl + '/{_id}' };
        }
    };
}

interface CollectionOpts {
    name: string;
}

export function Collection(opts: CollectionOpts) {
    return function (classPrototype: any) {
        classPrototype.db = opts;
    };
}

interface FieldOpts {
    required?: boolean;
    'enum'?: string[];
    match?: any;
    minSize?: number;
    maxSize?: number;
    'default'?: any;
}

export function field(opts: FieldOpts) {
    return function (classPrototype: any, propertyName: string) {
        classPrototype.fields = classPrototype.fields || {};
        classPrototype.fields[propertyName] = opts;
    };
}
