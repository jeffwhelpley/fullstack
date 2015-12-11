import {Adapter} from '../../core/interfaces';

/**
 * The default cache adapter stores values in memory.
 * This class is also used as the interface for all
 * other cache adapters.
 */
export class CacheAdapter implements Adapter {
    name: string = 'cache';
    cache: any = {};

    /**
     * Get a value from the cache
     * 
     * @param key The cache key
     */    
    get(key: string): any {
        return this.cache[key];
    }
    
    /**
     * Save a value into the cache
     * 
     * @param key The cache key
     * @param value Any value
     */  
    set(key: string, value: any) {
        this.cache[key] = value;
    }
    
    /**
     * Remove a value from the cache
     * 
     * @param key The cache key
     */  
    remove(key: string) {
        delete this.cache[key];
    }
}
