import {type AuthHeaderCredentials, type AuthHeaderObject, type AuthHeaderString, type AuthHeaderType} from './types';
import {getAuthObject} from './authUtils';

export class AuthHeader implements AuthHeaderObject {
	public readonly type: AuthHeaderType;
	public readonly credentials: AuthHeaderCredentials;

	public static fromString(auth: string): AuthHeader {
		return new AuthHeader(auth);
	}

	protected constructor(auth: string) {
		const {type, credentials} = getAuthObject(auth);
		this.type = type;
		this.credentials = credentials;
	}

	/**
	 * @returns {AuthHeaderString} - auth string
	 */
	public toString(): AuthHeaderString {
		return `${this.type} ${this.credentials}`;
	}

	/**
	 * @returns {AuthHeaderObject} - auth object
	 */
	public toJSON(): AuthHeaderObject {
		return {type: this.type, credentials: this.credentials};
	}
}
