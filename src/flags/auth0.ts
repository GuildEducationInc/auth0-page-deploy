import { flags } from '@oclif/command'

const auth0Domain = flags.build({
  char: 'd',
  description: 'Auth0 domain',
  env: 'AUTH0_DOMAIN',
  required: true
})

const auth0AccessToken = flags.build({
  description: 'Auth0 Management API access token',
  env: 'AUTH0_ACCESS_TOKEN',
  exclusive: ['clientId', 'clientSecret']
})

const auth0ClientId = flags.build({
  description: 'Auth0 client id to use to obtain an access token',
  env: 'AUTH0_CLIENT_ID',
  dependsOn: ['clientSecret'],
  exclusive: ['token']
})

const auth0ClientSecret = flags.build({
  description: 'Auth0 client secret to use to obtain an access token',
  env: 'AUTH0_CLIENT_SECRET',
  dependsOn: ['clientId'],
  exclusive: ['token']
})

export interface Auth0Flags {
  domain?: string
  token?: string
  clientId?: string
  clientSecret?: string
}

export const auth0Flags = {
  domain: auth0Domain(),
  token: auth0AccessToken(),
  clientId: auth0ClientId(),
  clientSecret: auth0ClientSecret()
}

export function checkAuth0Flags(flags: Auth0Flags): boolean {
  return !!(flags.token || (flags.clientId && flags.clientSecret))
}
