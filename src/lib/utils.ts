import {Err, type IErr, type IOk, Ok} from '@luolapeikko/result-option';
import {AuthHeaderError} from '../AuthHeaderError';
import {type AuthorizationSchemeType, authorizationSchemeTypes} from '../types';

/**
 * from https://github.com/typed-rocks/typescript/blob/main/one_of.ts
 * @template TypesArray - array of types
 * @template Res - result type
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type MergeTypes<TypesArray extends any[], Res = {}> = TypesArray extends [infer Head, ...infer Rem] ? MergeTypes<Rem, Res & Head> : Res;
type OnlyFirst<F, S> = F & {[Key in keyof Omit<S, keyof F>]?: never};
type OneOf<TypesArray extends any[], Res = never, AllProperties = MergeTypes<TypesArray>> = TypesArray extends [infer Head, ...infer Rem]
	? OneOf<Rem, Res | OnlyFirst<Head, AllProperties>, AllProperties>
	: Res;

let authHeaderRegex: RegExp | undefined;
/**
 * Builds a regex to match a valid auth header
 * @returns {RegExp} - regex for matching a valid auth header
 * @since v0.0.1
 */
export function getAuthHeaderRegex(): RegExp {
	authHeaderRegex ??= new RegExp(`^(${authorizationSchemeTypes.join('|')}) (.*)$`, 'i');
	return authHeaderRegex;
}

/**
 * Type of auth header pack after regex match
 * @template Scheme - auth header scheme type
 * @since v0.0.1
 */
export type HeaderPack<Scheme extends AuthorizationSchemeType = AuthorizationSchemeType> = {
	scheme: Scheme;
	credentials: string;
	rawHeader: string;
};

export type AnyHeaderPack = OneOf<
	[
		HeaderPack<'BEARER'>,
		HeaderPack<'BASIC'>,
		HeaderPack<'DIGEST'>,
		HeaderPack<'HOBA'>,
		HeaderPack<'MUTUAL'>,
		HeaderPack<'NEGOTIATE'>,
		HeaderPack<'NTLM'>,
		HeaderPack<'VAPID'>,
		HeaderPack<'AWS4-HMAC-SHA256'>,
	]
>;

/**
 * This validates and builds a HeaderPack (scheme, credentials, rawHeader)
 * @template Scheme - auth header scheme type
 * @param {string} rawHeader - raw http auth header
 * @returns {IOk<HeaderPack> | IErr<AuthHeaderError>} - HeaderPack result
 * @throws {AuthHeaderError} - if rawHeader is not a valid auth header
 * @since v0.0.1
 */
export function extractHeaderPack(rawHeader: string): IOk<AnyHeaderPack> | IErr<AuthHeaderError> {
	const match = RegExp(getAuthHeaderRegex()).exec(rawHeader);
	if (!match) {
		return Err(new AuthHeaderError(`${JSON.stringify(rawHeader)} is not a authorization header`));
	}
	return Ok({
		scheme: match[1].toUpperCase(),
		credentials: match[2],
		rawHeader,
	} as AnyHeaderPack);
}

/**
 * Base64 encode
 * @param {string} input - string to be encoded
 * @returns {string} - base64 encoded string
 * @since v0.0.1
 */
export function base64Encode(input: string): string {
	/* v8 ignore next 3 */
	if (typeof window !== 'undefined') {
		return window.btoa(input);
	} else {
		return Buffer.from(input).toString('base64');
	}
}

/**
 * Base64 decode
 * @param {string} input - base64 encoded string
 * @returns {string} - decoded string
 * @since v0.0.1
 */
export function base64Decode(input: string): string {
	/* v8 ignore next 3 */
	if (typeof window !== 'undefined') {
		return window.atob(input);
	} else {
		return Buffer.from(input, 'base64').toString();
	}
}
