import * as Hapi from 'hapi';
import {Observable, Injectable} from 'angular2/angular2';
import {StartProcess} from './start_process';
import {ServerRouter} from './server_router';
import {Reactors} from '../reactors/reactors';
import {Adapters} from '../adapters/adapters';
import {Services} from '../services/services';
import {SessionAdapter} from '../adapters/session/session_adapter';
import {Config} from '../config/config';

@Injectable()
export class StartHapi implements StartProcess {

    /**
     * Pull in all the dependencies needed to start up the Hapi server
     */
    constructor(public router: ServerRouter,
                public reactors: Reactors,
                public adapters: Adapters,
                public services: Services,
                public session: SessionAdapter,
                public config: Config) {

    }

    /**
     * Start all the middleware and then start up the Hapi server
     */
    start() {
        let server = this.getServer();
        this.runMiddleware(server);

        // todo: wait on reactors, adapters and services init

        console.log(`${this.config.container} starting ...`);
        server.start((err) => {
            err ?
                console.log(err) :
                console.log(`${this.config.container} started at ${server.info.uri}`);
        });
    }

    /**
     * Get the Hapi server instance
     */
    getServer(): Hapi.Server {
        let port = this.config[this.config.container + 'Port'] || 80;
        let server = new Hapi.Server();
        server.connection({ port: port });
        return server;
    }

    /**
     * Run all the server middleware
     */
    runMiddleware(server: Hapi.Server) {
        this.initSession(server);
        this.errorHandler(server);
        this.router.addRoutes(server);
    }

    initSession(server) {

        // only initialize session for the web
        if (this.config.container !== 'web') { return; }

        let session = this.session.create();

        server.ext('onRequest', function (request, reply) {
            session.bindEmitter(request.raw.req);
            session.bindEmitter(request.raw.res);
            session.run(function () {
                reply.continue();
            });
        });
    }

    /**
     * Add error handling for server
     */
    errorHandler(server: Hapi.Server) {
        process.on('uncaughtException', function (err) {
            console.error('global uncaught exception : ' + err + '\n' + err.stack);
            process.exit(1);
        });

        // check for errors before sending them back to the client
        server.on('onPreResponse', function (request, reply) {
            var response = request.response;

            // if error, log it
            if (response.isBoom) {
                console.error(request.method + ' ' + response);
            }

            // then continue so response sent to client
            reply.continue();
        });
    }
}
