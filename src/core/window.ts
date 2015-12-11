/**
 * Window objects to be used for testing and as interfaces
 */
export class LocalStorage {
    cache: any = {};

    getItem(key: string): any {
        return this.cache[key];
    }

    setItem(key: string, value: any) {
        this.cache[key] = value;
    }

    removeItem(key: string) {
        delete this.cache[key];
    }
}

export class Window {
    localStorage: LocalStorage;
    clientConfig: any;

    constructor() {
        this.localStorage = new LocalStorage();
    }
}
