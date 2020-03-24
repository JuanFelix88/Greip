import * as blessed from 'blessed'
import { menuProjects } from './management'
import { renderLoading } from '../loading'

declare namespace globalThis {
	let screenApp: blessed.Widgets.Screen | undefined
}

export const renderView = async () => {
	globalThis.screenApp && (await renderLoading())

	// Create a screen object.
	const screen = (globalThis.screenApp =
		globalThis.screenApp ||
		blessed.screen({
			smartCSR: true,
			autoPadding: true
		}))

	const root = blessed.layout({
		parent: screen,
		top: 'center',
		left: 'center',
		width: '100%',
		height: '100%',
		border: 'bg',
		layout: 'grid'
	})

	await menuProjects(screen, root)

	screen.render()

	// Quit on Escape, q, or Control-C.
	screen.key(['escape', 'q', 'C-c'], function(ch, key) {
		return process.exit(0)
	})
}
