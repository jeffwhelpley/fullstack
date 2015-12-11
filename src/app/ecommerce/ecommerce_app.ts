import 'es6-shim';
import 'reflect-metadata';
import {bootstrap, provide, FORM_PROVIDERS, ELEMENT_PROBE_PROVIDERS} from 'angular2/angular2';
import {ROUTER_PROVIDERS, LocationStrategy, PathLocationStrategy} from 'angular2/router';
import {HTTP_PROVIDERS} from 'angular2/http';

import {EcommerceRoot} from './ecommerce_root';
import {browserProviders} from '../../di/providers_browser';

bootstrap(EcommerceRoot, [
    FORM_PROVIDERS,
    ROUTER_PROVIDERS,
    HTTP_PROVIDERS,
    ELEMENT_PROBE_PROVIDERS,
    provide(LocationStrategy, {useClass: PathLocationStrategy})
].concat(browserProviders));
