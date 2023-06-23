import { ComponentConfigInterface } from '../interfaces/ComponentConfigInterface';
import { ComponentBaseInterface } from '../interfaces/ComponentBaseInterface';

export class ComponentBase implements ComponentBaseInterface {
	readonly className: string
	readonly template: string
	readonly elementPath: string
	readonly textareaPath: string
	readonly pencilPath: string
	readonly pencilSrc: string
	readonly checkSrc: string
	readonly errorElementPath: string
	readonly textareaLineLength: number

	constructor(config: ComponentConfigInterface) {
		this.className = config.className
		this.template = config.template
		this.elementPath = config.elementPath
		this.textareaPath = config.textareaPath
		this.pencilPath = config.pencilPath
		this.pencilSrc = config.pencilSrc
		this.checkSrc = config.checkSrc
		this.errorElementPath = config.errorElementPath
		this.textareaLineLength = config.textareaLineLength
	}

	render(root: HTMLDivElement) {
		if (!root) console.log("No root element found to display interface")
		root.append(this.createSection(this.template, this.className))
		this.addListenersOnTextarea(root.querySelector(this.textareaPath) as HTMLTextAreaElement)
		this.initEvents(root)
	}

	createSection(template: string, className: string) {
		let div = document.createElement('div') as HTMLDivElement
		div.innerHTML = template
		div.classList.add(className);
		return div
	}

	//Property 'events' does not exist on type 'ComponentBase'.
	events() {
		return {}
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

	addListenersOnTextarea(textarea: HTMLTextAreaElement) {
		this.addRow(textarea)
		this.preventLineBreak(textarea)
		this.disableSpace(textarea)
	}


	preventLineBreak(textarea: HTMLTextAreaElement) {
		textarea.addEventListener('keydown', (e) => {
			if (e.key === 'Enter' && (e.shiftKey || e.code === 'Enter' || e.keyCode === 13)) {
				e.preventDefault();
				console.log('times')
			}
		})
	}

	changeIcon(icon: HTMLImageElement, src: string) {
		icon.src = src
	}

	addRow(textarea: HTMLTextAreaElement) {
		textarea.addEventListener('input', () => {
			const value = textarea.value.trim();
			const lines = value === '' ? 1 : Math.ceil(value.length / this.textareaLineLength);
			textarea.rows = lines;
			console.log(lines)
		});
	}

	disableSpace(textarea: HTMLTextAreaElement) {
		textarea.addEventListener('keydown', (e) => {
			const key = e.keyCode || e.which;

			// Disable space if nothing is typed
			if (key === 32 && textarea.value.trim() === '') {
				e.preventDefault();
			}

			// Prevent double spaces
			if (key === 32 && textarea.selectionStart > 0) {
				const previousCharacter = textarea.value.substring(
					textarea.selectionStart - 1,
					textarea.selectionStart
				);
				if (previousCharacter === ' ') {
					e.preventDefault();
				}
			}
		})
	}

	lengthCheck(textarea: HTMLTextAreaElement, errorElement: HTMLDivElement) {
		if (textarea.value.length === 0) {
			textarea.focus()
			textarea.style.borderBottom = '1px solid red'
			errorElement.innerText = 'must have at least 1 character'
			return false
		}

		if (textarea.style.borderBottom || errorElement.innerText !== '') {
			textarea.style.borderBottom = '0px'
			errorElement.innerText = ''
		}

		return true
	}

	changeTextareaName(root: HTMLDivElement) {
		console.log('workin')
		if ((root.querySelector(this.textareaPath) === null || undefined) || (root.querySelector(this.pencilPath) === null || undefined) ||
			(root.querySelector(this.errorElementPath) === null || undefined)) {
			return
		}

		const header = root.querySelector(this.textareaPath) as HTMLTextAreaElement
		const icon = root.querySelector(this.pencilPath) as HTMLImageElement
		const errorElement = root.querySelector(this.errorElementPath) as HTMLDivElement

		header.value = header.value.trim()

		if (icon.src === this.pencilSrc) {
			header.removeAttribute('readonly')
			header.focus()

			const valueLength = header.value.length;
			header.setSelectionRange(valueLength, valueLength);
			header.style.borderBottom = '1px solid #4b4e50'
			this.changeIcon(icon, this.checkSrc)
		} else {
			if (!this.lengthCheck(header, errorElement)) return
			header.setAttribute('readonly', 'readonly')
			header.style.borderBottom = '0px'
			this.changeIcon(icon, this.pencilSrc)
		}
	}

	deleteElement(root: HTMLDivElement) {
		if (root.querySelector(this.elementPath) === null || undefined) {
			return
		}

		const column = root.querySelector('.column') as HTMLDivElement
		column.remove()
	}
}