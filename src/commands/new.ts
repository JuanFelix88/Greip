import { GluegunToolbox } from 'gluegun'
import { prompt } from 'inquirer'
import suggest from 'inquirer-prompt-suggest'
import { dirname } from 'path'
import { Projects } from '../database'

export default {
  name: 'new',
  alias: ['n'],
  run: async (toolbox: GluegunToolbox) => {
    prompt.registerPrompt('suggest', suggest)
    const {
      parameters: { first },
      filesystem: { cwd },
      print: { error, success }
    } = toolbox

    if (first !== 'project') return error('Not parameter')

    const dirCommand = cwd()

    const projectNameSuggestion = dirCommand
      .replace(dirname(dirCommand), '')
      .substr(1)

    console.clear()

    const initialInformation = await prompt([
      {
        type: 'suggest',
        name: 'name',
        message: 'What is the name of your project?',
        suggestions: [projectNameSuggestion]
      },
      {
        type: 'list',
        name: 'projectMode',
        message: 'The project will be public or private?',
        choices: ['Private', 'Public']
      }
    ])

    const { projectMode, name } = initialInformation

    const { pin }: { pin: string } =
      (projectMode as string) === 'Private'
        ? await prompt([
            {
              type: 'password',
              name: 'pin',
              mask: '*',
              message:
                'Do you want to include a password pin? If yes, type below (4 numbers):',
              default: '',
              validate: (value: string) =>
                (/\d/.test(value) && value.length === 4) ||
                'The password cannot be a valid four-digit pin'
            }
          ])
        : { pin: '' }

    Projects.createNewProject({
      dir: cwd(),
      mode: projectMode,
      name,
      pass: pin.length === 4 ? pin : undefined
    })
      .then(() => success('Project successfully created!'))
      .catch(() => error('Project name already exists, try other name.'))
  }
}
