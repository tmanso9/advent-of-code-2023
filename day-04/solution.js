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
		const [winningNumbers, userNumbers] = line
			.split('|')
			.map((part) => part.match(/\d+/g).map(Number))

		allCards.push(new ScratchCard(
			parseInt(id),
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

const calcCardCopies = (card) => {
	const matches = card.userNumbers.reduce((acc, number) => {
		if (binarySearch(card.winningNumbers, number) != -1) {
			return acc + 1
		}
		return acc
	}, 0)

	for (let i = 0; i < matches; i++) {
		const original = allCards[card.id + i]
		allCards.push(new ScratchCard(original.id, original.winningNumbers, original.userNumbers))
	}
}

const secondLevel = () => {
	for (card of allCards) {
		calcCardCopies(card)
	}
	console.log('Second level solution:\t', allCards.length)
}

processData()
firstLevel()
secondLevel()