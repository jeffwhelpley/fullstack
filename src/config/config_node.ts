import {Config} from './config';
import {context} from './context';
import * as path from 'path';
import * as fs from 'fs';
import {RedisDbs} from '../core/interfaces';

// all values coming from environment variables
let envVarNames = [
    'REDIS_PASSWORD',
    'PRIVATE_KEY',
    'WEBSERVER_ID',
    'WEBSERVER_TOKEN'
];

let clientFields = [
    'environment',
    'apiBaseUrl'
];

export class ConfigNode implements Config {
    environment: string;
    container: string;
    longStackSupport: boolean = false;
    webPort: number = 9998;
    apiPort: number = 8888;
    apiBaseUrl: string = 'http://api.dev.gethuman.com:8888/v3';
    apiBaseUrlInternal: string = 'http://api.dev.gethuman.com:8888/v3';
    persistUrl: string = 'localhost: 27017';
    persistDebug: boolean = false;
    redisPort: number = 6379;
    redisHost: string = 'redis';
    redisPassword: string;
    redisDbs: RedisDbs;
    privateKey: string;
    webserverId: string;
    webserverToken: string;

    // constructor used to modify values based off a number of factors
    constructor() {
        let environment = this.environment = context.environment;
        let isProd = environment === 'production';
        let isStaging = environment === 'staging';
        this.container = context.container;
        
        // now make modifications per environment and/or container
        if (isStaging || isProd) {
            this.webPort = this.apiPort = 80;
        }
        
        if (isProd) {
            this.redisDbs = {
                user: 3,
                page: 4
            };
        } else {
            this.redisDbs = {
                user: 0,
                page: 1
            };
        }

        // if in dev mode, pull in the environment variable overrides from env_vars.json
        let fileName = path.normalize(process.cwd() + '/src/config/' + 'env_vars.json');
        let envVarOverrides = getEnvironmentVariableOverrides(fileName, environment);

        // get the environment variables and set them as properties
        let envVars = getEnvironmentVariables(envVarNames, envVarOverrides);
        for (let name in envVars) {
            if (envVars.hasOwnProperty(name) && envVars[name]) {
                this[name] = envVars[name];
            }
        }
    }

    getClientConfig(): string {
        let clientConfig = {};
        clientFields.forEach(key => clientConfig[key] = this[key]);
        return JSON.stringify(clientConfig);
    }
}

/**
 * Get the overrides from local env_vars.json if in dev mode
 */
export function getEnvironmentVariableOverrides(fileName: string, currentEnvironment: string): any {
    if (currentEnvironment === 'dev') {
        try {
            return JSON.parse(fs.readFileSync(fileName, 'utf8'))[currentEnvironment];
        } catch (err) {
            throw new Error('Your src/config/env_vars.json file is missing or invalid. ' +
                'This file is required for dev mode but it is not included in the git repo. ' +
                'Make sure all values are under a particular environment value. ' +
                'For example, { "dev": { "NAME1": "VALUE1" } }');
        }
    }

    return {};
}

/**
 * Given set of environment variables names, get values from overrides or actual environment variables
 */
export function getEnvironmentVariables(envVarNames: string[], envVarOverrides: any): any {
    let envVars = {};

    envVarNames.forEach((name) => {
        let nameCamelCase = name
            .split('_')
            .map(function (val, idx) {
                return idx === 0 ?
                    val.toLowerCase() :
                val.substring(0, 1).toUpperCase() + val.substring(1).toLowerCase();
            })
            .join('');

        envVars[nameCamelCase] = envVarOverrides[name] || process.env[name];
    });

    return envVars;
}
