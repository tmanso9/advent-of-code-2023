const { readData } = require('../utils/helper')

const data = readData('input.txt')

class ScratchCard {
	constructor(id, winningNumbers, userNumbers) {
		this.id = id
		this.winningNumbers = winningNumbers
		this.userNumbers = userNumbers
	}
}

const allCards = []
const points = []

const processData = () => {
	data.forEach((line) => {
		const id = line.match(/\d+/)[0]
		line = line.slice(line.indexOf(':') + 1)
		const parts = line.split('|')
		const winningNumbers = []
		parts[0].match(/\d+/g).forEach((number) => {
			winningNumbers.push(parseInt(number))
		})
		const userNumbers = []
		parts[1].match(/\d+/g).forEach((number) => {
			userNumbers.push(parseInt(number))
		})

		allCards.push(new ScratchCard(
			id,
			winningNumbers.sort((a, b) => a - b),
			userNumbers
		))
	})
}

function binarySearch(arr, target) {
	return binarySearchRecursive(arr, target, 0, arr.length - 1)
}

function binarySearchRecursive(arr, target, left, right) {
	if (left > right) return -1

	const mid = Math.floor((left + right) / 2)

	if (target < arr[mid]) return binarySearchRecursive(arr, target, 0, mid - 1)
	if (target > arr[mid])
		return binarySearchRecursive(arr, target, mid + 1, right)
	return mid
}

const calcCardValue = (card) => {
	const cardValue = card.userNumbers.reduce((acc, number) => {
		if (binarySearch(card.winningNumbers, number) != -1) {
			return acc > 0 ? acc * 2 : 1
		}
		return acc
	}, 0)

	if (cardValue > 0) points.push(cardValue)
}

const firstLevel = () => {
	allCards.forEach(calcCardValue)
	const pointSum = points.reduce((acc, value) => acc + value, 0)
	console.log('First level solution:\t', pointSum)
}

processData()
firstLevel()