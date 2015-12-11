import {Observable, Injectable} from 'angular2/angular2';
import * as httpRequest from 'request';
import * as jsonwebtoken from 'jsonwebtoken';
import {HttpAdapter, Endpoint} from './http_adapter';
//import {SessionAdapter} from '../session/session_adapter';
import {Config} from '../../config/config';
import {getApiUrl} from '../../utils/http_utils';

@Injectable()
export class HttpAdapterNode implements HttpAdapter {
    name: string = 'http';
    adminJwt: string;
    req: any;

    constructor(public config: Config) {
        this.adminJwt = this.getAdminJwt(config);
    }

    /**
     * The admin JWT is used on the web server for all transactions
     * since the web server has special privileges.
     */
    getAdminJwt(config: Config): string {
        let {privateKey, webserverId, webserverToken} = config;

        if (!privateKey || !webserverId || !webserverToken) {
            return '';
        }

        let decryptedToken = {
            _id: webserverId,
            authToken: webserverToken
        };

        return jsonwebtoken.sign(decryptedToken, privateKey);
    }

    /**
     * This is a general http call that is used for all requests on
     * the web server
     */
    request(endpoint: Endpoint, params: any): Observable<any> {
        let data = params && params.data;
        let url = getApiUrl(endpoint.method, endpoint.url, params);
        var reqOpts = {
            method:     endpoint.method,
            url:        this.config.apiBaseUrlInternal + url,
            json:       data ? JSON.stringify(params.data) : undefined,
            headers:    { Authorization: 'Bearer ' + this.adminJwt }
        };

        // todo: if caller in session, add other header stuff to url params
        //onBehalfOfType: caller.type,
        //    onBehalfOfId:   caller._id + '',
        //    onBehalfOfRole: caller.role,
        //    onBehalfOfName: caller.name


        return Observable.create(observer => {
            httpRequest(reqOpts, function (err, resp, obj) {
                if (err) {
                    observer.error(err);
                } else if (resp.statusCode !== 200) {
                    observer.error(obj || resp.statusMessage);
                } else {
                    observer.next(JSON.parse(obj));
                }

                observer.complete();
            });
        });
    }

    // remaining functions are just for convenience

    get(url: string, params: any): Observable<any> {
        return this.request({ method: 'GET', url: url }, params);
    }

    post(url: string, params: any): Observable<any> {
        return this.request({ method: 'POST', url: url }, params);
    }

    put(url: string, params: any): Observable<any> {
        return this.request({ method: 'PUT', url: url }, params);
    }

    del(url: string, params: any): Observable<any> {
        return this.request({ method: 'DELETE', url: url }, params);
    }
}
