const { readData } = require('../utils/helper')

class Game {
	constructor(id, cubes) {
		this.id = id
		this.cubes = cubes
	}
}

const processData = () => {
	const data = readData('input.txt')
	const allGames = data.map((line, id) => {
		const cubes = line
			.replace(/Game \d+: /, '')
			.split(';')
			.map((set) => {
				return set.split(',').map((pair) => pair.trim())
			})
		return new Game(id + 1, cubes)
	})

	return allGames
}

const isPossibleGame = (game, maxValues) =>
	game.cubes.every((set) =>
		set.reduce((acc, pair) => {
			const [count, color] = pair.split(' ')
			return acc && parseInt(count) <= maxValues[color]
		}, true)
	)

const firstLevel = (allGames, maxValues) => {
	const possibleGames = allGames.filter((game) => isPossibleGame(game, maxValues))
	const sumOfIds = possibleGames.reduce((acc, game) => acc + game.id, 0)
	console.log('First level:')
	console.log(`The sum of the possible games ids is ${sumOfIds}`)
}

const fewestNumberOfCubes = (game) => {
	const result = { red: 0, green: 0, blue: 0 }
	game.cubes.forEach((sets) => {
		sets.forEach((set) => {
			let [count, color] = set.split(' ')
			count = parseInt(count)
			result[color] = result[color] < count ? count : result[color]
		})
	})
	return result
}

const secondLevel = (allGames) => {
	const fewestCubes = allGames.map((game) => {
		game.cubes = fewestNumberOfCubes(game)
		return game
	})
	const sumOfPower = fewestCubes.reduce((acc, game) => {
		const { red, green, blue } = game.cubes
		return acc + red * green * blue
	}, 0)

	console.log('\nSecond level:')
	console.log(`The sum of the power is ${sumOfPower}`)
}

const main = () => {
	const allGames = processData()
	const maxValues = { red: 12, green: 13, blue: 14 }
	
	firstLevel(allGames, maxValues)
	secondLevel(allGames)
}

main()