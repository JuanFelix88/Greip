import { GluegunCommand } from 'gluegun'
import { renderView } from '../views/home'

const command: GluegunCommand = {
	name: 'greip',
	run: async toolbox => {
		await renderView()
	}
}

export default command
