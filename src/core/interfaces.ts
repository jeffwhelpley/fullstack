import {Observable} from 'angular2/angular2';

export interface Adapter {
    name: string;
}

export interface AdapterList {
    [id: string]: Adapter;
}

export interface Reactor {
    name: string;
    react();
    cleanup();
}

export interface ReactorList {
    [id: string]: Reactor;
}

export interface Service {
    name: string;
}

export interface ServiceList {
    [id: string]: Service;
}

export interface Model {

}

export interface RedisDbs {
    user: number;
    page: number;
    visitor?: number;
}
