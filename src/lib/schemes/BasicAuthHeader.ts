import {AuthHeaderError} from '../../AuthHeaderError';
import {base64Decode} from '../utils';
import {AbstractHeader} from './AbstractHeader';

export type BasicAuthCredentials = `${string}:${string}`;

/**
 * Type guard for BasicAuthCredentials
 * @param {string} raw - raw string value without base64 decode
 * @param {string} decoded - value to be checked
 * @returns {BasicAuthCredentials} - if value is valid BasicAuthCredentials
 * @throws {TypeError} - if value is not a valid BasicAuthCredentials
 * @since v0.0.1
 */
export function BasicAuthCredentials(raw: string, decoded: string): BasicAuthCredentials {
	if (!decoded.includes(':')) {
		throw new AuthHeaderError(`${JSON.stringify(raw)} is not a BasicAuthCredentials`);
	}
	return decoded as BasicAuthCredentials;
}

export class BasicAuthHeader extends AbstractHeader<'BASIC', BasicAuthCredentials> {
	public readonly scheme = 'BASIC';
	public getUsername(): string {
		return this.getCredentials().split(':', 2)[0];
	}

	public getPassword(): string {
		return this.getCredentials().split(':', 2)[1];
	}

	protected buildCredentials(credentials: string): BasicAuthCredentials {
		return BasicAuthCredentials(credentials, base64Decode(credentials));
	}
}
