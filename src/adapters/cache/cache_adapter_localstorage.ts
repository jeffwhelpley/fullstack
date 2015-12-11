import {Injectable} from 'angular2/angular2';
import {CacheAdapter} from './cache_adapter';
import {LocalStorage} from '../../core/window';

/**
 * This is what is used on the web client side. Since not all
 * browsers support localStorage, we need to have a default
 * implementation just in case (in-memory store). Also, we need
 * to wrap all calls with try - catch because of issues w browsers.
 */
@Injectable()
export class CacheAdapterLocalStorage implements CacheAdapter {
    name: string = 'localStorage';
    cache: any;

    constructor(localStorage: LocalStorage, window: Window) {
        this.cache = localStorage;
    }

    /**
     * Get a value from the cache
     * 
     * @param key The cache key
     */
    get(key: string): any {
        try {
            return this.cache.getItem(key);
        } catch (ex) {
            return null;
        }
    }
    
    /**
     * Save a value into the cache
     * 
     * @param key The cache key
     * @param value Any value
     */ 
    set(key: string, value: any) {
        try {
            this.cache.setItem(key, value);
        } catch (ex) { }
    }

    /**
     * Remove a value from the cache
     * 
     * @param key The cache key
     */ 
    remove(key: string) {
        try {
            this.cache.removeItem(key);
        } catch (ex) { }
    }
}
