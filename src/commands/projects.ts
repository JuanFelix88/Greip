import { GluegunToolbox } from 'gluegun'
import { renderView } from '../views/home'

export default {
  name: 'projects',
  alias: ['p'],
  run: async (toolbox: GluegunToolbox) => {
    await renderView()
  }
}
