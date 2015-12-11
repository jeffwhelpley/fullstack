/**
 * This module uses either command line params or environment variables
 * to figure out the current container (i.e. web, api, etc.) and
 * environment (i.e. dev, staging, production, etc.).
 *
 * The command line could be something like:
 *      node start -c api -e dev
 */
let validContainers = ['web', 'api', 'batch', 'test'];
let validEnvironments = ['dev', 'staging', 'production'];

export let context = {
    container: 'api',
    environment: 'dev',
    init: function() {
        context.container = getContextValue(process.argv, process.env, 'container', 'api');
        context.environment = getContextValue(process.argv, process.env, 'environment', 'dev');

        validateValue(validContainers, 'container', this.container);
        validateValue(validEnvironments, 'environment', this.environment);
    }
};

// given command line args and environment vars, get a particular value
export function getContextValue(commandLineArgs: any, environmentVars: any, name: string, defaultValue: string): string {
    commandLineArgs = commandLineArgs || [];
    environmentVars = environmentVars || {};
    name = name || '';

    let upper = name.toUpperCase();
    let lower = '--' + name.toLowerCase();
    let short = '-' + name.toLowerCase().substring(0, 1);
    let value = null;

    // first loop through command line to see if values there
    commandLineArgs.forEach(function(val, index, array) {
        if ((val === short || val === lower) && array.length > index) {
            value = array[index + 1];
        }
    });

    // value either from the command line or an environment variable
    return value || environmentVars[upper] || defaultValue;
}

// exit process if invalid context value
export function validateValue(validValues: string[], name: string, value: string) {
    let upper = name.toUpperCase();
    let lower = '--' + name.toLowerCase();
    let short = '-' + name.toLowerCase().substring(0, 1);

    if (validValues.indexOf(value) < 0) {
        throw new Error(value + ' is an invalid ' + name + '. Valid ' + name + 's include: ' +
            validContainers.join(', ') +
            '. You can either set an environment variable called ' + upper +
            ' or use ' + short + ' or ' + lower + ' at the command line ' +
            '(ex. node start ' + short + ' ' + validValues[0] + ').');
    }
}

// used for testing purposes
export function setContext(container, environment) {
    context.container = container;
    context.environment = environment;
}
