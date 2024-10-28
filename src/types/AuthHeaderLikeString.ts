import {AuthHeaderError} from '../AuthHeaderError';

/**
 * Type for Authorization header string
 * @since v0.0.1
 */
export type AuthHeaderLikeString = `${string} ${string}`;

/**
 * Fast check for auth header string format "${string} ${string}", use this as guard before actually parsing the string
 * @since v0.0.1
 */
export function isAuthHeaderLikeString(data: unknown): data is AuthHeaderLikeString {
	return typeof data === 'string' && data.length > 0 && data.indexOf(' ') !== -1;
}

/**
 * Fast assert for auth header string format "${string} ${string}", use this as assert before actually parsing the string
 * @since v0.0.1
 */
export function assertAuthHeaderLikeString(value: unknown): asserts value is AuthHeaderLikeString {
	if (!isAuthHeaderLikeString(value)) {
		throw new AuthHeaderError(`${JSON.stringify(value)} is not a valid auth header string`);
	}
}
