import {describe, expect, it} from 'vitest';
import {base64Encode, extractHeaderPack} from '..';
import {BasicAuthHeader} from './BasicAuthHeader';

describe('AuthHeader class', () => {
	it('should return proper values', function () {
		const pack = extractHeaderPack(`Basic ${base64Encode('USERNAME:PASSWD')}`).unwrap();
		const header = new BasicAuthHeader(pack);
		expect(header.getUsername()).to.be.eq('USERNAME');
		expect(header.getPassword()).to.be.eq('PASSWD');
		expect(header.toString()).to.be.eq(pack.rawHeader);
		expect(header.toJSON()).to.be.eql({scheme: 'BASIC', credentials: 'USERNAME:PASSWD'});
	});
	it('should give error if wrong scheme', function () {
		const pack = extractHeaderPack(`BEARER ${base64Encode('USERNAME:PASSWD')}`).unwrap();
		expect(() => new BasicAuthHeader(pack).getCredentials()).to.throw(Error, 'scheme mismatch');
	});
});
