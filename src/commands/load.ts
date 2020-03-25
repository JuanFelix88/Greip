import { GluegunToolbox } from 'gluegun'
import { prompt } from 'inquirer'
import suggest from 'inquirer-prompt-suggest'
import { Projects } from '../database'
import { spawn, exec } from 'child_process'
import * as os from 'os'

const loadProjectInUnix = ({}: GluegunToolbox, projectDir: string) => {
    spawn('bash', ['-i'], {
        cwd: projectDir,
        stdio: 'inherit'
    })
}

const loadProjectInWin = ({}: GluegunToolbox, projectDir: string) => {
    spawn('cmd', ['-i'], {
        cwd: projectDir,
        stdio: 'inherit'
    })
}

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

        prompt.registerPrompt('suggest', suggest)

        const projectName = parameters.first

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

            const platform = os.platform()

            const loadProjectTerminal = /win/i.test(platform)
                ? loadProjectInWin
                : loadProjectInUnix

            loadProjectTerminal(toolbox, dir)

            success('Project loaded!')
        } else {
            const [project] = await Projects.findAll(
                ({ name }) => name === projectName
            )

            if (!project) return error('Project not found by name, try again.')

            const { dir } = project

            await system.exec(`code ${dir}`)

            success('Project loaded!')
        }
    }
}
