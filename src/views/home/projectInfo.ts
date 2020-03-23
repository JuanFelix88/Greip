import * as blessed from 'blessed'
import { Projects } from '../../database'
import chalk = require('chalk')

export const renderInfo = async (
  menuLeft: blessed.Widgets.BoxElement,
  project: Projects.Project
) => {
  if (!project) {
    menuLeft.setContent(chalk.red('\n Error on rendering project info.'))
    menuLeft.render()
  }

  menuLeft.setContent(
    chalk`
 Project name: {green ${project.name}}
 User owner: {green @${project.userName}}
 Mode: {green ${project.mode}} 
 Password: {green ${project.pass ? '****' : 'n/a'}}
 Created at: {green ${project.createdAt.substr(
   0,
   10
 )} ${project.createdAt.substr(11, 5)}}
     `
  )

  menuLeft.render()
}
