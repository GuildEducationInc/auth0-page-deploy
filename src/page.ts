import fs from 'fs'
import path from 'path'

export type Page = {
  name: string;
  html: string;
  enabled: boolean;
}

export function loadPage(pagePath: string): Page {
  const name = path.basename(pagePath, '.html')
  const jsonFile = pagePath.replace('html', 'json')
  return {
    name,
    html: fs.readFileSync(pagePath).toString(),
    enabled: JSON.parse(fs.readFileSync(jsonFile).toString()).enabled
  }
}
