import { logo } from '../logo'
import { yellow } from 'chalk'

const logoAnimation = logo.map(frame => yellow(frame))

const awaiter = (time: number) =>
	new Promise<void>(resolve => {
		setTimeout(resolve, time)
	})

const renderAnimationLogo = async () => {
	for (const frame of logoAnimation) {
		await awaiter(27)
		console.clear()
		console.log(frame)
	}
}

export const renderLoading = async () => {
	await renderAnimationLogo()

	await awaiter(500)
	console.clear()
}
