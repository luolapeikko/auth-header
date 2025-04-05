import {Err, type IErr, type IOk, Ok} from '@luolapeikko/result-option';
import {AuthHeaderError} from './AuthHeaderError';
import {AbstractHeader, BasicAuthHeader, CommonAuthHeader, extractHeaderPack} from './lib';
import {type AuthorizationSchemeType} from './types';

type CommonHeaderTypes = Exclude<AuthorizationSchemeType, 'BASIC'>;
type AllInstanceTypes = BasicAuthHeader | CommonAuthHeader<CommonHeaderTypes>;
export type AuthHeader<AuthSchemeType extends AuthorizationSchemeType = AuthorizationSchemeType> = AllInstanceTypes & {scheme: AuthSchemeType};

/**
 * AuthHeader type and constructor
 * @example
 * const basicAuthHeader: AuthHeader<'BASIC'> = AuthHeader('Basic VVNFUk5BTUU6UEFTU1dE', ['BASIC']).unwrap();
 * const authHeader: AuthHeader = AuthHeader(req.header.authorization).unwrap();
 * if (authHeader.scheme === 'BASIC') {
 *	 const username = authHeader.getUsername();
 *	 const password = authHeader.getPassword();
 * }
 * const credentials = authHeader.getCredentials();
 * @template AuthSchemeType - auth header type
 * @param {string |null | undefined} rawHeader - raw authorization header
 * @param {AuthSchemeType | Iterable<AuthSchemeType>} allowedSchemes - allowed auth header types
 * @returns {IOk<AuthHeader<AuthSchemeType>> | IErr<AuthHeaderError>} - Result with AuthHeader instance or AuthHeaderError
 * @throws {AuthHeaderError} if rawHeader is not a valid auth header or if auth header type is not allowed
 * @since v0.0.1
 */
export function AuthHeader<AuthSchemeType extends AuthorizationSchemeType = AuthorizationSchemeType>(
	rawHeader: string | null | undefined,
	allowedSchemes?: AuthSchemeType | Iterable<AuthSchemeType>,
): IOk<AuthHeader<AuthSchemeType>> | IErr<AuthHeaderError> {
	if (typeof rawHeader !== 'string') {
		return Err(new AuthHeaderError(`${JSON.stringify(rawHeader)} is not a authorization header`));
	}
	// only run regex once to build headerPack to construct class instances
	const packResult = extractHeaderPack(rawHeader);
	if (packResult.isErr) {
		return packResult;
	}
	const headerPack = packResult.ok();
	// check if auth header type is allowed
	if (allowedSchemes) {
		const schemeList = typeof allowedSchemes === 'string' ? [allowedSchemes] : Array.from(allowedSchemes);
		if (!schemeList.includes(headerPack.scheme as AuthSchemeType)) {
			return Err(new AuthHeaderError(`${JSON.stringify(headerPack.scheme)} is not ["${schemeList.join('", "')}"] authorization header scheme`));
		}
	}
	// create auth header instances
	switch (headerPack.scheme) {
		case 'BASIC':
			return Ok(new BasicAuthHeader(headerPack) as AuthHeader<AuthSchemeType>);
		case 'BEARER':
		case 'DIGEST':
		case 'HOBA':
		case 'MUTUAL':
		case 'NEGOTIATE':
		case 'NTLM':
		case 'VAPID':
		case 'AWS4-HMAC-SHA256':
			return Ok(new CommonAuthHeader(headerPack) as AuthHeader<AuthSchemeType>);
		/* v8 ignore next 2 */
		default:
			return Err(new AuthHeaderError(`Unknown auth header type: ${JSON.stringify(headerPack satisfies never)}`));
	}
}

/**
 * Check if value is AuthHeader instance
 * @template AuthSchemeType - auth header type
 * @param {unknown} value - value to be checked
 * @returns {boolean} - if value is AuthHeader instance
 * @since v0.0.1
 */
export function isAuthHeaderInstance<AuthSchemeType extends AuthorizationSchemeType = AuthorizationSchemeType>(
	value: unknown,
): value is AuthHeader<AuthSchemeType> {
	return value instanceof AbstractHeader;
}
