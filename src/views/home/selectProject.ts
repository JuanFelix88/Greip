import * as blessed from 'blessed'
import { Projects } from '../../database'

export const selectProject = async (
  screen: blessed.Widgets.Screen,
  menu: blessed.Widgets.BoxElement
) => {
  const projects = (await Projects.findAll(() => true)).map(
    ({ name, userName, createdAt }) =>
      `${name} @${userName} - Added in ${createdAt.substr(0, 10)} at ${new Date(
        createdAt
      ).getUTCHours()}:${new Date(createdAt).getUTCMinutes()}:${new Date(
        createdAt
      ).getUTCSeconds()}`
  )

  menu.setLabel('| Select project |')

  const list = blessed.list({
    parent: menu,
    top: 1,
    align: 'left',
    left: 1,
    right: 3,
    mouse: true,
    keys: true,
    vi: true,
    style: {
      selected: {
        bg: 'cyan',
        fg: '#000'
      },
      item: {
        fg: '#fff'
      }
    },
    items: projects
  })

  list.on('select', async item => {
    list.destroy()
    screen.render()
  })

  list.select(0)

  list.focus()

  screen.render()
}
