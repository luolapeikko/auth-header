import {AuthHeaderError} from '../AuthHeaderError';

/**
 * Type for Authorization header credentials
 * @since v0.0.1
 */
export type AuthHeaderCredentials = string & {__authHeaderCredentials: true};

/**
 * Check if data is valid AuthHeaderCredentials
 * @since v0.0.1
 */
export function isAuthHeaderCredentials(data: unknown): data is AuthHeaderCredentials {
	return typeof data === 'string' && data.length > 0;
}

/**
 * Assert value is valid AuthHeaderCredentials
 * @since v0.0.1
 */
export function assertAuthHeaderCredentials(value: unknown): asserts value is AuthHeaderCredentials {
	if (!isAuthHeaderCredentials(value)) {
		throw new AuthHeaderError(`${JSON.stringify(value)} not include valid credentials`);
	}
}
