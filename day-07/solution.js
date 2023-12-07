const { readData } = require('../utils/helper')

const data = readData('input.txt')

const TYPES = {
	FIVE_OF_A_KIND: 6,
	FOUR_OF_A_KIND: 5,
	FULL_HOUSE: 4,
	THREE_OF_A_KIND: 3,
	TWO_PAIRS: 2,
	ONE_PAIR: 1,
	HIGH_CARD: 0
}

class Hand {
	constructor(cards, bid) {
		this.cards = cards
		this.bid = bid
		this.type = TYPES.HIGH_CARD
		this.cardsAmount = []
	}
}

const mapHands = (hand) => {
	for (const letter of hand.cards) {
		cards.get(letter) === undefined
			? cards.set(letter, 1)
			: cards.set(letter, cards.get(letter) + 1)
	}
}

const checkType = (hand) => {
	cards.clear()
	mapHands(hand)

	hand.cardsAmount = Array.from(cards).sort((a, b) => b[1] - a[1])

	const mostCommon = hand.cardsAmount[0][1]
	const secondMostCommon =
		hand.cardsAmount.length > 1 ?
		hand.cardsAmount[1][1] :
		0

		switch (mostCommon) {
			case 5:
				hand.type = TYPES.FIVE_OF_A_KIND
				break
			case 4:
				hand.type = TYPES.FOUR_OF_A_KIND
				break
			case 3:
				hand.type =
					secondMostCommon === 2
						? TYPES.FULL_HOUSE
						: TYPES.THREE_OF_A_KIND
				break
			case 2:
				hand.type =
					secondMostCommon === 2
						? TYPES.TWO_PAIRS
						: TYPES.ONE_PAIR
				break
			default:
				hand.type = TYPES.HIGH_CARD
				break
		}
}

const checkTypeWithJoker = (hand) => {
	cards.clear()
	mapHands(hand)

	hand.cardsAmount = Array.from(cards).sort((a, b) => b[1] - a[1])

	const jokers = cards.get('J') || 0
	const cardsWithoutJoker = hand.cardsAmount.filter((card) => card[0] !== 'J')

	/*
	This code block is determining the type of hand based on the cards in the hand and the presence of
	jokers.
	Above each line there is an example of a valid hand for each case.
	*/
	if (cardsWithoutJoker && cardsWithoutJoker.length) {
		const mostCommon = cardsWithoutJoker[0][1]
		const secondMostCommon =
			cardsWithoutJoker.length > 1 ?
			cardsWithoutJoker[1][1] :
			0

		hand.type = 
			//AAAAA
			mostCommon === 5 ? TYPES.FIVE_OF_A_KIND :
			//AAAAJ || AAAAK
			mostCommon === 4 ? TYPES.FOUR_OF_A_KIND + jokers :
			//AAAJJ || AAAJK || AAAKK || AAAK9
			mostCommon === 3 ?
				jokers === 2 ? TYPES.FIVE_OF_A_KIND :
				jokers === 1 ? TYPES.FOUR_OF_A_KIND :
				secondMostCommon === 2 ? TYPES.FULL_HOUSE : TYPES.THREE_OF_A_KIND
				:
			//AAJJJ || AAJJK || AAJKK || AAJK9 || AAKK9 || AAK95
			mostCommon === 2 ?
				jokers === 3 ? TYPES.FIVE_OF_A_KIND :
				jokers === 2 ? TYPES.FOUR_OF_A_KIND :
				jokers === 1 ? (secondMostCommon === 2 ? TYPES.FULL_HOUSE : TYPES.THREE_OF_A_KIND) :
				(secondMostCommon === 2 ? TYPES.TWO_PAIRS : TYPES.ONE_PAIR)
				:
			//JJJJA
			jokers === 4 ? TYPES.FIVE_OF_A_KIND :
			//JJJAK
			jokers === 3 ? TYPES.FOUR_OF_A_KIND :
			//JJAK9
			jokers === 2 ? TYPES.THREE_OF_A_KIND :
			//JAK95
			jokers === 1 ? TYPES.ONE_PAIR :
			//AK952
			TYPES.HIGH_CARD
	} else {
		//JJJJJ
		hand.type = TYPES.FIVE_OF_A_KIND
	}
}

const orderedByStrength = (strength) => {
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
}

const calcStrengthAndPrint = ((strength, level) => {
	const orderedHands = orderedByStrength(strength)

	orderedHands.forEach((hand, index) => {
		totalWinnings += hand.bid * (index + 1)
	})

	console.log(`${level} level solution:\t`, totalWinnings)
})

const firstLevel = () => {
	for (const hand of hands) {
		checkType(hand)
	}

	const strength = '23456789TJQKA'
	calcStrengthAndPrint(strength, 'First')
}

const secondLevel = () => {
	for (const hand of hands) {
		checkTypeWithJoker(hand)
	}

	const strengthWithJoker = 'J23456789TJQKA'
	calcStrengthAndPrint(strengthWithJoker, 'Second')
}

const hands = []

for (const line of data) {
	const [cards, bid] = line.split(' ')
	hands.push(new Hand(cards, parseInt(bid)))
}

let totalWinnings = 0
const cards = new Map()

firstLevel()
totalWinnings = 0
secondLevel()
