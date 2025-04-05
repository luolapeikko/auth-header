export * from './IAuthHeader';
/**
 * Authorization scheme types
 * @since v0.0.1
 */
export const authorizationSchemeTypes = Object.freeze([
	'BEARER',
	'BASIC',
	'DIGEST',
	'HOBA',
	'MUTUAL',
	'NEGOTIATE',
	'NTLM',
	'VAPID',
	'AWS4-HMAC-SHA256',
] as const);
/**
 * Authorization scheme type
 * @since v0.0.1
 */
export type AuthorizationSchemeType = (typeof authorizationSchemeTypes)[number];
