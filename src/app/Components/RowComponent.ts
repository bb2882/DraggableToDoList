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
		})
		element.addEventListener('dragend', () => {
			this.drag.dragEnd(element)
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
	pencilSrc: '/dist/img/pencil-svgrepo-com.svg',
	checkSrc: '/dist/img/check.svg',
	errorElementPath: 'row__error',
	trashPath: 'row__icon-trash',
	textareaLineLength: 22,
	addElementPath: 'row__add',
	addElementText: '+ Add new row',
})