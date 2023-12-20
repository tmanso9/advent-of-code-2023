const { readData, printMap, DIR, PriorityQueue } = require('../utils')

const data = readData('input.txt')

let res = 0
const workflows = new Map()
const partRatings = []

const parseData = () => {
	let [workflowInputs, partRatingInputs] = data
		.join('\n')
		.split('\n\n')
		.map((section) => section.split('\n'))
	for (line of workflowInputs) {
		const name = line.substr(0, line.indexOf('{'))
		const ruleInput = line.substr(line.indexOf('{')).replaceAll(/[{}]/g, '').split(',')
		const rules = []
		for (const rule of ruleInput) {
			let part, right, op, final, dest, compareFn
			if (!rule.includes(':')) {
				final = true
				dest = rule
			} else {
				;[part, op, value, dest] = rule.match(/([xmas])([<>])(\d+):(\w+)/).splice(1)
				final = false
				value = parseInt(value)
				compareFn = new Function('part', `return part ${op} ${value}`)
			}
			rules.push({ final, dest, compareFn, part, op, value })
		}
		workflows.set(name, rules)
	}
	for (const partRating of partRatingInputs) {
		const parts = partRating.replaceAll(/[{}]/g, '').split(',')
		let rating = {}
		parts.forEach((part) => {
			let [name, val] = part.split('=')
			rating[`${name}`] = parseInt(val)
		})
		partRatings.push(rating)
	}
}

const firstLevel = () => {
	const accepted = []
	partRatings.forEach((rating) => {
		const queue = []
		let rejected = false
		let ratingOk = false
		queue.push(workflows.get('in'))
		while (queue.length && !rejected && !ratingOk) {
			const curr = queue.shift()
			for (const rule of curr) {
				if (ratingOk || queue.length || rejected) break
				if (rule.final) {
					if (rule.dest === 'A') {
						if (!accepted.includes(rating)) {
							accepted.push(rating)
						}
						ratingOk = true
					} else if (rule.dest === 'R') {
						rejected = true
					} else {
						queue.push(workflows.get(rule.dest))
					}
				} else {
					if (rule.compareFn(rating[rule.part]) === true) {
						if (rule.dest === 'A') {
							if (!accepted.includes(rating)) {
								accepted.push(rating)
							}
							ratingOk = true
						} else if (rule.dest === 'R') {
							rejected = true
						} else {
							queue.push(workflows.get(rule.dest))
						}
					}
				}
			}
		}
	})
	res = accepted.reduce((acc, val) => {
		return acc + val.x + val.m + val.a + val.s
	}, 0)
	console.log('First level solution:\t', res)
}

const secondLevel = () => {
	res = 0
	const start = {
		wf: 'in',
		xmin: 1,
		xmax: 4000,
		mmin: 1,
		mmax: 4000,
		amin: 1,
		amax: 4000,
		smin: 1,
		smax: 4000
	}

	const queue = [start]
	while (queue.length) {
		const part = queue.shift()

		if (part.wf === 'R') continue
		if (part.wf === 'A') {
			const pieces =
				(1 + part.xmax - part.xmin) *
				(1 + part.mmax - part.mmin) *
				(1 + part.amax - part.amin) *
				(1 + part.smax - part.smin)
			res += pieces
			continue
		}
		const workflow = workflows.get(part.wf)
		workflow.forEach((rule) => {
			const { final, op, value, dest } = rule
			const partName = rule.part
			const next = { ...part, wf: dest }
			if (final) {
				queue.push(next)
			} else {
				if (op === '<') {
					next[`${partName}max`] = Math.min(next[`${partName}max`], value - 1)
					queue.push(next)
					part[`${partName}min`] = Math.max(
						part[`${partName}min`],
						next[`${partName}max`] + 1
					)
				} else {
					next[`${partName}min`] = Math.max(next[`${partName}min`], value + 1)
					queue.push(next)
					part[`${partName}max`] = Math.min(
						part[`${partName}max`],
						next[`${partName}min`] - 1
					)
				}
			}
		})
	}
	console.log('Second level solution:\t', res)
}

parseData()
firstLevel()
secondLevel()
