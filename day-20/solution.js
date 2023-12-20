const { readData, printMap, DIR, PriorityQueue } = require('../utils')

const data = readData('input.txt')

let res = 0

class Module {
	constructor(name, dest) {
		this.dest = dest
		this.name = name
	}

	action(pulse, queue, source = 'broadcaster') {}
}

class Broadcaster extends Module {
	action(pulse, queue, source = 'broadcaster') {
		this.dest.forEach((mod) => {
			queue.push({ mod, pulse, source: this.name })
		})
	}
}

class FlipFlop extends Module {
	constructor(name, dest) {
		super(name, dest)
		this.state = false
	}

	action(pulse, queue, source = 'broadcaster') {
		if (pulse === 'hi') return
		this.state = !this.state
		this.dest.forEach((mod) => {
			queue.push({ mod, pulse: this.state ? 'hi' : 'lo', source: this.name })
		})
	}

	getState() {
		return this.state ? 'on' : 'off'
	}
}

class Conjunction extends Module {
	constructor(name, dest) {
		super(name, dest)
		this.inputs = new Map()
	}

	action(pulse, queue, source = 'broadcaster') {
		this.inputs.set(source, pulse)
		let allHi = true
		for (const lastPulse of this.inputs.values()) {
			if (lastPulse !== 'hi') {
				allHi = false
				break
			}
		}
		const toSend = allHi ? 'lo' : 'hi'
		this.dest.forEach((mod) => {
			queue.push({ mod, pulse: toSend, source: this.name })
		})
	}
}

const createModule = (name, type, dest) => {
	switch (type) {
		case 'broadcaster':
			return new Broadcaster(name, dest)
		case 'flipflop':
			return new FlipFlop(name, dest)
		case 'conjunction':
			return new Conjunction(name, dest)
		default:
			return new Module(name, dest)
	}
}

const getNameAndType = (line) => {
	let [name, _] = line.split(' -> ')
	name = name.trim()
	if (line[0] === '%') return [name.substr(1), 'flipflop']
	if (line[0] === '&') return [name.substr(1), 'conjunction']
	if (line.split(' ')[0] === 'broadcaster') return [name, 'broadcaster']
	return [name, 'generic']
}

const setInputs = (name, modules) => {
	const toSet = modules.get(name)
	for (const module of modules.values()) {
		if (module.name === name) continue
		if (module.dest.includes(name)) toSet.inputs.set(module.name, 'lo')
	}
}

const buildModules = () => {
	const modules = new Map()
	data.forEach((line) => {
		let [left, right] = line.split(' -> ')
		const [name, type] = getNameAndType(left)
		const dest = right
			.trim()
			.split(', ')
			.map((val) => val)
		const newMod = createModule(name, type, dest)
		modules.set(name, newMod)
	})
	for (const module of modules.values()) {
		const dest = module.dest
		dest.forEach((d) => {
			if (!modules.has(d)) modules.set(d, createModule(d, 'generic', []))
		})
		if (module instanceof Conjunction) {
			setInputs(module.name, modules)
		}
	}
	return modules
}

const allModulesOff = (modules) => {
	let allOff = true
	for (const module of modules.values()) {
		if (module instanceof FlipFlop && module.getState() === 'on') {
			allOff = false
			break
		}
	}
	return allOff
}

const firstLevel = (modules) => {
	let hiSent = 0,
		loSent = 0
	let i = 0
	while ((!allModulesOff(modules) || !i) && i < 1000) {
		const queue = [{ mod: 'broadcaster', pulse: 'lo', source: 'button' }]
		i++
		while (queue.length) {
			const curr = queue.shift()
			curr.pulse === 'hi' ? hiSent++ : loSent++
			modules.get(curr.mod).action(curr.pulse, queue, curr.source)
		}
	}
	res = ((hiSent * 1000) / i) * ((loSent * 1000) / i)
	console.log('First level solution:\t', res)
}

const secondLevel = () => {
	let i = 0
	let loSentToRx = false
	while (!loSentToRx || !i){
		const queue = [{ mod: 'broadcaster', pulse: 'lo', source: 'button' }]
		i++
		while (queue.length) {
			const curr = queue.shift()
			loSentToRx = loSentToRx ? loSentToRx : curr.pulse === 'lo' && curr.mod === 'rx'
			modules.get(curr.mod).action(curr.pulse, queue, curr.source)
		}
	}
	console.log('Second level solution:\t', i)
}

const modules = buildModules()
firstLevel(modules)
// secondLevel(modules)
