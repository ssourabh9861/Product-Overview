/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  COOKIE: 'api-dev.deskera.xyz',
  apiUrl: "https://shopdesk-dev.deskera.xyz",
  SSO_LOGGED_IN_STATUS_URL: 'https://api-dev.deskera.xyz/v1/iam/auth/sign-in/login/status',
  SSO_AUTH_URL: 'https://auth-dev.deskera.xyz?redirectUrl=',
};
