/// <reference path="./tsd/tsd.d.ts" />

// custom stuff here
declare module 'inert' {

}

declare module 'continuation-local-storage' {
    interface ClsNamespace {
        bindEmitter(obj: any);
        run(cb: any);
        get(key: string);
        set(key: string, value: any);
        active: boolean;
    }

    function createNamespace(name: string): ClsNamespace;
    function getNamespace(name: string): ClsNamespace;
}

