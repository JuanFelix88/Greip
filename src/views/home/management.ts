import * as blessed from 'blessed'
import { selectProject } from './selectProject'

export const menuProjects = async (
  screen: blessed.Widgets.Screen,
  root: blessed.Widgets.LayoutElement
) => {
  const menu = blessed.box({
    parent: root,
    top: 'top',
    left: 'left',
    width: '60%',
    height: '70%',
    label: '| Project Management |',
    vi: true,
    border: { type: 'line' },
    style: {
      border: {
        fg: '#f0f0f0'
      }
    }
  })

  const menuLeft = blessed.box({
    parent: root,
    top: 'top',
    left: '10%',
    width: '30%',
    height: '70%',
    vi: true,
    content: '\n Select something to view.',
    label: '| Info |',
    border: { type: 'line' },
    style: {
      border: {
        fg: '#f0f0f0'
      }
    }
  })

  menu.focus()

  const list = blessed.list({
    parent: menu,
    top: 1,
    align: 'left',
    left: 1,
    right: 1,
    mouse: true,
    keys: true,
    vi: true,
    style: {
      selected: {
        bg: 'yellow',
        fg: '#000'
      },
      item: {
        fg: '#fff'
      }
    },
    items: ['Select Project', 'Edit Project', 'Remove Project']
  })

  list.on('select', async item => {
    const name = item.getText()
    list.destroy()

    if (name === 'Select Project') {
      await selectProject(screen, menu, menuLeft, root)
    }
  })

  list.select(0)

  list.focus()

  return menu
}
