const { readData } = require('../utils/helper')

const data = readData('input.txt')

const TYPES = {
	FIVE: 6,
	FOUR: 5,
	FULL: 4,
	THREE: 3,
	TWO: 2,
	ONE: 1,
	HIGH: 0
}

class Hand {
	constructor(cards, bid) {
		this.cards = cards
		this.bid = bid
		this.type = []
		this.cardsAmount = []
	}
}

const hands = []

for (const line of data) {
	const [cards, bid] = line.split(' ')
	hands.push(new Hand(cards, parseInt(bid)))
}

const checkType = (hand) => {
	const cards = new Map()

	for (const letter of hand.cards) {
		cards.get(letter) === undefined
			? cards.set(letter, 1)
			: cards.set(letter, cards.get(letter) + 1)
	}

	hand.cardsAmount = Array.from(cards).sort((a, b) => b[1] - a[1])
	// console.log(hand.cardsAmount)

	switch (hand.cardsAmount[0][1]) {
		case 5:
			hand.type = TYPES.FIVE
			break
		case 4:
			hand.type = TYPES.FOUR
			break
		case 3:
			if (hand.cardsAmount[1][1] === 2) {
				hand.type = TYPES.FULL
			} else {
				hand.type = TYPES.THREE
			}
			break
		case 2:
			if (hand.cardsAmount[1][1] === 2) {
				hand.type = TYPES.TWO
			} else {
				hand.type = TYPES.ONE
			}
			break
		default:
			hand.type = TYPES.HIGH
	}
}

let totalWinnings = 0

const orderedByStrength = ((strength) => {
	const orderedHands = hands.sort((a, b) => {
		if (a.type != b.type) return a.type - b.type
		for (let i = 0; i < a.cards.length; i++) {
			const aStrength = strength.indexOf(a.cards[i])
			const bStrength = strength.indexOf(b.cards[i])
			if (aStrength === bStrength) continue
			return aStrength - bStrength
		}
		return 0
	})

	return orderedHands
})

const firstLevel = () => {
	for (const hand of hands) {
		checkType(hand)
	}

	const strength = '23456789TJQKA'
	const orderedHands = orderedByStrength(strength)

	orderedHands.forEach((hand, index) => {
		totalWinnings += hand.bid * (index + 1)
	})

	console.log('First level solution:\t', totalWinnings)
}

firstLevel()