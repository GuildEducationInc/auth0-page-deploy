import { ManagementClient, ManagementClientOptions } from 'auth0'

import { Auth0Flags } from './flags/auth0'

const DEFAULT_SCOPE =
  'read:tenant_settings update:tenant_settings read:clients update:clients'

export function buildManagementClient(
  flags: Auth0Flags,
  options?: ManagementClientOptions
): ManagementClient {
  // Only scope to the permissions we need to do page updates by default
  // Login page is updated on the client. Other pages are tenent settings
  const buildOptions: ManagementClientOptions = {
    domain: '',
    scope: DEFAULT_SCOPE,
    ...flags,
    ...options
  }
  return new ManagementClient(buildOptions)
}
