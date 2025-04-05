import {type AuthorizationSchemeType} from '../../types';
import {type HeaderPack} from '../utils';
import {AbstractHeader} from './AbstractHeader';

export type CommonAuthCredentials<Brand extends `${string}`> = `${string}` & {__authHeaderType: Brand};

/**
 * Type guard for CommonAuthCredentials
 * @template AuthType - auth header type
 * @param {AuthType} _type - auth header type
 * @param {string | null | undefined} value - value to be checked
 * @returns {CommonAuthCredentials} - if value is valid CommonAuthCredentials
 * @throws {TypeError} - if value is not a valid CommonAuthCredentials
 * @since v0.0.1
 */
export function CommonAuthCredentials<AuthType extends `${string}`>(_type: AuthType, value: string): CommonAuthCredentials<AuthType> {
	return value as CommonAuthCredentials<AuthType>;
}

export class CommonAuthHeader<T extends AuthorizationSchemeType> extends AbstractHeader<T, CommonAuthCredentials<T>> {
	public readonly scheme: T;
	public constructor(headerPack: HeaderPack<T>) {
		super(headerPack);
		this.scheme = headerPack.scheme;
	}

	protected buildCredentials(credentials: string) {
		return CommonAuthCredentials(this.scheme, credentials);
	}
}
