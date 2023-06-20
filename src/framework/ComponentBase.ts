import { ComponentConfigInterface } from '../interfaces/ComponentConfigInterface';
import { ComponentBaseInterface } from '../interfaces/ComponentBaseInterface';

export class ComponentBase implements ComponentBaseInterface {
	readonly template: string
	readonly className: string

	constructor(config: ComponentConfigInterface) {
		this.template = config.template
		this.className = config.className
	}

	render(root: HTMLDivElement) {
		if (!root) return Error("No root element found to display interface")
		root.append(this.createSection(this.template, this.className))
		this.initEvents(root)
	}


	//Property 'events' does not exist on type 'ComponentBase'.
	events() {
		return {}
	}

	initEvents(root: HTMLDivElement) {
		let events: object = this.events()

		if (Object.keys(events).length === 0) {
			console.log('not found')
			return
		}

		Object.keys(events).forEach(key => {
			let listener = key.split(' ')
			root
				.querySelector(listener[1])
				?.addEventListener(listener[0], (e: Event) => {
					//assigning method to a function to make sure it is a function and not a type 'never'
					//then binding context 'this' on function to make sure inner methods are going to work in it
					let func: (root : HTMLDivElement) => void = this[events[key as keyof typeof events]]
					let method = func.bind(this)
					method(root)
				})
		})
	}

	createSection(template: string, className: string) {
		let div = document.createElement('div') as HTMLDivElement
		div.innerHTML = template
		div.classList.add(className);
		return div
	}
}