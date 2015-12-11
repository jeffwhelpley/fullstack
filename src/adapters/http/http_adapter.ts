import {Observable} from 'angular2/angular2';
import {Adapter} from '../../core/interfaces';

export interface Endpoint {
    method: string;
    url: string;
}

export class HttpAdapter implements Adapter {
    name: string = 'http';

    /**
     * This is a generic method for making http calls.
     * 
     * @param endpoint An object containing method and url
     * @param params Any fields in this object will be sent to target service
     */    
    request(endpoint: Endpoint, params: any): Observable<any> {
        return Observable.from(true);
    }

    /**
     * Make an HTTP GET call to another server
     * 
     * @param url Target URL for GET
     * @param params Any fields in this object will be sent to target service
     */  
    get(url: string, params: any): Observable<any> {
        return Observable.from(true);
    }

    /**
     * Make an HTTP POST call to another server
     * 
     * @param url Target URL for POST
     * @param params Any fields in this object will be sent to target service
     */  
    post(url: string, params: any): Observable<any> {
        return Observable.from(true);
    }

    /**
     * Make an HTTP PUT call to another server
     * 
     * @param url Target URL for PUT
     * @param params Any fields in this object will be sent to target service
     */  
    put(url: string, params: any): Observable<any> {
        return Observable.from(true);
    }

    /**
     * Make an HTTP DELETE call to another server
     * 
     * @param url Target URL for DELETE
     * @param params Any fields in this object will be sent to target service
     */  
    del(url: string, params: any): Observable<any> {
        return Observable.from(true);
    }
}

