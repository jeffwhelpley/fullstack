import {Injector} from 'angular2/angular2';
import {providers} from './providers_node';
import {context} from '../config/context';

// get the container from env var or the command line
context.init();
let containerBindings = providers[context.container];
export let appInjector = Injector.resolveAndCreate(containerBindings);
