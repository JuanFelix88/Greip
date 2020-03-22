import { GluegunCommand } from 'gluegun'

const command: GluegunCommand = {
  name: 'greip',
  run: async toolbox => {
    const { print } = toolbox

    print.info('Welcome to your CLI')
  }
}

export default command
