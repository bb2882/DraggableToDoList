import { ComponentConfigInterface } from '../interfaces/ComponentConfigInterface';
import { ComponentBaseInterface } from '../interfaces/ComponentBaseInterface';
import { uuidv4 } from '../utils/uniqueId';
import { Storage } from '../app/Components/StorageComponent';

export class ComponentBase implements ComponentBaseInterface {
	readonly className: string
	readonly template: string
	readonly elementPath: string
	readonly textareaPath: string
	readonly pencilPath: string
	readonly pencilSrc: string
	readonly checkSrc: string
	readonly errorElementPath: string
	readonly trashPath: string
	readonly addElementPath: string
	readonly addElementText: string
	readonly storage: Storage

	constructor(config: ComponentConfigInterface) {
		this.className = config.className
		this.template = config.template
		this.elementPath = config.elementPath
		this.textareaPath = config.textareaPath
		this.pencilPath = config.pencilPath
		this.pencilSrc = config.pencilSrc
		this.checkSrc = config.checkSrc
		this.errorElementPath = config.errorElementPath
		this.trashPath = config.trashPath
		this.addElementPath = config.addElementPath
		this.addElementText = config.addElementText
		this.storage = new Storage()
	}

	render(root: HTMLDivElement) {
		if (!root) console.log("No root element found to display interface")
		root.append(this.createSection())
	}

	createElement(): HTMLDivElement {
		const element = document.createElement('div') as HTMLDivElement
		element.id = uuidv4()
		element.innerHTML = this.template
		element.classList.add(this.elementPath);
		this.initEvents(element)
		return element
		
	}

	createSection(): HTMLDivElement {
		const wrapper = document.createElement('div') as HTMLDivElement
		const button = this.createAddButton(wrapper)
		wrapper.append(button)
		wrapper.classList.add(this.className);
		return wrapper
	}

	createAddButton(wrapper: HTMLDivElement): HTMLButtonElement {
		const button = document.createElement('button')
		this.insertElement(button, wrapper)
		button.classList.add('button')
		button.classList.add(this.addElementPath)
		button.innerText = this.addElementText 
		return button
	}

	insertElement(button: HTMLButtonElement, wrapper: HTMLDivElement) {

	}

	initEvents(element: HTMLDivElement) {

	}

	childEvents(element: HTMLDivElement) {
		element.addEventListener('click', (e) => {
			if ((e.target as Element).matches(`.${this.pencilPath}`)) {
				this.changeTextareaName(element)
			} else if ((e.target as Element).matches(`.${this.trashPath}`)) {
				this.deleteElement(element)
			}
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
			}
		})
	}

	changeIcon(icon: HTMLImageElement, src: string) {
		icon.src = src
	}

	addRow(textarea: HTMLTextAreaElement) {
		textarea.addEventListener('input', e => {
			textarea.style.height = 'auto';
			let scrollHeight = (e.target as HTMLTextAreaElement).scrollHeight;
			textarea.style.height = `${scrollHeight + 1}px`;
		})
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
			errorElement.innerText = 'Please, Fill Out This Field'
			return false
		}

		if (textarea.style.borderBottom || errorElement.innerText !== '') {
			textarea.style.borderBottom = '0px'
			errorElement.innerText = ''
		}

		return true
	}

	changeTextareaName(element: HTMLDivElement) {
		if ((element.querySelector(`.${this.textareaPath}`) === null || undefined) || (element.querySelector(`.${this.pencilPath}`) === null || undefined) ||
		(element.querySelector(`.${this.errorElementPath}`) === null || undefined)) {
			return
		}

		const textarea = element.querySelector(`.${this.textareaPath}`) as HTMLTextAreaElement
		const icon = element.querySelector(`.${this.pencilPath}`) as HTMLImageElement
		const errorElement = element.querySelector(`.${this.errorElementPath}`) as HTMLDivElement

		this.addListenersOnTextarea(textarea)
		textarea.value = textarea.value.trim()

		if (new URL(icon.src).pathname === this.pencilSrc) {
			textarea.removeAttribute('readonly')
			textarea.focus()

			const valueLength = textarea.value.length;
			textarea.setSelectionRange(valueLength, valueLength);
			textarea.style.borderBottom = '1px solid #4b4e50'
			this.changeIcon(icon, this.checkSrc)
		} else {
			if (!this.lengthCheck(textarea, errorElement)) return
			textarea.setAttribute('readonly', 'readonly')
			textarea.style.borderBottom = '0px'
			this.changeIcon(icon, this.pencilSrc)
		}
	}

	deleteElement(element: HTMLDivElement) {

	}
}