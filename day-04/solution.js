const { readData } = require('../utils/helper')

const data = readData('input.txt')

class ScratchCard {
	constructor(id, winningNumbers, userNumbers, matches) {
		this.id = id
		this.winningNumbers = winningNumbers
		this.userNumbers = userNumbers
		this.matches = matches
	}
}

const allCards = []
const points = []

const processData = () => {
	data.forEach((line) => {
		const id = Number(line.match(/\d+/)[0])
		line = line.slice(line.indexOf(':') + 1)
		const [winningNumbers, userNumbers] = line
			.split('|')
			.map((part) => part.match(/\d+/g).map(Number))

		allCards.push(
			new ScratchCard(
				id,
				winningNumbers.sort((a, b) => a - b),
				userNumbers,
				0
			)
		)
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

const calcMatchesAndValue = (card) => {
	const cardValue = card.userNumbers.reduce((acc, number) => {
		if (binarySearch(card.winningNumbers, number) != -1) {
			card.matches++
			return acc > 0 ? acc * 2 : 1
		}
		return acc
	}, 0)

	if (cardValue > 0) points.push(cardValue)
}

const firstLevel = () => {
	allCards.forEach(calcMatchesAndValue)
	const pointSum = points.reduce((acc, value) => acc + value, 0)
	console.log('First level solution:\t', pointSum)
}

const createCopies = (card) => {
	for (let i = 0; i < card.matches; i++) {
		const { id, winningNumbers, userNumbers, matches } =
			allCards[card.id + i]
		allCards.push(new ScratchCard(id, winningNumbers, userNumbers, matches))
	}
}

const secondLevel = () => {
	for (const card of allCards) {
		createCopies(card)
	}
	console.log('Second level solution:\t', allCards.length)
}

processData()
firstLevel()
secondLevel()
