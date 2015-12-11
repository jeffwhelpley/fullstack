import {Injectable} from 'angular2/angular2';
import {RedisDbs} from '../core/interfaces';

/**
 * This is left empty on purpose. Must be overriden by another config. Usually
 * config_node.ts on the server side and config_browser.ts on the client side.
 */
export class Config {
    environment: string;
    container: string;
    longStackSupport: boolean;
    webPort: number;
    apiPort: number;
    apiBaseUrl: string;
    apiBaseUrlInternal: string;
    persistUrl: string;
    persistDebug: boolean;
    redisPort: number;
    redisHost: string;
    redisPassword: string;
    redisDbs: RedisDbs;
    privateKey: string;
    webserverId: string;
    webserverToken: string;

    getClientConfig(): string {
        return '';
    }
}
