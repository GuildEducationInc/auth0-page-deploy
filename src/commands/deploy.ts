import { Command, flags } from '@oclif/command'
import path from 'path'

import { buildManagementClient } from '../client'
import { auth0Flags, checkAuth0Flags } from '../flags/auth0'
import PageDeployer from '../page-deployer'

export default class Deploy extends Command {
  static description = 'Deploy an Auth0 page'

  static flags = {
    name: flags.string({ char: 'n', description: 'name of Auth0 page' }),
    ...auth0Flags
  }

  static args = [{ name: 'file' }]

  async run() {
    const { args, flags } = this.parse(Deploy)

    if (!checkAuth0Flags(flags)) {
      this.error(
        'Either an access token or client id/client secret must be specified'
      )
    }

    const fileName = flags.name || path.basename(args.file)
    if (PageDeployer.isValidPage(fileName)) {
      this.log(`Deploying ${fileName}...`)
      const client = buildManagementClient()
      await new PageDeployer(client).deployPage(args.file)
    } else {
      this.error(
        `${fileName} is not a valid Auth0 hosted page! Please see https://auth0.com/docs/extensions/github-deploy#deploy-universal-login-pages for valid page names`
      )
    }
  }
}
