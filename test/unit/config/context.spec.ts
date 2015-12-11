import {context, getContextValue, validateValue, setContext} from '../../../src/config/context';

describe('context', function () {
    describe('getContextValue()', function () {
        it('should return nothing if no params', function () {
            var value = getContextValue(null, null, null, null);
            expect(value).toBeFalsy();
        });

        it('should get value from environment variables', function () {
            var args = null;
            var vars = { BOO: 'moo' };
            var name = 'boo';
            var expected = vars.BOO;
            var actual = getContextValue(args, vars, name, null);
            expect(actual).toEqual(expected);
        });

        it('should get value from command line with short name', function () {
            var args = ['-b', 'zoo'];
            var vars = { boo: 'moo' };
            var name = 'boo';
            var expected = 'zoo';
            var actual = getContextValue(args, vars, name, null);
            expect(actual).toEqual(expected);
        });

        it('should get value from command line with long name', function () {
            var args = ['--boo', 'zoo'];
            var vars = { boo: 'moo' };
            var name = 'boo';
            var expected = 'zoo';
            var actual = getContextValue(args, vars, name, null);
            expect(actual).toEqual(expected);
        });

        it('should get value from default', function () {
            var args = ['--boo', 'zoo'];
            var vars = { boo: 'moo' };
            var name = 'wuwu';
            var defaultValue = 'dddsss';
            var actual = getContextValue(args, vars, name, defaultValue);
            expect(actual).toEqual(defaultValue);
        });
    });

    describe('validateValue()', function () {
        it('should do nothing if the value is valid', function () {
            validateValue(['zoo'], 'name', 'zoo');
        });

        it('should throw error if invalid value', function () {
            var fn = function () {
                validateValue(['www'], 'name', 'zoo');
            };
            expect(fn).toThrowError();
        });
    });
});
