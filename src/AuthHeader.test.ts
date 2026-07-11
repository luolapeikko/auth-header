import {describe, expect, it} from 'vitest';
import {AuthHeader, AuthHeaderError, isAuthHeaderInstance} from '.';
import {AbstractHeader, base64Encode} from './lib';

function unwrap<T>(result: {success: true; value: T} | {success: false; error: any}): T {
	if (result.success) {
		return result.value;
	}
	throw result.error;
}

describe('AuthHeader', () => {
	describe('AuthHeader class', () => {
		describe('valid', function () {
			it('should return proper values', function () {
				const rawValue = `Basic ${base64Encode('USERNAME:PASSWD')}`;
				const header = unwrap(AuthHeader(rawValue));
				if (header.scheme !== 'BASIC') {
					throw new Error('should not happen');
				}
				expect(header.getUsername()).to.be.eq('USERNAME');
				expect(header.getPassword()).to.be.eq('PASSWD');
				expect(header.toString()).to.be.eq(rawValue);
				expect(header.toJSON()).to.be.eql({scheme: 'BASIC', credentials: 'USERNAME:PASSWD'});
			});
			it('should return proper values', function () {
				const rawValue = `Basic ${base64Encode('USERNAME:PASSWD')}`;
				const header = unwrap(AuthHeader(rawValue, ['BASIC']));
				expect(header.getUsername()).to.be.eq('USERNAME');
				expect(header.getPassword()).to.be.eq('PASSWD');
				expect(header.toString()).to.be.eq(rawValue);
				expect(header.toJSON()).to.be.eql({scheme: 'BASIC', credentials: 'USERNAME:PASSWD'});
				expect(header.getCredentials()).to.be.eql('USERNAME:PASSWD');
			});
			it('should return proper values', function () {
				const rawValue = `Bearer some.token.value`;
				const header: AuthHeader<'BEARER'> = unwrap(AuthHeader<'BEARER'>(rawValue, 'BEARER'));
				expect(header.toString()).to.be.eq(rawValue);
				expect(header.toJSON()).to.be.eql({scheme: 'BEARER', credentials: 'some.token.value'});
				expect(header.getCredentials()).to.be.eql('some.token.value');
			});
			it('should return proper values', function () {
				expect(unwrap(AuthHeader(`basic ${base64Encode('USERNAME:PASSWD')}`))).to.be.an.instanceof(AbstractHeader);
				expect(unwrap(AuthHeader(`BASIC ${base64Encode('USERNAME:PASSWD')}`))).to.be.an.instanceof(AbstractHeader);
				expect(unwrap(AuthHeader(`BEARER some.token.value`))).to.be.an.instanceof(AbstractHeader);
			});
		});
		describe('error', function () {
			it('should return proper values', function () {
				expect(() => unwrap(AuthHeader(null))).to.throw(AuthHeaderError, 'null is not a authorization header');
				expect(() => unwrap(AuthHeader(undefined))).to.throw(AuthHeaderError, 'undefined is not a authorization header');
				expect(() => unwrap(AuthHeader('some testing'))).to.throw(AuthHeaderError, '"some testing" is not a authorization header');
				expect(() => unwrap(AuthHeader<'BASIC'>('Basic testing')).getUsername()).to.throw(AuthHeaderError, '"testing" is not a BasicAuthCredentials');
				expect(() => unwrap(AuthHeader<'BASIC'>('Basic testing')).getCredentials()).to.throw(AuthHeaderError, '"testing" is not a BasicAuthCredentials');
				expect(() => unwrap(AuthHeader('Bearer testing', ['BASIC']))).to.throw(AuthHeaderError, '"BEARER" is not ["BASIC"] authorization header scheme');
			});
		});
	});
	describe('isAuthHeaderInstance', () => {
		it('should validate correct AuthHeader instances', function () {
			expect(isAuthHeaderInstance(unwrap(AuthHeader(`BASIC ${base64Encode('USERNAME:PASSWD')}`)))).to.be.eq(true);
			expect(isAuthHeaderInstance('unit test')).to.be.eq(false);
			expect(isAuthHeaderInstance(null)).to.be.eq(false);
		});
	});
});
