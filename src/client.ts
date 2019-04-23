import { ManagementClient, ManagementClientOptions } from 'auth0'

export function buildManagementClient(
  options?: ManagementClientOptions
): ManagementClient {
  // Only scope to the permissions we need to do page updates by default
  // Login page is updated on the client. Other pages are tenent settings
  let cleanOptions = options || {
    domain: process.env.AUTH0_DOMAIN!,
    clientId: process.env.AUTH0_CLIENT_ID,
    clientSecret: process.env.AUTH0_CLIENT_SECRET,
    scope:
      'read:tenant_settings update:tenant_settings read:clients update:clients'
  }
  return new ManagementClient(cleanOptions)
}
