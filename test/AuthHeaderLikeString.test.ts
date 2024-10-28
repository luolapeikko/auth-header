/* eslint-disable @typescript-eslint/no-confusing-void-expression */
/* eslint-disable sonarjs/no-duplicate-string */
import {assertAuthHeaderLikeString, AuthHeaderError} from '../src';
import {describe, expect, it} from 'vitest';

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
