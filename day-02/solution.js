const { readData } = require('../utils/helper')

const data = readData('input.txt')

class Game {
	constructor(id, cubes) {
		this.id = id
		this.cubes = cubes
	}
}

const allGames = data.map((line, id) => {
	const cubes = line
		.replace(/Game \d+: /, '')
		.split(';')
		.map((set) => {
			return set.split(',').map((pair) => pair.trim())
		})
	return new Game(id + 1, cubes)
})

const maxValues = { red: 12, green: 13, blue: 14 }

const isPossibleGame = (game) => game.cubes.every((set) =>
	set.reduce((acc, pair) => {
		const [count, color] = pair.split(' ')
		return acc && parseInt(count) <= maxValues[color]
	}, true)
	)
	
	const firstLevel = () => {
	const possibleGames = allGames.filter(isPossibleGame)
	const sumOfIds = possibleGames.reduce((acc, game) => acc + game.id, 0)
	console.log('First level:')
	console.log(`The sum of the possible games ids is ${sumOfIds}`)
}

firstLevel()
