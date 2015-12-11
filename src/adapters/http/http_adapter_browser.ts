import {Observable, Injectable} from 'angular2/angular2';
import {Http, Request, Response, RequestOptions, RequestMethods, Headers} from 'angular2/http';
import {HttpAdapter, Endpoint} from './http_adapter';
import {SessionAdapter} from '../session/session_adapter';
import {Config} from '../../config/config';
import {getApiUrl} from '../../utils/http_utils';

@Injectable()
export class HttpAdapterBrowser implements HttpAdapter {
    name: string = 'http';

    constructor(public http: Http,
                public sessionAdapter: SessionAdapter,
                public config: Config) {

    }

    request(endpoint: Endpoint, params: any): Observable<any> {
        let jwt = this.sessionAdapter.get('jwt');
        let data = params && params.data;
        let url = getApiUrl(endpoint.method, endpoint.url, params);
        let reqOpts = new RequestOptions({
            method:     endpoint.method,
            url:        this.config.apiBaseUrl + url,
            body:       data ? JSON.stringify(data) : undefined,
            headers:    jwt ? new Headers({ Authorization: 'Bearer ' + jwt }) : undefined
        });

        // todo: repeat http call a couple times if certain statuses

        return this.http.request(new Request(reqOpts))
            .map((res: Response) => res.json());
    }

    get(url: string, params: any): Observable<any> {
        return this.request({ method: 'Get', url: url }, params);
    }

    post(url: string, params: any): Observable<any> {
        return this.request({ method: 'Post', url: url }, params);
    }

    put(url: string, params: any): Observable<any> {
        return this.request({ method: 'Put', url: url }, params);
    }

    del(url: string, params: any): Observable<any> {
        return this.request({ method: 'Delete', url: url }, params);
    }
}
