import * as blessed from 'blessed'
import { logo } from '../logo'
import { red } from 'chalk'

const logoAnimation = logo.map(frame => red(frame))

const awaiter = (time: number) =>
  new Promise<void>(resolve => {
    setTimeout(resolve, time)
  })

const renderAnimationLogo = async (
  screen: blessed.Widgets.Screen,
  text: blessed.Widgets.TextElement
) => {
  for (const frame of logoAnimation) {
    text.setContent(frame)
    await awaiter(22)
    screen.render()
  }
}

export const renderLoading = async (screen: blessed.Widgets.Screen) => {
  const view = blessed.text({
    top: 'center',
    left: 'center',
    padding: 2,
    vi: true,
    border: { type: 'bg' }
  })

  screen.top = 'center'
  screen.left = 'center'

  screen.append(view)

  view.focus()

  screen.render()

  await awaiter(50)
  await renderAnimationLogo(screen, view)

  await awaiter(2000)

  view.destroy()
}
