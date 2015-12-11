import 'es6-shim';
import 'reflect-metadata';
import 'zone.js/dist/zone-microtask';
import {appInjector} from './di/app_injector';
import {StartProcess} from './startup/start_process';

// start the process
appInjector.get(StartProcess).start();
