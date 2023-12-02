const { readData } = require('../utils/helper')

const data = readData('input.txt')

class Game {
	constructor(id, maxRed, maxGreen, maxBlue) {
		this.id = id
		this.maxRed = maxRed
		this.maxGreen = maxGreen
		this.maxBlue = maxBlue
	}
}

let possibleIds = []
let allGames = []

const getMaxCubes = (results) => {
	let [maxRed, maxGreen, maxBlue] = [0, 0, 0]
	for (const result of results) {
		trimmedResult = result.trimStart()
		const val = parseInt(trimmedResult.split(' ')[0])
		const color = trimmedResult.split(' ')[1]
		switch (color) {
			case 'red':
				maxRed = val > maxRed ? val : maxRed
				break
			case 'green':
				maxGreen = val > maxGreen ? val : maxGreen
				break
			case 'blue':
				maxBlue = val > maxBlue ? val : maxBlue
				break
		}
	}
	return { maxRed, maxGreen, maxBlue }
}

const processGame = (line) => {
	const id = parseInt(line.match(/[0-9]+/)[0])
	let [maxRed, maxGreen, maxBlue] = [0, 0, 0]
	const section = line.slice(line.indexOf(':') + 2)
	const games = section.split(';')
	for (game of games) {
		const results = game.split(',')
		const gameCubes = getMaxCubes(results)
		maxRed = gameCubes.maxRed > maxRed ? gameCubes.maxRed : maxRed
		maxGreen = gameCubes.maxGreen > maxGreen ? gameCubes.maxGreen : maxGreen
		maxBlue = gameCubes.maxBlue > maxBlue ? gameCubes.maxBlue : maxBlue
	}
	allGames.push(new Game(id, maxRed, maxGreen, maxBlue))
}

const checkPossibleGames = () => {
	for (game of allGames) {
		if (game.maxRed <= 12 && game.maxGreen <= 13 && game.maxBlue <= 14) {
			possibleIds.push(game.id)
		}
	}
}

const firstLevel = () => {
	for (const line of data) {
		processGame(line)
	}
	checkPossibleGames()
	const idSum = possibleIds.reduce((acc, id) => acc + id, 0)
	console.log('First level:')
	console.log(`The sum of the possible games ids is ${idSum}`)
}

firstLevel()