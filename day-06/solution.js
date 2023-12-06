const { readData } = require('../utils/helper')

const data = readData('input.txt')

const firstLevel = () => {
	
}

const secondLevel = () => {
	const raceTime = parseInt(
		data.shift().split(':')[1].trim().replaceAll(' ', '')
	)
	const recordDistance = parseInt(
		data.shift().split(':')[1].trim().replaceAll(' ', '')
	)

	let waysToWin = 0
	for (let j = 0; j < raceTime; j++) {
		const remainingTime = raceTime - j
		const points = remainingTime * j
		if (points > recordDistance) waysToWin++
	}

	console.log(`Second level solution:\t${waysToWin}`)
}

secondLevel()