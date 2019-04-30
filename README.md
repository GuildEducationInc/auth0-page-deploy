auth0-page-deploy
=================

Simple tool to deploy one or more Auth0 hosted pages

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/auth0-page-deploy.svg)](https://npmjs.org/package/auth0-page-deploy)
[![Downloads/week](https://img.shields.io/npm/dw/auth0-page-deploy.svg)](https://npmjs.org/package/auth0-page-deploy)
[![License](https://img.shields.io/npm/l/auth0-page-deploy.svg)](https://github.com/GuildEducationInc/auth0-page-deploy/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g auth0-page-deploy
$ auth0-page-deploy COMMAND
running command...
$ auth0-page-deploy (-v|--version|version)
auth0-page-deploy/1.0.0 darwin-x64 node-v10.6.0
$ auth0-page-deploy --help [COMMAND]
USAGE
  $ auth0-page-deploy COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`auth0-page-deploy deploy [FILE]`](#auth0-page-deploy-deploy-file)
* [`auth0-page-deploy deploy-all [GLOB]`](#auth0-page-deploy-deploy-all-glob)
* [`auth0-page-deploy help [COMMAND]`](#auth0-page-deploy-help-command)

## `auth0-page-deploy deploy [FILE]`

Deploy an Auth0 page

```
USAGE
  $ auth0-page-deploy deploy [FILE]

OPTIONS
  -n, --name=name              name of Auth0 page
  --accessToken=accessToken    Auth0 Management API access token
  --clientId=clientId          Auth0 client id to use to obtain an access token
  --clientSecret=clientSecret  Auth0 client secret to use to obtain an access token
  --domain=domain              (required) Auth0 domain
```

_See code: [src/commands/deploy.ts](https://github.com/GuildEducationInc/auth0-page-deploy/blob/v1.0.0/src/commands/deploy.ts)_

## `auth0-page-deploy deploy-all [GLOB]`

Deploy all provided Auth0 pages

```
USAGE
  $ auth0-page-deploy deploy-all [GLOB]

OPTIONS
  --accessToken=accessToken    Auth0 Management API access token
  --clientId=clientId          Auth0 client id to use to obtain an access token
  --clientSecret=clientSecret  Auth0 client secret to use to obtain an access token
  --domain=domain              (required) Auth0 domain
```

_See code: [src/commands/deploy-all.ts](https://github.com/GuildEducationInc/auth0-page-deploy/blob/v1.0.0/src/commands/deploy-all.ts)_

## `auth0-page-deploy help [COMMAND]`

display help for auth0-page-deploy

```
USAGE
  $ auth0-page-deploy help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v2.1.6/src/commands/help.ts)_
<!-- commandsstop -->
