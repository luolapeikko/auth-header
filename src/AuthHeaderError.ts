/**
 * Error class for when the Authorization header is missing or invalid.
 * @since v0.0.1
 */
export class AuthHeaderError extends Error {
	public constructor(message: string) {
		super(message);
		this.name = 'AuthHeaderError';
		Error.captureStackTrace(this, this.constructor);
	}
}
