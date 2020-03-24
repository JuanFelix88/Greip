import * as blessed from 'blessed'
import { Projects } from '../../database'
import { renderInfo } from './projectInfo'
import { renderProjectController } from './projectController'
import chalk = require('chalk')
import { renderView } from '.'

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

	screen.render()

	const list = blessed.list({
		parent: menu,
		top: 0,
		focusable: true,
		left: 1,
		tags: true,
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
		items: [chalk`{cyan [ ◄ ]}`, ...projectsItems]
	})

	const initialItem = 1

	list.on('select item', async item => {
		if (/◄/gi.test(item.getText())) {
			menuLeft.setContent('\n Select something to view.')
			list.style.selected.bg = 'default'
			list.style.selected.fg = 'green'
			screen.render()
			return
		}

		list.style.selected.bg = 'yellow'
		list.style.selected.fg = '#fff'
		screen.render()

		const project = projects[projectsItems.indexOf(item.getText())]

		await renderInfo(menuLeft, project)
	})

	list.on('select', async item => {
		if (/◄/gi.test(item.getText())) {
			list.destroy()
			menuLeft.destroy()
			menu.destroy()
			screen.render()
			await renderView()
			return
		}

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
