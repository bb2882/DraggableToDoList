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
	}

	dragStart(event: DragEvent, element: HTMLDivElement): void {
		// console.log('Event:', 'dragStart')
		element.classList.add('dragging')
		setTimeout(() => {
			element.style.backgroundColor = '#c2c2c2'
			element.querySelector('.row__headline')?.style.visibility = 'hidden'
			document.querySelectorAll('.row__icons').forEach(icon => {
				icon.style.opacity = '0'
			})
		}, 0)
	}

	dragEnd(event: DragEvent, element: HTMLDivElement): void {
		// console.log('Event:', 'dragEnd')#ecf0f1
		element.classList.remove('dragging')
		element.style.backgroundColor = '#ecf0f1'
		element.querySelector('.row__headline')?.style.visibility = 'visible'
		document.querySelectorAll('.row__icons').forEach(icon => {
			icon.style.opacity = '1'
		})
	}

	dragOver(event: DragEvent, wrapper: HTMLDivElement): void {
		const bottomTask = this.insertAboveTask(wrapper, event.clientY)
		const curTask = document.querySelector('.dragging')
		const lastChild = wrapper.lastElementChild;

		if(!bottomTask) {
			wrapper.insertBefore(curTask!, lastChild)
		} else {
			wrapper.insertBefore(curTask!, bottomTask)
		}

		const scrollThreshold = 50;
		const containerRect = wrapper.getBoundingClientRect();
		const isNearTop = (event.clientY - containerRect.top) < scrollThreshold;
		const isNearBottom = (containerRect.bottom - event.clientY) < scrollThreshold;

		if (isNearTop) {
			// Calculate the scroll speed based on the distance from the top
			const scrollSpeed = (scrollThreshold - (event.clientY - containerRect.top)) / scrollThreshold;
			const scrollAmount = scrollSpeed * 3

			// Scroll the container upwards with a smooth behavior
			wrapper.scrollTo({
				top: wrapper.scrollTop - scrollAmount,
				behavior: 'smooth'
			});
		} else if (isNearBottom) {
			// Calculate the scroll speed based on the distance from the bottom
			const scrollSpeed = (scrollThreshold - (containerRect.bottom - event.clientY)) / scrollThreshold;
			const scrollAmount = scrollSpeed * 3

			// Scroll the container downwards with a smooth behavior
			wrapper.scrollTo({
				top: wrapper.scrollTop + scrollAmount,
				behavior: 'smooth'
			});
		}
	}

	insertAboveTask(wrapper: HTMLDivElement, mouseY : number) {
		const els = wrapper.querySelectorAll('.row:not(.dragging)')

		let closestTask: null | Element = null
		let closestOffset = Number.NEGATIVE_INFINITY

		els.forEach(task => {
			const {top} = task.getBoundingClientRect()

			const offset = mouseY - top - 40 

			if (offset < 0 && offset > closestOffset) {
				closestOffset = offset
				closestTask = task
			}
		})

		return closestTask

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
		wrapper.addEventListener('dragover', (e) => {
			this.dragOver(e, wrapper)
		})
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