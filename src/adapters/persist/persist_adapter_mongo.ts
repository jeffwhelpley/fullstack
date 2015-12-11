import * as mongoose from 'mongoose';
import {Observable, Injectable} from 'angular2/angular2';
import {PersistAdapter} from './persist_adapter';

@Injectable()
export class PersistAdapterMongo implements PersistAdapter {
    name: string = 'mongo';

    init(): any {
        return true;
    }

    create(criteria: any): Observable<any> {
        return Observable.from(true);
    }

/*
    modelCache: any = {};

    init(modelDefinitions: any[]): Promise<{}> {
        return new Promise((resolve, reject) => {
            var opts = {
                server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
                replset: { socketOptions: { keepAlive: 1, connectTimeoutMS : 30000 } }
            };

            // set to debug mode if applicable
            mongoose.set('debug', config.persist.debug);

            // disconnect and then re-connect
            mongoose.disconnect(() => {
                mongoose.connect(config.persist.uri, opts, (err) => {
                    err ? reject(err) : resolve(null);
                })
            });

            // name: string, schema: any, indexes: any[]
            // loop through model definitions and create a mongoose model for each one
            // let mongoSchema = new mongoose.Schema(schema, { collection: name });
            // indexes.forEach((idx) => mongoSchema.index(idx.fields, idx.options));
            // this.Model = mongoose.model(name, mongoSchema);
        });
    }

    find(name: string, req: any): Promise<{}> {
        let model = this.modelCache[name];
        let select = req.select || null;
        let where = req.where || {};

        if (select && Array.isArray(select)) {
            select = select.join(' ');
        }

        let options = {
            skip: req.skip || 0,
            lean: true
        };

        // if (req.limit) {
        //     options.limit = req.limit;
        // }

        var query = req.findOne ?
            model.findOne(where, select, options) :
            model.find(where, select, options);

        if (req.sort) {
            query = query.sort(req.sort);
        }

        return new Promise((resolve, reject) => {
            query.exec()
                .then(function(data) {
                    resolve(data || null);
                })
                .then(null, function (err) {
                    reject(err);
                });
        });
    }

    create(req: any) { }
    */
}
