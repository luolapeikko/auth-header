import {type AuthHeaderCredentials, isAuthHeaderCredentials} from './AuthHeaderCredentials';
import {type AuthHeaderType, isAuthHeaderType} from './AuthHeaderType';
import {AuthHeaderError} from '../AuthHeaderError';

export type AuthHeaderObject<HeaderType extends AuthHeaderType = AuthHeaderType> = {
	readonly type: HeaderType;
	readonly credentials: AuthHeaderCredentials;
};

/**
 * Auth header type guard
 */
export function isAuthHeaderObject(data: unknown): data is AuthHeaderObject {
	return (
		typeof data === 'object' &&
		data !== null &&
		'type' in data &&
		isAuthHeaderType(data.type) &&
		'credentials' in data &&
		isAuthHeaderCredentials(data.credentials)
	);
}

export function assertAuthHeaderObject(value: unknown): asserts value is AuthHeaderObject {
	if (!isAuthHeaderObject(value)) {
		throw new AuthHeaderError(`${JSON.stringify(value)} is invalid auth header object`);
	}
}
