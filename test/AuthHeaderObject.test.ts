/* eslint-disable @typescript-eslint/no-confusing-void-expression */
/* eslint-disable sonarjs/no-duplicate-string */
import 'mocha';
import * as chai from 'chai';
import {assertAuthHeaderObject, AuthHeaderError} from '../src';

const expect = chai.expect;

describe('AuthHeaderObject', () => {
	describe('assertAuthHeaderString', () => {
		it('should validate header', function () {
			expect(() => assertAuthHeaderObject({type: 'BASIC', credentials: 'asd'})).not.throw();
		});
		it('should throw error', function () {
			expect(() => assertAuthHeaderObject('asd')).to.throw(AuthHeaderError, '"asd" is invalid auth header object');
			expect(() => assertAuthHeaderObject(undefined as unknown as string)).to.throw(AuthHeaderError, 'undefined is invalid auth header object');
		});
	});
});
