import {ConfigNode} from '../../../../src/config/config_node';
import {HttpAdapterNode} from '../../../../src/adapters/http/http_adapter_node';

describe('HttpAdapterNode', function () {
    describe('request()', function () {
        it('should get the android user', function (done) {
            let config = new ConfigNode();
            let http = new HttpAdapterNode(config);
            http.get('/users', { where: { username: 'android' }, findOne: true })
                .subscribe(
                    user => {
                        expect(user).toBeTruthy();
                        expect(user.username).toBeTruthy();
                        expect(user.username).toEqual('android');
                    },
                    err => {
                        throw new Error(err);
                    },
                    () => done()
                );
        });
    });
});
