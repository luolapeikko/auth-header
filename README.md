# @luolapeikko/auth-header

Typescript/Javascript http auth header class and parser.

## Package includes:

- Function and Type: [AuthHeader](./src/AuthHeader.ts) - this function returns AuthHeader class as a Result instance when parse http auth header.
- Function: [isAuthHeaderString](./src/isAuthHeader.ts) - this function check if string value is valid auth header string.
- Function: [isAuthHeaderInstance](./src/AuthHeader.ts) - this type guard function to check if value is AuthHeader class instance.
- Class: [AuthHeaderError](./src/AuthHeaderError.ts) - Common error class for when the Authorization header is missing or invalid.
- Type: [AuthorizationSchemeType](./src/types/index.ts) - Authorization scheme type.
- Const: [authorizationSchemeTypes](./src/types/index.ts) - Authorization scheme types array.
- Interface: [IAuthHeader](./src/types/IAuthHeader.ts) - Interface type for base auth header instance.

## examples

Handle both raw jwt token string and http bearer jwt token string  

```typescript
import {AuthHeader, isAuthHeader} from '@luolapeikko/auth-header';

function handleBearerToken(rawTokenOrAuthBearer: string): void {
	const bearerAuthOrString: string | AuthHeader<'BEARER'> = isAuthHeader(rawTokenOrAuthBearer) ? AuthHeader(rawTokenOrAuthBearer, ['BEARER']).unwrap() : rawTokenOrAuthBearer;
	const token = typeof bearerAuthOrString === 'string' ? bearerAuthOrString : bearerAuthOrString.getCredentials();
	// validate Bearer value
}
```

Handle basic auth credentials

```typescript
function handleBasicAuth(authHeader: string | null | undefined): void {
	const basicAuth: AuthHeader<'BASIC'> = AuthHeader(authHeader, ['BASIC']).unwrap();
	// get and validate credentials
	const username = basicAuth.getUsername();
	const password = basicAuth.getPassword();
}
```
