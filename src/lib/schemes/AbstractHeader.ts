import {type AuthorizationSchemeType} from '../../types';
import {type IAuthHeader} from '../../types/IAuthHeader';
import {type HeaderPack} from '../utils';

export abstract class AbstractHeader<S extends AuthorizationSchemeType, Cred extends string = string> implements IAuthHeader<S, Cred> {
	public abstract readonly scheme: S;
	protected readonly headerPack: HeaderPack;
	public constructor(headerPack: HeaderPack) {
		this.headerPack = headerPack;
	}

	public getCredentials(): Cred {
		if (this.scheme !== this.headerPack.scheme) {
			throw new Error('scheme mismatch');
		}
		return this.buildCredentials(this.headerPack.credentials);
	}

	public toString(): string {
		return this.headerPack.rawHeader;
	}

	public toJSON(): {scheme: S; credentials: Cred} {
		return {scheme: this.scheme, credentials: this.getCredentials()};
	}

	protected abstract buildCredentials(credentials: string): Cred;
}
