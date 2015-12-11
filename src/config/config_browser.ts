import {Injectable} from 'angular2/angular2';
import {Window} from '../core/window';

@Injectable()
export class ConfigBrowser {
    environment: string;
    apiBaseUrl: string;

    // during initialization, get the config values from the DOM
    constructor(window: Window) {
        let clientConfig = window.clientConfig;

        for (let key in clientConfig) {
            if (clientConfig.hasOwnProperty(key)) {
                this[key] = clientConfig[key];
            }
        }
    }
}
