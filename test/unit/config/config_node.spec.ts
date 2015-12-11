import {getEnvironmentVariableOverrides, getEnvironmentVariables} from '../../../src/config/config_node';

describe('ConfigNode', function () {
    describe('getEnvironmentVariableOverrides()', function () {
        it('should throw error if the file name is invalid', function () {
            var fn = function () {
                getEnvironmentVariableOverrides('blah.json', 'dev');
            };
            expect(fn).toThrowError();
        });
    });

    describe('getEnvironmentVariables()', function () {
        it('should get values from overrides', function () {
            var envVarNames = ['SOME_VALUE', 'ANOTHER_ONE_HERE'];
            var envVarOverrides = { SOME_VALUE: 'moo', ANOTHER_ONE_HERE: 'woo', LAST_ONE: 'sfds' };
            var expected = { someValue: 'moo', anotherOneHere: 'woo' };
            var actual = getEnvironmentVariables(envVarNames, envVarOverrides);
            expect(actual).toEqual(expected);
        });
    });
});
