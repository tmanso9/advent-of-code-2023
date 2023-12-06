const { readData } = require('../utils/helper')

const data = readData('input.txt')

console.log(data)

const time = data.shift().split(':')[1].trim().match(/\d+/g).map(Number)
const distance = data.shift().split(':')[1].trim().match(/\d+/g).map(Number)

const waysToWin = []

for (let i = 0; i < time.length; i++) {
	const raceTime = time[i]
	const recordDistance = distance[i]
	// console.log(raceTime, recordDistance)
	let winningOptions = 0
	for (let j = 0; j < raceTime; j++) {
		const remainingTime = raceTime - j
		const points = remainingTime * j
		// console.log(points)
		if (points > recordDistance) winningOptions++
	}
	waysToWin.push(winningOptions)
}

// console.log(waysToWin)
const totalWays = waysToWin.reduce((acc, val) => acc * val, 1)
console.log(`There are ${totalWays} ways to win`)