import {provide} from 'angular2/angular2';
import {Adapters} from '../adapters/adapters';
import {AuditReactor} from '../reactors/audit_reactor';
import {CacheAdapter} from '../adapters/cache/cache_adapter';
import {CacheAdapterRedis} from '../adapters/cache/cache_adapter_redis';
import {Config} from '../config/config';
import {ConfigNode} from '../config/config_node';
import {HttpAdapter} from '../adapters/http/http_adapter';
import {HttpAdapterNode} from '../adapters/http/http_adapter_node';
import {PersistAdapter} from '../adapters/persist/persist_adapter';
import {PersistAdapterMongo} from '../adapters/persist/persist_adapter_mongo';
import {Reactors} from '../reactors/reactors';
import {ServerRouter} from '../startup/server_router';
import {ServerRouterApi} from '../startup/server_router_api';
import {ServerRouterWeb} from '../startup/server_router_web';
import {Services} from '../services/services';
import {SessionAdapter} from '../adapters/session/session_adapter';
import {SessionAdapterCls} from '../adapters/session/session_adapter_cls';
import {StartProcess} from '../startup/start_process';
import {StartBatch} from '../startup/start_batch';
import {StartHapi} from '../startup/start_hapi';
import {UserService} from '../services/user/user_service';

// stuff for web, api and batch
let nodeProviders = [
    Adapters,
    AuditReactor,
    Reactors,
    Services,
    UserService,
    provide(Config, { useClass: ConfigNode }),
    provide(HttpAdapter, { useClass: HttpAdapterNode }),
    provide(CacheAdapter, { useClass: CacheAdapterRedis })
];

// stuff for web and api
let webAndApiProviders = [
    provide(StartProcess, { useClass: StartHapi })
];

// just the api
let apiProviders = [].concat(nodeProviders, webAndApiProviders, [
    provide(ServerRouter, { useClass: ServerRouterApi }),
    provide(PersistAdapter, { useClass: PersistAdapterMongo }),
    SessionAdapter  // not used to just have default
]);

// just the web
let webProviders = [].concat(nodeProviders, webAndApiProviders, [
    provide(ServerRouter, { useClass: ServerRouterWeb }),
    PersistAdapter,  // not used, so just have default
    provide(SessionAdapter, { useClass: SessionAdapterCls })
]);

// just the batch
let batchProviders = [].concat(nodeProviders, [
    provide(StartProcess, { useClass: StartBatch }),
    provide(PersistAdapter, { useClass: PersistAdapterMongo })
]);

export let providers = {
    api: apiProviders,
    web: webProviders,
    batch: batchProviders
};
