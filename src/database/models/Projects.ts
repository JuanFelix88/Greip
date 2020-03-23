import { readDatabase, writeDatabase, getProxId } from '..'

export interface Project {
  id: number
  name: string
  libs: string[]
  dir: string
  mode: 'private' | 'public'
  pass?: string
  userName: string
  userId?: number
  createdAt: string
}

export interface InputProject {
  name: string
  dir: string
  mode: 'private' | 'public'
  pass?: string
}

export async function createNewProject(data: InputProject): Promise<Project> {
  const dataBase = readDatabase()

  const { name } = data

  const existsInDataBase = !!dataBase.models.projects.data.find(
    ({ name: projectName }) => projectName === name
  )

  if (existsInDataBase) {
    throw new Error('The name is already in use, try another name.')
  }

  const index =
    dataBase.models.projects.data.push({
      id: getProxId<Project>(dataBase.models.projects),
      libs: [],
      createdAt: new Date().toISOString(),
      userName: 'unknown',
      ...data
    }) - 1

  const project = dataBase.models.projects.data[index]

  writeDatabase(dataBase)

  return project
}

export async function findAll(
  func: (item: Project) => boolean
): Promise<Project[]> {
  const dataBase = readDatabase()

  return dataBase.models.projects.data.filter(func)
}
