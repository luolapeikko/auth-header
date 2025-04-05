import {type AuthorizationSchemeType} from '.';

/**
 * Interface for auth header instance
 * @template S - auth header scheme type
 * @template Cred - auth header credentials type
 * @since v0.0.1
 */
export interface IAuthHeader<S extends AuthorizationSchemeType, Cred extends string = string> {
	getCredentials(): Cred;
	toString(): string;
	toJSON(): {scheme: S; credentials: Cred};
}
