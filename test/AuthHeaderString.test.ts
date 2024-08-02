/* eslint-disable @typescript-eslint/no-confusing-void-expression */
/* eslint-disable sonarjs/no-duplicate-string */
import 'mocha';
import * as chai from 'chai';
import {assertAuthHeaderString, AuthHeaderError, haveAuthHeaderString, isAuthHeaderString} from '../src';

const expect = chai.expect;

describe('AuthHeaderString', () => {
	describe('isAuthHeaderString', () => {
		it('should validate header', function () {
			expect(isAuthHeaderString('BASIC wekrlkasdflknjasdf')).to.be.eq(true);
		});
		it('should not validate header', function () {
			expect(isAuthHeaderString('BaSiCwekrlkasdflknjasdf')).to.be.eq(false);
			expect(isAuthHeaderString('BaSiC')).to.be.eq(false);
		});
	});
	describe('haveAuthHeaderString', () => {
		it('should validate header', function () {
			expect(haveAuthHeaderString('BaSiC wekrlkasdflknjasdf')).to.be.eq(true);
		});
	});
	describe('haveAuthHeaderString', () => {
		it('should validate header', function () {
			expect(haveAuthHeaderString('BaSiC wekrlkasdflknjasdf')).to.be.eq(true);
		});
	});
	describe('assertAuthHeaderString', () => {
		it('should validate header', function () {
			expect(() => assertAuthHeaderString('BASIC wekrlkasdflknjasdf')).not.to.throw();
		});
		it('should throw error', function () {
			expect(() => assertAuthHeaderString('asd')).to.throw(AuthHeaderError, 'asd is not a valid auth header type');
			expect(() => assertAuthHeaderString(undefined as unknown as string)).to.throw(AuthHeaderError, 'undefined is not a valid auth header type');
		});
	});
});
