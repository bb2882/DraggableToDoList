import { ComponentBase } from '../../framework/ComponentBase';
import { ComponentConfigInterface } from '../../interfaces/ComponentConfigInterface';

class RowComponent extends ComponentBase {
	constructor(config: ComponentConfigInterface) {
		super(config)
	}

	initEvents(element: HTMLDivElement) {
		element.childNodes[1].childNodes[3].childNodes[1].addEventListener('click', () => {
			this.changeTextareaName(element)
		})
		element.childNodes[1].childNodes[3].childNodes[3].addEventListener('click', () => {
			this.deleteElement(element)
		})
		element.draggable = true
		element.addEventListener('dragstart', (e) => {
			this.dragStart(e, element)
		})
		element.addEventListener('dragend', (e) => {
			this.dragEnd(e, element)
		})
		element.addEventListener('dragover', this.dragOver)
		element.addEventListener('drop', this.drop)
		element.addEventListener('dragenter', this.dragEnter)
		element.addEventListener('dragleave', this.dragLeave)
	}

	dragStart(event: DragEvent, element: HTMLDivElement): void {
		// console.log('Event:', 'dragStart')
		element.classList.add('dragging')

	}

	dragEnd(event: DragEvent, element: HTMLDivElement): void {
		// console.log('Event:', 'dragEnd')
		element.classList.remove('dragging')
	}

	dragOver(event: DragEvent): void {
		// console.log('Event:', 'dragOver')

	}

	drop(event: DragEvent): void {
		// console.log('Event:', 'drop')

	}

	dragEnter(event: DragEvent): void {
		// console.log('Event:', 'dragEnter')

	}

	dragLeave(event: DragEvent): void {
		// console.log('Event:', 'dragLeave')

	}

	createSection(): HTMLDivElement {
		const wrapper = document.createElement('div') as HTMLDivElement
		const button = this.createAddButton(wrapper)
		wrapper.append(button)
		wrapper.classList.add(this.className);
		return wrapper
	}

}

export const rowComponent = new RowComponent({
	className: 'rows',
	template: `
		<div class='row__headline'>
			<textarea type='text' maxlength='220' cols='22' rows = '1' class='row__text' placeholder='Enter card details' readonly></textarea>

			<div class='icons row__icons'>
				<img class='icon icon-pencil row__icon-pencil' draggable="false" src='/dist/img/pencil-svgrepo-com.svg'></img>
				<img class='icon icon-trash row__icon-trash' draggable="false" src='/dist/img/trash-2-svgrepo-com.svg'></img>
			</div>
		</div>

		<div class='error-element row__error'></div>
	`,
	elementPath: 'row',
	textareaPath: 'row__text',
	pencilPath: 'row__icon-pencil',
	pencilSrc: 'http://127.0.0.1:5500/dist/img/pencil-svgrepo-com.svg',
	checkSrc: 'http://127.0.0.1:5500/dist/img/check.svg',
	errorElementPath: 'row__error',
	textareaLineLength: 22,
	addElementPath: 'row__add',
	addElementText: '+ Add new row'
})