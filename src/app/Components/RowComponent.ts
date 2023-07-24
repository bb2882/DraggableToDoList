import { ComponentBase } from '../../framework/ComponentBase';
import { ComponentConfigInterface } from '../../interfaces/ComponentConfigInterface';
import { Drag } from './DragComponent';

class RowComponent extends ComponentBase {
	readonly rowIconsPath: string
	private drag: Drag;

	constructor(config: ComponentConfigInterface) {
		super(config)
		this.rowIconsPath = 'row__icons'
		this.drag = new Drag(this.elementPath, this.rowIconsPath);
	}

	initEvents(element: HTMLDivElement) {
		this.childEvents(element)
		element.draggable = true
		element.addEventListener('dragstart', () => {
			this.drag.dragStart(element)
			this.storage.deleteRow(element)
		})
		element.addEventListener('dragend', () => {
			this.drag.dragEnd(element)
			this.storage.setRow(element)
		})
	}

	createSection(): HTMLDivElement {
		const wrapper = document.createElement('div') as HTMLDivElement
		const button = this.createAddButton(wrapper)
		wrapper.append(button)
		wrapper.classList.add(this.className);
		wrapper.addEventListener('dragover', (e) => {
			this.drag.dragOver(e, wrapper)
		})
		document.body.addEventListener('dragover', (event) => {
			event.preventDefault(); // Prevent default behavior to allow dropping

			// Call a separate function for horizontal auto-scrolling on the body
			this.handleHorizontalScroll(event);
		});
		return wrapper
	}

// Separate function for horizontal auto-scrolling on the body
	handleHorizontalScroll(event: MouseEvent) {
	console.log(event)
	const scrollThresholdHorizontal = 100;
	const bodyRect = document.body.getBoundingClientRect();

	const isNearLeft = (event.clientX - bodyRect.left) < scrollThresholdHorizontal;
	const isNearRight = (bodyRect.right - event.clientX) < scrollThresholdHorizontal;

	if (isNearLeft || isNearRight) {
		// Calculate the scroll speed based on the distance from the edges
		const scrollSpeedHorizontal = isNearLeft
			? (scrollThresholdHorizontal - (event.clientX - bodyRect.left)) / scrollThresholdHorizontal
			: (scrollThresholdHorizontal - (bodyRect.right - event.clientX)) / scrollThresholdHorizontal;

		const scrollAmountHorizontal = scrollSpeedHorizontal * 3;

		// Scroll the body horizontally with a smooth behavior
		window.scrollTo({
			left: isNearLeft ? window.scrollX - scrollAmountHorizontal : window.scrollX + scrollAmountHorizontal,
			behavior: 'smooth'
		});
	}
}

	insertElement(button: HTMLButtonElement, wrapper: HTMLDivElement) {
		button.addEventListener('click', () => {
			const element = this.createElement()
			wrapper.insertBefore(element, button)
			this.changeTextareaName(element)
			this.storage.setRow(element)
		})
	}

	deleteElement(element: HTMLDivElement) {
		if (element === null || undefined) return
		element.remove()
		this.storage.deleteRow(element)
	}

}

export const rowComponent = new RowComponent({
	className: 'rows',
	template: `
		<div class='row__headline'>
			<textarea type='text' maxlength='220' cols='22' rows = '1' class='row__text' placeholder='Enter card details' readonly></textarea>

			<div class='icons row__icons'>
				<img class='icon icon-pencil row__icon-pencil' draggable="false" src='/img/pencil-svgrepo-com.svg'></img>
				<img class='icon icon-trash row__icon-trash' draggable="false" src='/img/trash-2-svgrepo-com.svg'></img>
			</div>
		</div>

		<div class='error-element row__error'></div>
	`,
	elementPath: 'row',
	textareaPath: 'row__text',
	pencilPath: 'row__icon-pencil',
	pencilSrc: '/img/pencil-svgrepo-com.svg',
	checkSrc: '/img/check.svg',
	errorElementPath: 'row__error',
	trashPath: 'row__icon-trash',
	addElementPath: 'row__add',
	addElementText: '+ Add new row',
})