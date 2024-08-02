/* eslint-disable @typescript-eslint/no-confusing-void-expression */
/* eslint-disable sonarjs/no-duplicate-string */
import 'mocha';
import * as chai from 'chai';
import {assertAuthHeaderLikeString, AuthHeaderError} from '../src';

const expect = chai.expect;

describe('AuthHeaderString', () => {
	describe('assertAuthHeaderString', () => {
		it('should validate header', function () {
			expect(() => assertAuthHeaderLikeString('BASIC wekrlkasdflknjasdf')).not.to.throw();
		});
		it('should throw error', function () {
			expect(() => assertAuthHeaderLikeString('asd')).to.throw(AuthHeaderError, '"asd" is not a valid auth header string');
			expect(() => assertAuthHeaderLikeString(undefined)).to.throw(AuthHeaderError, 'undefined is not a valid auth header string');
		});
	});
});
