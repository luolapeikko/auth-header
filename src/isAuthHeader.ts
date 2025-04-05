import {getAuthHeaderRegex} from './lib/utils';

/**
 * Check if string value is valid auth header
 * @param {string | null | undefined} header - value to be checked
 * @returns {boolean} - if value is valid auth header
 * @since v0.0.1
 */
export function isAuthHeaderString(header: string | null | undefined): boolean {
	return typeof header === 'string' && RegExp(getAuthHeaderRegex()).test(header);
}
