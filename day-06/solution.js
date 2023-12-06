const { readData } = require('../utils/helper')

const data = readData('input.txt')

const calcRaceOutput = (raceTime, recordDistance) => {
	let wins = 0
	for (let j = 0; j < raceTime; j++) {
		const remainingTime = raceTime - j
		const points = remainingTime * j
		if (points > recordDistance) wins++
	}
	return wins
}

const allRaces = (time, distance) => {
	for (let i = 0; i < time.length; i++) {
		const raceTime = time[i]
		const recordDistance = distance[i]
		let winningOptions = calcRaceOutput(raceTime, recordDistance)
		waysToWin.push(winningOptions)
	}
	return waysToWin.reduce((acc, val) => acc * val, 1)
}

const calcAndPrint = (level) => {
	totalWays = allRaces(time, distance)
	console.log(`${level} level solution:\t${totalWays}`)
}

const firstLevel = (data) => {
	time = data.shift().split(':')[1].trim().match(/\d+/g).map(Number)
	distance = data.shift().split(':')[1].trim().match(/\d+/g).map(Number)

	calcAndPrint('First')
}

const secondLevel = (data) => {
	time = [parseInt(data.shift().split(':')[1].trim().replaceAll(' ', ''))]
	distance = [parseInt(data.shift().split(':')[1].trim().replaceAll(' ', ''))]

	calcAndPrint('Second')
}

const clonedData = [...data]
const waysToWin = []
let totalWays = 0
let time = []
let distance = []

const initVariables = () => {
	waysToWin.length = 0
	time.length = 0
	distance.length = 0
	totalWays = 0
}

firstLevel(data)
initVariables()
secondLevel(clonedData)
