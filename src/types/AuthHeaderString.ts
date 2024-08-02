import {type AuthHeaderType, haveAuthHeaderType, isAuthHeaderType} from './AuthHeaderType';
import {type AuthHeaderCredentials} from './AuthHeaderCredentials';
import {AuthHeaderError} from '../AuthHeaderError';

export type AuthHeaderString = `${AuthHeaderType} ${AuthHeaderCredentials}`;

/**
 * Check if auth header is valid Auth Header string
 */
export function isAuthHeaderString(auth: unknown): auth is AuthHeaderString {
	return typeof auth === 'string' && isAuthHeaderType(auth.split(' ', 2)[0]);
}

/**
 * Check if is auth header string (case insensitive)
 */
export function haveAuthHeaderString(auth: unknown): boolean {
	return typeof auth === 'string' && haveAuthHeaderType(auth.split(' ', 2)[0]);
}

export function assertAuthHeaderString(value: unknown): asserts value is AuthHeaderString {
	if (typeof value !== 'string') {
		throw new AuthHeaderError(`${JSON.stringify(value)} is not a valid auth header type`);
	}
	const type = value.split(' ', 2)[0];
	if (!isAuthHeaderType(type)) {
		throw new AuthHeaderError(`${type} is not a valid auth header type`);
	}
}
