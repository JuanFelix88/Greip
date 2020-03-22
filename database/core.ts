import { readFileSync, writeFileSync } from 'fs'

const readDatabase = (): any => readFileSync(`${__dirname}/db.json`, 'utf8')

const writeDatabase = (data: any): any =>
  writeFileSync(`${__dirname}/db.json`, data)

type AddAttrFunc<T, R = T> = {
  onsave: (func: <T>(attr: R) => T) => void
  onread: (func: (internalValue: T, models: any) => R) => void
}

export interface Attributes {
  (path: string): any
}

class Model<T> {
  constructor(public name: string, public attrs: T) {}

  public create(objc): void {}
}

export const createModel = <T>(name: string, attrs: T) => {}

export const addAttr = <T, R>(func: (add: AddAttrFunc<T, R>) => void) => {
  let attr: {
    onread: Function
    onsave: Function
  } = {
    onread: (val, models) => val,
    onsave: attr => attr
  }

  const onread = func => {
    attr.onread = (val: any, models: any) => func(val)
  }

  const onsave = func => {
    attr.onread = (attr: any) => func(attr)
  }

  func({ onsave, onread })

  return attr
}
