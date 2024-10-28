import {
	assertAuthHeaderCredentials,
	assertAuthHeaderType,
	type AuthHeaderCredentials,
	type AuthHeaderObject,
	type AuthHeaderString,
	type AuthHeaderType,
	type StrictAuthHeaderType,
} from './types';
import {AuthHeaderError} from './AuthHeaderError';

function buildAndValidateAuth<T extends AuthHeaderType = AuthHeaderType>(authHeader: unknown, expectType?: StrictAuthHeaderType<T>): AuthHeaderObject<T> {
	if (typeof authHeader !== 'string') {
		throw new AuthHeaderError(`${typeof authHeader} is invalid auth header type`);
	}
	const idx = authHeader.indexOf(' ');
	// check if missing space
	if (idx === -1) {
		throw new AuthHeaderError(`"${authHeader}" is invalid auth header format, missing space separator`);
	}
	const type = authHeader.slice(0, idx).toUpperCase();
	assertAuthHeaderType(type, expectType);
	const credentials = authHeader.slice(idx + 1);
	assertAuthHeaderCredentials(credentials);
	return {type, credentials} as AuthHeaderObject<T>;
}

/**
 * normalized AuthString from string
 */
export function getAuthString(authHeader: string): AuthHeaderString {
	const {type, credentials} = buildAndValidateAuth(authHeader);
	return `${type} ${credentials}`;
}

/**
 * Return AuthType from Auth header string
 */
export function getAuthType(authHeader: string): AuthHeaderType {
	const {type} = buildAndValidateAuth(authHeader);
	return type;
}

/**
 * Return credentials from Auth header string
 */
export function getAuthCredentials(authHeader: string): AuthHeaderCredentials {
	const {credentials} = buildAndValidateAuth(authHeader);
	return credentials;
}

/**
 * Get AuthHeaderObject from Auth header string
 * @param {string} authHeader - Auth header string
 * @returns {AuthHeaderObject}
 * @throws {AuthHeaderError} - If auth header is invalid
 */
export function getAuthObject(authHeader: string): AuthHeaderObject {
	return buildAndValidateAuth(authHeader);
}
