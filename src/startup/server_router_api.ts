import {Injectable} from 'angular2/angular2';
import * as Hapi from 'hapi';

@Injectable()
export class ServerRouterApi {
    addRoutes(server: Hapi.Server) {

        // todo: loop through services and get api metadata

        server.route({
            method: 'GET',
            path: '/',
            handler: (request, reply) => reply('salutations from the API')
        });

        // finally catch all for 404 error handler
        server.route({
            method: '*',
            path: '/{p*}',
            handler: (request, reply) => reply('Invalid path').code(404)
        });
    }
}
