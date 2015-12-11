import {provide} from 'angular2/angular2';
import {CacheAdapter} from '../adapters/cache/cache_adapter';
import {CacheAdapterLocalStorage} from '../adapters/cache/cache_adapter_localstorage';
import {Config} from '../config/config';
import {ConfigBrowser} from '../config/config_browser';
import {HttpAdapter} from '../adapters/http/http_adapter';
import {HttpAdapterBrowser} from '../adapters/http/http_adapter_browser';
import {ProductService} from '../services/product/product_service';
import {SessionAdapter} from '../adapters/session/session_adapter';
import {SessionAdapterLocalStorage} from '../adapters/session/session_adapter_localstorage';
import {UserService} from '../services/user/user_service';
import {Window, LocalStorage} from '../core/window';

export let browserProviders = [
    ProductService,
    UserService,
    provide(CacheAdapter, { useClass: CacheAdapterLocalStorage }),
    provide(Config, { useClass: ConfigBrowser }),
    provide(HttpAdapter, { useClass: HttpAdapterBrowser }),
    provide(LocalStorage, { useValue: window.localStorage }),
    provide(SessionAdapter, { useClass: SessionAdapterLocalStorage }),
    provide(Window, { useValue: window })
];
