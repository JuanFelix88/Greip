import * as blessed from 'blessed'
import { menuProjects } from './management'
import { renderLoading } from '../loading'

declare namespace globalThis {
  let screenApp: blessed.Widgets.Screen | undefined
}

export const renderView = async () => {
  await renderLoading()

  // Create a screen object.
  const screen = (globalThis.screenApp =
    globalThis.screenApp ||
    blessed.screen({
      smartCSR: true,
      autoPadding: true
    }))

  screen.append(await menuProjects(screen))

  screen.render()

  // Quit on Escape, q, or Control-C.
  screen.key(['escape', 'q', 'C-c'], function(ch, key) {
    return process.exit(0)
  })
}
