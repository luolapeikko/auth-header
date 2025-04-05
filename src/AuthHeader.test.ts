import {describe, expect, it} from 'vitest';
import {AbstractHeader, base64Encode} from './lib';
import {AuthHeader, AuthHeaderError, isAuthHeaderInstance} from '.';

describe('AuthHeader', () => {
	describe('AuthHeader class', () => {
		describe('valid', function () {
			it('should return proper values', function () {
				const rawValue = `Basic ${base64Encode('USERNAME:PASSWD')}`;
				const header = AuthHeader(rawValue).unwrap();
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
				const header = AuthHeader(rawValue, ['BASIC']).unwrap();
				expect(header.getUsername()).to.be.eq('USERNAME');
				expect(header.getPassword()).to.be.eq('PASSWD');
				expect(header.toString()).to.be.eq(rawValue);
				expect(header.toJSON()).to.be.eql({scheme: 'BASIC', credentials: 'USERNAME:PASSWD'});
				expect(header.getCredentials()).to.be.eql('USERNAME:PASSWD');
			});
			it('should return proper values', function () {
				const rawValue = `Bearer some.token.value`;
				const header: AuthHeader<'BEARER'> = AuthHeader<'BEARER'>(rawValue, 'BEARER').unwrap();
				expect(header.toString()).to.be.eq(rawValue);
				expect(header.toJSON()).to.be.eql({scheme: 'BEARER', credentials: 'some.token.value'});
				expect(header.getCredentials()).to.be.eql('some.token.value');
			});
			it('should return proper values', function () {
				expect(AuthHeader(`basic ${base64Encode('USERNAME:PASSWD')}`).unwrap()).to.be.an.instanceof(AbstractHeader);
				expect(AuthHeader(`BASIC ${base64Encode('USERNAME:PASSWD')}`).unwrap()).to.be.an.instanceof(AbstractHeader);
				expect(AuthHeader(`BEARER some.token.value`).unwrap()).to.be.an.instanceof(AbstractHeader);
			});
		});
		describe('error', function () {
			it('should return proper values', function () {
				expect(() => AuthHeader(null).unwrap()).to.throw(AuthHeaderError, 'null is not a authorization header');
				expect(() => AuthHeader(undefined).unwrap()).to.throw(AuthHeaderError, 'undefined is not a authorization header');
				expect(() => AuthHeader('some testing').unwrap()).to.throw(AuthHeaderError, '"some testing" is not a authorization header');
				expect(() => AuthHeader<'BASIC'>('Basic testing').unwrap().getUsername()).to.throw(AuthHeaderError, '"testing" is not a BasicAuthCredentials');
				expect(() => AuthHeader<'BASIC'>('Basic testing').unwrap().getCredentials()).to.throw(AuthHeaderError, '"testing" is not a BasicAuthCredentials');
				expect(() => AuthHeader('Bearer testing', ['BASIC']).unwrap()).to.throw(AuthHeaderError, '"BEARER" is not ["BASIC"] authorization header scheme');
			});
		});
	});
	describe('isAuthHeaderInstance', () => {
		it('should validate correct AuthHeader instances', function () {
			expect(isAuthHeaderInstance(AuthHeader(`BASIC ${base64Encode('USERNAME:PASSWD')}`).unwrap())).to.be.eq(true);
			expect(isAuthHeaderInstance('unit test')).to.be.eq(false);
			expect(isAuthHeaderInstance(null)).to.be.eq(false);
		});
	});
});
