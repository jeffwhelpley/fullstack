import {Injectable} from 'angular2/angular2';
import * as Hapi from 'hapi';
import * as inert from 'inert';
import {Config} from '../config/config';

@Injectable()
export class ServerRouterWeb {

    constructor(public config: Config) {

    }

    addRoutes(server: Hapi.Server) {

        // route for robots.txt
        server.route({
            method:     'GET',
            path:       '/robots.txt',
            handler: function (request, reply) {
                if (this.config.environment === 'production') {
                    reply('User-agent: Mediapartners-Google\nDisallow:\nUser-agent: *\nDisallow: /axj/\nAllow: /')
                        .header('Content-Type', 'text/plain');
                } else {
                    reply('User-agent: *\nDisallow: /').header('Content-Type', 'text/plain');
                }
            }
        });

        // for static files
        server.register(inert, function () {});
        server.route({
            method:     'GET',
            path:       '/__dist__/{path*}',
            handler:    { directory: { path: './__dist__', listing: false, index: false } },
            config: {
                cors: {
                    origin:         ['*'],
                    headers:        ['Accept', 'Accept-Version', 'Content-Type', 'Api-Version', 'X-Requested-With'],
                    credentials:    true
                }
            }
        });

        // todo: this is temporary; figure out current app, get values and then generate page
        server.route({
            method: 'GET',
            path: '/{p*}',
            handler: (request, reply) => reply(getPrimerPage(this.config.getClientConfig()))
        });

        // finally catch all for 404 error handler
        // server.route({
        //     method: '*',
        //     path: '/{p*}',
        //     handler: (request, reply) => reply('Invalid path').code(404)
        // });

    }
}

/**
 * Get the primer page (this will be replaced by server rendering soon)
 */
export function getPrimerPage(clientConfig: string) {
    return `
        <html>
            <head>
                <title>Radar</title>
                <meta charset="utf-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1">
                <meta name="description" content="Monitor your accounts and find issues">
                <link rel="icon" href="data:;base64,iVBORw0KGgo=">
                <base href="/">
            </head>
            <body>
                <app>
                    Loading...
                </app>
                <script>
                    var clientConfig = ${clientConfig};
                </script>
                <script src="/__dist__/js/common.js"></script>
                <script src="/__dist__/js/angular2.js"></script>
                <script src="/__dist__/js/radar.js"></script>
            </body>
        </html>
    `;
}
