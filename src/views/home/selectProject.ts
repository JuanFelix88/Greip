import * as blessed from 'blessed'
import { Projects } from '../../database'
import { renderInfo } from './projectInfo'
import { renderProjectController } from './projectController'
import chalk = require('chalk')

export const selectProject = async (
	screen: blessed.Widgets.Screen,
	menu: blessed.Widgets.BoxElement,
	menuLeft: blessed.Widgets.BoxElement,
	root: blessed.Widgets.LayoutElement
) => {
	const projects = await Projects.findAll(() => true)

	const projectsItems = projects.map(
		({ name, userName, createdAt }) =>
			`${name} @${userName} - Added in ${createdAt.substr(
				0,
				10
			)} at ${new Date(createdAt).getUTCHours()}:${new Date(
				createdAt
			).getUTCMinutes()}:${new Date(createdAt).getUTCSeconds()}`
	)

	menu.setLabel('| Projects |')

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
		items: [chalk`{cyan [Previous]}`, ...projectsItems]
	})

	const initialItem = 1

	list.on('select item', async item => {
		if (/previous/gi.test(item.getText())) {
			menuLeft.setContent('\n Select something to view.')
			screen.render()
			return
		}
		const project = projects[projectsItems.indexOf(item.getText())]

		await renderInfo(menuLeft, project)
	})

	list.on('select', async item => {
		const project = projects[projectsItems.indexOf(item.getText())]

		list.destroy()
		screen.render()
		await renderProjectController(screen, menu, menuLeft, project)
	})

	list.focus()
	list.select(initialItem)

	renderInfo(menuLeft, projects[initialItem])

	screen.render()
}
