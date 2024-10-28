/* eslint-disable sonarjs/no-duplicate-string */
import {AuthHeader, authHeaderTypes} from '../src';
import {describe, expect, it} from 'vitest';

const workingAuth = authHeaderTypes.map((type) => `${type.toLowerCase()} RANDOMVALUE`);

describe('AuthHeader class', () => {
	it('should return proper values', function () {
		workingAuth.forEach((auth) => {
			const [type, credentials] = auth.split(' ');
			const authClass = AuthHeader.fromString(auth);
			expect(authClass.type).to.be.eq(type.toUpperCase());
			expect(authClass.credentials).to.be.eq(credentials);
			expect(authClass.toString()).to.be.eq(auth.toUpperCase());
			expect(authClass.toJSON()).to.be.eql({type: type.toUpperCase(), credentials});
		});
	});
});
