import {describe, expect, it} from 'vitest';
import {base64Encode, extractHeaderPack} from '..';
import {BasicAuthHeader} from './BasicAuthHeader';

describe('AuthHeader class', () => {
	it('should return proper values', function () {
		const packResult = extractHeaderPack(`Basic ${base64Encode('USERNAME:PASSWD')}`);
		if (!packResult.success) {
			throw packResult.error;
		}
		const pack = packResult.value;
		const header = new BasicAuthHeader(pack);
		expect(header.getUsername()).to.be.eq('USERNAME');
		expect(header.getPassword()).to.be.eq('PASSWD');
		expect(header.toString()).to.be.eq(pack.rawHeader);
		expect(header.toJSON()).to.be.eql({scheme: 'BASIC', credentials: 'USERNAME:PASSWD'});
	});
	it('should give error if wrong scheme', function () {
		const packResult = extractHeaderPack(`BEARER ${base64Encode('USERNAME:PASSWD')}`);
		if (!packResult.success) {
			throw packResult.error;
		}
		const pack = packResult.value;
		expect(() => new BasicAuthHeader(pack).getCredentials()).to.throw(Error, 'scheme mismatch');
	});
});
