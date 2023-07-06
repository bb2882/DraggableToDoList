import { ComponentBase } from '../../framework/ComponentBase';
import { ComponentConfigInterface } from '../../interfaces/ComponentConfigInterface';

class RowComponent extends ComponentBase {
	readonly rowIconsPath: string
	constructor(config: ComponentConfigInterface) {
		super(config)
		this.rowIconsPath = 'row__icons'
	}

	initEvents(element: HTMLDivElement) {
		this.childEvents(element)
		element.draggable = true
		element.addEventListener('dragstart', (e) => {
			this.dragStart(e, element)
		})
		element.addEventListener('dragend', (e) => {
			this.dragEnd(e, element)
		})
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

	dragStart(event: DragEvent, element: HTMLDivElement): void {
		element.classList.add('dragging')
		setTimeout(() => {
			element.classList.add('hidden')
			this.iconsOpacity(0)
		}, 0)
	}

	dragEnd(event: DragEvent, element: HTMLDivElement): void {
		element.classList.remove('dragging')
		element.classList.remove('hidden')
		this.iconsOpacity(1)
	}

	iconsOpacity(num: number) {
		const icons = document.querySelectorAll(`.${this.rowIconsPath}`) as NodeListOf<HTMLImageElement>
		icons.forEach((icon: HTMLImageElement) => {
			icon.style.opacity = `${num}`
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
		const els = wrapper.querySelectorAll(`.${this.elementPath}:not(.dragging)`)

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
	pencilSrc: '/dist/img/pencil-svgrepo-com.svg',
	checkSrc: '/dist/img/check.svg',
	errorElementPath: 'row__error',
	trashPath: 'row__icon-trash',
	textareaLineLength: 22,
	addElementPath: 'row__add',
	addElementText: '+ Add new row',
})