import {describe, expect, it} from 'vitest';
import {isAuthHeaderString} from '.';

describe('isAuthHeader', () => {
	it('should validate valid auth header', function () {
		expect(isAuthHeaderString(undefined)).to.be.eq(false);
		expect(isAuthHeaderString(null)).to.be.eq(false);
		expect(isAuthHeaderString('unit test')).to.be.eq(false);
		expect(isAuthHeaderString('Bearer some.token.value')).to.be.eq(true);
	});
});
