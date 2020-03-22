import { GluegunToolbox } from 'gluegun'
import { prompt } from 'inquirer'
import suggest from 'inquirer-prompt-suggest'
import { Projects } from '../../database'
import { spawn } from 'child_process'

prompt.registerPrompt('suggest', suggest)

export default {
  name: 'load',
  alias: ['l'],
  run: async (toolbox: GluegunToolbox) => {
    const {
      parameters,
      print: { error, success },
      filesystem: {},
      system
    } = toolbox

    const projectName = parameters.first as string | undefined

    if (!projectName) {
      const projects = await Projects.findAll(() => true)

      const projectsName = projects.map(({ name }) => name)

      const { projectName } = await prompt([
        {
          type: 'list',
          name: 'projectName',
          message: 'Choose the project according to the list below:',
          choices: projectsName
        }
      ])

      const project = projects.find(({ name }) => name === projectName)

      const { dir } = project

      await system.exec(`code ${dir}`)

      spawn('bash', ['-i'], {
        cwd: dir,
        stdio: 'inherit'
      })

      success('Project loaded!')
    } else {
      const [project] = await Projects.findAll(
        ({ name }) => name === projectName
      )

      if (!project) return error('Project not found by name, try again.')

      const { dir } = project

      await system.exec(`code ${dir}`)

      spawn('bash', ['-i'], {
        cwd: dir,
        stdio: 'inherit'
      })

      success('Project loaded!')
    }
  }
}
