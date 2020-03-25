import * as blessed from 'blessed'
import { Projects } from '../../database'
import chalk = require('chalk')

const toChalk = (item: string) => chalk`${item}`

export const renderProjectController = async (
	screen: blessed.Widgets.Screen,
	menu: blessed.Widgets.BoxElement,
	menuLeft: blessed.Widgets.BoxElement,
	project: Projects.Project
) => {
	menu.setLabel(
		chalk`| Project: {red ${project.name}} {green @${project.userName}} |`
	)
	menuLeft.setContent('')
	menuLeft.setLabel('')
	screen.render()

	const list = blessed.list({
		parent: menu,
		top: 1,
		left: 1,
		width: '95%',
		align: 'left',
		mouse: true,
		keys: true,
		vi: true,
		style: {
			selected: {
				bg: 'yellow',
				bold: true,
				fg: '#fff'
			},
			item: {
				fg: '#fff'
			}
		},
		items: [
			'Edit Project',
			'Libraries',
			'GitHub Repository',
			'Package in npm',
			chalk`{red Delete Project [dangerous]}`
		]
	})

	list.focus()

	list.select(0)

	screen.render()
}
