import { Data, ManagementClient } from 'auth0'
import path from 'path'

import { loadPage, Page } from './page'

const PAGE_NAMES = [
  'login.html',
  'password_reset.html',
  'guardian_multifactor.html',
  'error_page.html'
]

const PAGE_NAME_MAP: { [key: string]: string } = {
  guardian_multifactor: 'guardian_mfa_page',
  password_reset: 'change_password',
  error_page: 'error_page'
}

// Loosely based on https://github.com/auth0-extensions/auth0-source-control-extension-tools/blob/master/src/auth0/handlers/pages.js
export default class PageDeployer {
  static isValidPage(fileName: string): boolean {
    return PAGE_NAMES.indexOf(path.basename(fileName, '.html')) >= 0
  }

  constructor(private readonly client: ManagementClient) {}

  deployPage(pagePath: string): Promise<any> {
    const page = loadPage(pagePath)

    return this.isLoginPage(page)
      ? this.updateLoginPage(page)
      : this.updatePages([page])
  }

  // deployPages() {}

  private async updateLoginPage(page: Page) {
    const globalClients = await this.client.getClients({ is_global: true })
    const globalClient = globalClients.length && globalClients[0]

    if (!globalClient) {
      throw new Error(
        'Unable to find global client id when trying to update the login page'
      )
    }

    return this.client.updateClient(
      { client_id: globalClient.client_id! }, // FIXME make this not need !
      {
        custom_login_page: page.html,
        custom_login_page_on: page.enabled
      }
    )
  }

  private async updatePages(pages: Page[]) {
    const updateData = pages.reduce((accum: Data, page: Page) => {
      const pageName = PAGE_NAME_MAP[page.name]
      if (!pageName) {
        throw new Error(
          `Unable to map page ${page.name} into tenant level page setting`
        )
      }
      const { html, enabled } = page
      accum[pageName] = { enabled, html }

      return accum
    }, {})

    if (Object.keys(updateData).length) {
      return this.client.updateTenantSettings(updateData)
    }
  }

  private isLoginPage(page: Page) {
    return page.name === 'login'
  }
}
