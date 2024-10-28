import {AuthHeaderError} from '../AuthHeaderError';

/**
 * Authorization header types
 * @since v0.0.1
 */
export const authHeaderTypes = ['BEARER', 'BASIC', 'DIGEST', 'HOBA', 'MUTUAL', 'NEGOTIATE', 'NTLM', 'VAPID', 'AWS4-HMAC-SHA256'] as const;
/**
 * Authorization header type
 * @since v0.0.1
 */
export type AuthHeaderType = (typeof authHeaderTypes)[number];

/**
 * Authorization header type enum
 * @since v0.0.2
 */
export const AuthHeaderTypeEnum = {
	'AWS4-HMAC-SHA256': 'AWS4-HMAC-SHA256',
	BASIC: 'BASIC',
	BEARER: 'BEARER',
	DIGEST: 'DIGEST',
	HOBA: 'HOBA',
	MUTUAL: 'MUTUAL',
	NEGOTIATE: 'NEGOTIATE',
	NTLM: 'NTLM',
	VAPID: 'VAPID',
} as const satisfies Record<AuthHeaderType, AuthHeaderType>;

/**
 * StrictAuthHeaderType type
 * @since v0.0.2
 */
export type StrictAuthHeaderType<T extends AuthHeaderType = AuthHeaderType> = Set<T> | T[] | T;

/**
 * AuthHeaderType type guard
 * @since v0.0.1
 */
export function isAuthHeaderType<T extends AuthHeaderType = AuthHeaderType>(
	authHeaderType: unknown,
	expectType?: StrictAuthHeaderType<T>,
): authHeaderType is AuthHeaderType;
export function isAuthHeaderType<T extends AuthHeaderType = AuthHeaderType>(authHeaderType: unknown, expectType: StrictAuthHeaderType<T>): authHeaderType is T;
export function isAuthHeaderType<T extends AuthHeaderType = AuthHeaderType>(
	authHeaderType: unknown,
	expectType?: StrictAuthHeaderType<T>,
): authHeaderType is AuthHeaderType {
	if (typeof authHeaderType !== 'string') {
		return false;
	}
	if (expectType) {
		const typeArray = typeof expectType === 'string' ? [expectType] : Array.from(expectType);
		return authHeaderTypes.some((t) => t === authHeaderType) && typeArray.includes(authHeaderType as T);
	} else {
		return authHeaderTypes.some((t) => t === authHeaderType);
	}
}

/**
 * Check if have auth header type (case insensitive)
 * @since v0.0.1
 */
export function haveAuthHeaderType(authHeaderType: unknown): boolean {
	if (typeof authHeaderType !== 'string') {
		return false;
	}
	authHeaderType = authHeaderType.toUpperCase();
	return authHeaderTypes.some((t) => t === authHeaderType);
}

/**
 * AuthHeaderType assertion
 * @example
 * assertAuthHeaderType(headerType); // headerType: AuthHeaderType
 * assertAuthHeaderType(headerType, AuthHeaderTypeEnum.BASIC); // headerType: 'BASIC'
 * assertAuthHeaderType(headerType, [AuthHeaderTypeEnum.BASIC, AuthHeaderTypeEnum.BEARER]); // headerType: 'BASIC' | 'BEARER'
 * assertAuthHeaderType(headerType, new Set([AuthHeaderTypeEnum.BASIC, AuthHeaderTypeEnum.BEARER])); // headerType: 'BASIC' | 'BEARER'
 * @since v0.0.1
 */
export function assertAuthHeaderType<T extends AuthHeaderType = AuthHeaderType>(
	value: unknown,
	expectType?: StrictAuthHeaderType<T>,
): asserts value is AuthHeaderType;
export function assertAuthHeaderType<T extends AuthHeaderType = AuthHeaderType>(value: unknown, expectType: StrictAuthHeaderType<T>): asserts value is T;
export function assertAuthHeaderType<T extends AuthHeaderType = AuthHeaderType>(
	value: unknown,
	expectType?: StrictAuthHeaderType<T>,
): asserts value is AuthHeaderType {
	if (!isAuthHeaderType(value, expectType)) {
		if (expectType) {
			const typeStrings = typeof expectType === 'string' ? [expectType] : Array.from(expectType);
			throw new AuthHeaderError(`${JSON.stringify(value)} is not ["${typeStrings.join('", "')}"] auth header type`);
		}
		throw new AuthHeaderError(`${JSON.stringify(value)} is invalid auth header type`);
	}
}
