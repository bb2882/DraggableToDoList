import { ComponentBase } from '../../framework/ComponentBase';
import { ComponentConfigInterface } from '../../interfaces/ComponentConfigInterface';
import { rowComponent } from './RowComponent';
import { ColumnObjectInterface, RowObjectInterface } from '../../interfaces/StorageInterface';

class ColumnComponent extends ComponentBase {
	constructor(config: ComponentConfigInterface) {
		super(config)
	}

	render(root: HTMLDivElement) {
		if (!root) console.log("No root element found to display interface")
		root.append(this.createSection())
		
		this.renderStorageData()
	}

	renderStorageData() {
		const data = JSON.parse(localStorage.getItem('data') || '[]');

		data.forEach((obj: ColumnObjectInterface) => {	
			const column = this.createDisplay(this, obj, document)

			obj.rows.forEach(objRow => {
				const row = this.createDisplay(rowComponent, objRow, column)
				setTimeout(() => {
					this.storage.setRow(row)
				}, 0)
			})

			this.storage.setColumn(column)
		})
	}

	createDisplay(context: ComponentBase, obj: ColumnObjectInterface | RowObjectInterface, selector: HTMLDivElement | Document) {
		const wrapper = selector.querySelector(`.${context.className}`) as HTMLDivElement
		const element = context.createElement()
		const textarea = element.querySelector('textarea') as HTMLTextAreaElement
		const button = selector.querySelector(`.${context.addElementPath}`)

		if (obj.value === '') context.changeTextareaName(element)
		element.id = obj.id
		textarea.value = obj.value
		setTimeout(() => {
			let scrollHeight = textarea.scrollHeight;
			textarea.style.height = `${scrollHeight + 1}px`;
		}, 0)

		wrapper.insertBefore(element, button)
		return element
	}
	
	addCard(element: HTMLDivElement) {
		rowComponent.render(element)
	}

	initEvents(element: HTMLDivElement) {
		this.childEvents(element)
		this.addCard(element)
	}

	createSection(): HTMLDivElement {
		const wrapper = document.createElement('div') as HTMLDivElement
		const button = this.createAddButton(wrapper)
		wrapper.append(button)
		wrapper.classList.add(this.className);
		return wrapper
	}

	insertElement(button: HTMLButtonElement, wrapper: HTMLDivElement) {
		button.addEventListener('click', () => {
			const element = this.createElement()
			wrapper.insertBefore(element, button)
			this.changeTextareaName(element)
			this.storage.setColumn(element)
		})
	}

	deleteElement(element: HTMLDivElement) {
		if (element === null || undefined) return
		element.remove()
		this.storage.deleteColumn(element)
	}
}

export const columnComponent = new ColumnComponent({
	className: 'columns',
	template: `
		<div class='column__headline'>
			<textarea type='text' maxlength="40" cols='23' rows = '1' class='column__header' placeholder='Enter header for column' readonly></textarea>
			<div class='icons column__icons'>
				<img class='icon icon-pencil column__icon-pencil' draggable="false" src='/img/pencil-svgrepo-com.svg'></img>
				<img class='icon icon-trash column__icon-trash' draggable="false" src='/img/trash-2-svgrepo-com.svg'></img>
			</div>
		</div>

		<div class='error-element column__error'></div>
	`,
	elementPath: 'column',
	textareaPath: 'column__header',
	pencilPath: 'column__icon-pencil',
	pencilSrc: '/img/pencil-svgrepo-com.svg',
	checkSrc: '/img/check.svg',
	errorElementPath: 'column__error',
	trashPath: 'column__icon-trash',
	addElementPath : 'column__add',
	addElementText: '+ Add new column'
	
})