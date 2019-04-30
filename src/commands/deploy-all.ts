import { Command } from '@oclif/command'
import fg from 'fast-glob'

import { buildManagementClient } from '../client'
import { auth0Flags, checkAuth0Flags } from '../flags/auth0'
import PageDeployer from '../page-deployer'

export default class DeployAll extends Command {
  static description = 'Deploy all provided Auth0 pages'

  static flags = {
    ...auth0Flags
  }

  static args = [{ name: 'glob' }]

  async run() {
    const { args, flags } = this.parse(DeployAll)

    if (!checkAuth0Flags(flags)) {
      this.error(
        'Either an access token or client id/client secret must be specified'
      )
    }

    const files = await fg(args.glob || '*.html', { stats: false })
    const pages = []
    for (const entry of files) {
      const file = entry.toString()
      if (PageDeployer.isValidPage(file)) {
        pages.push(file)
      } else {
        this.log(`Skipping ${file} as it is not a valid page`)
      }
    }

    if (pages.length) {
      this.log(`Deploying\n\t${pages.join('\n\t')}...`)
      const client = buildManagementClient()
      await new PageDeployer(client).deployPages(pages)
    } else {
      this.error('No valid Auth0 pages found!')
    }
  }
}
