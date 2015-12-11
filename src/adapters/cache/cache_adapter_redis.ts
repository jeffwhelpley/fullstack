import {Observable, Injectable} from 'angular2/angular2';
import * as redis from 'redis';
import * as lruCache from 'lru-cache';
import {CacheAdapter} from './cache_adapter';
import {Config} from '../../config/config';
import {RedisDbs} from '../../core/interfaces';

/**
 * Redis can have several different stores so in order to
 * stay with just one cache interface, we have compound keys
 * where the key would be storeName:keyName (ex. user:1234)
 *
 * Also, since Redis may be offline at times, we use a basic
 * in memory lru cache as backup.
 */
@Injectable()
export class CacheAdapterRedis implements CacheAdapter {
    name: string = 'redis';
    cache: any;
    redisOffline: boolean = true;

    // constructor just used to inject the config    
    constructor(private config: Config) { 
        
    }

    /**
     * This is called during system startup to initialize the redis
     * cache. It will also set up error handlers so that data can
     * be saved to an alternate in memory cache whenever redis
     * is unavailable.
     */ 
    init() : Observable<any> {

        // get the redis client
        let client = redis.createClient(this.config.redisPort, this.config.redisHost);

        // log any errors
        client.on('error', function (err) {
            this.redisOffline = true;
            console.log('connectToRedis error: ' + err);
        });

        // when client back online, mark redisOffline false      
        client.on('ready', function () {
            this.redisOffline = false;
        });

        // connect to the redis dbs
        return this.connectToDbs(this.config.redisDbs);
    }
    
    /**
     * Connect to a set of redis databases defined by a config
     * 
     * @param dbs object with name and number for each database
     */
    connectToDbs(dbs: RedisDbs) : Observable<any> {
        let connections = [];
        
        for (let name in dbs) {
            if (dbs.hasOwnProperty(name)) {
                connections.push(this.connectToDb(name, dbs[name]));
            }
        }

        return Observable.forkJoin(...connections);
    }
    
    /**
     * Connect to one single redis database
     * 
     * @param name Arbitrary name for the database to use as reference
     * @param dbNbr The actual redis database number (i.e. select(dbNbr))
     */
    connectToDb(name: string, dbNbr: number) : Observable<any> {
        
          
               // todo: connect to redis
        
        // get array of observables; each one gets connection to db

        // return Observable.create(observer => {

        //      // return name and connection in object
            

        // });
        
        // return Observable.create(observer => {
            
        //     // connect to each of the dbs
        //     if (config.redisPassword) {
                
        //         client.auth(config.redisPassword, function(authErr) {
        //             if (authErr) {
        //                 observer.error(authErr);
        //             } else {
        //                 client.select(db, function(err) {
        //                     err ? deferred.reject(err) : deferred.resolve(client);
        //                 });
        //             }
        //         });
                
                
        //     } else {
        //         client.select(db, function(err) {
        //             err ? deferred.reject(err) : deferred.resolve(client);
        //         });
        //     }

        // }); 
        
        
        return Observable.from(true);
    }

    // todo: use lruCache if redis offline

    get(key: string) : any {
        return this.cache[key];
    }

    set(key: string, value: any) {
        this.cache[key] = value;
    }

    remove(key: string) {
        delete this.cache[key];
    }
}
