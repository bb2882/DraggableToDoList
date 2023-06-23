import { BoardConfigInterface } from '../../interfaces/BoardConifigInterface'
import { ComponentBaseInterface } from '../../interfaces/ComponentBaseInterface'
import { ColumnComponent, columnComponent } from './ColumnComponent'

class BoardComponent implements ComponentBaseInterface{
	readonly className: string
	readonly template: string
	readonly boardPath: string
	readonly column: ColumnComponent

	constructor(config : BoardConfigInterface) {
		this.className = config.className
		this.template = config.template
		this.boardPath = config.boardPath
		this.column = config.column
	}

	render(root: HTMLDivElement) {
		if (!root) console.log("No root element found to display interface")
		root.append(this.createSection(this.template, this.className))
		this.initEvents(root)
	}

	createSection(template: string, className: string) {
		let div = document.createElement('div') as HTMLDivElement
		div.innerHTML = template
		div.classList.add(className);
		return div
	}

	events() {
		return { 
			'click .board__add': 'addColumn', 
		}
	}

	initEvents(root: HTMLDivElement) {
		let events: object = this.events()

		if (Object.keys(events).length === 0) return

		Object.keys(events).forEach(key => {
			let listener = key.split(' ')
			root
				.querySelector(listener[1])
				?.addEventListener(listener[0], (e: Event) => {
					//assigning method to a function to make sure it is a function and not a type 'never'
					//then binding context 'this' on function to make sure inner methods are going to work in it
					let func: (root: HTMLDivElement) => void = this[events[key as keyof typeof events]]
					let method = func.bind(this)
					method(root)
				})
		})
	}

	addColumn(root: HTMLDivElement) {
		if(root.querySelector(this.boardPath) === null || undefined) return
		const board = root.querySelector(this.boardPath) as HTMLDivElement
		this.column.render(board)
	}
}

export const boardComponent = new BoardComponent({
		className:'board',
		template: `
			<button class='board__add button'>+ Add new column</button>
		`,
		boardPath: '.board',
		column: columnComponent
})