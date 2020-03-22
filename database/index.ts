import { readFileSync, writeFileSync } from 'fs'
import { Project } from './models/Projects'
export * as Projects from './models/Projects'

export type Model<T> = {
  meta: {
    protocol: number
  }
  data: T[]
}

interface DataJson {
  login: {
    nick: string | null
    pass: string | null
    token: string | null
  }
  models: {
    projects: Model<Project>
  }
}

export const readDatabase = (): DataJson =>
  JSON.parse(readFileSync(`${__dirname}/db.json`, 'utf8'))

export const writeDatabase = (data: any): any =>
  writeFileSync(`${__dirname}/db.json`, JSON.stringify(data))

export function getProxId<T>(model: Model<T>): number {
  model.meta.protocol += 1
  return model.meta.protocol
}
