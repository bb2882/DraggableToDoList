import { ComponentBase } from '../../framework/ComponentBase';
import { ComponentConfigInterface } from '../../interfaces/ComponentConfigInterface';

//cosntants
const columnPath = '.column'
const headerPath = '.column__header'
const pencilPath = '.icon-pencil'
const pencilSrc = 'http://127.0.0.1:5500/dist/img/pencil-svgrepo-com.svg'
const checkSrc = 'http://127.0.0.1:5500/dist/img/check.svg'
const errorElementPath = '.column__error'

class ColumnComponent extends ComponentBase {
	constructor(config: ComponentConfigInterface) {
		super(config)
	}

	events() {
		return {
			'click .icon-pencil': 'changeHeaderName',
			'click .icon-trash': 'deleteColumn',
			'click .column__button': 'changeHeader'
		}
	}

	preventLineBreak(header: HTMLTextAreaElement) {
		header.addEventListener('keydown', (e) => {
			if (e.key === 'Enter' && (e.shiftKey || e.code === 'Enter' || e.keyCode === 13)) {
				e.preventDefault();
				console.log('times')
			}
		})
	}

	changeIcon(icon: HTMLImageElement, src: string) {
		icon.src = src
	}

	addRow(header: HTMLTextAreaElement) {
		header.addEventListener('input', () => {
			if (header.value.length > 23) {
				header.rows = 2
			} else {
				header.rows = 1 
			}
		})
	}

	disableSpace(header: HTMLTextAreaElement) {
		header.addEventListener('keydown', (e) => {
			const key = e.keyCode || e.which;

			// Disable space if nothing is typed
			if (key === 32 && header.value.trim() === '') {
				e.preventDefault();
			}

			// Prevent double spaces
			if (key === 32 && header.value.slice(-1) === ' ') {
				e.preventDefault();
			}
		})
	}

	lengthCheck(header: HTMLTextAreaElement, errorElement: HTMLDivElement) {
		if (header.value.length === 0) {
			header.focus()
			header.style.borderBottom = '1px solid red'
			errorElement.innerText = 'must have at least 1 character'
			return false
		}

		if (header.style.borderBottom || errorElement.innerText !== '') {
			header.style.borderBottom = '0px'
			errorElement.innerText = ''
		}

		return true
	}

	changeHeaderName(root: HTMLDivElement) {
		if ((root.querySelector(headerPath) === null || undefined) || (root.querySelector(pencilPath) === null || undefined) ||
			(root.querySelector(errorElementPath) === null || undefined)) {
			return
		}

		const header = root.querySelector(headerPath) as HTMLTextAreaElement
		const icon = root.querySelector(pencilPath) as HTMLImageElement
		const errorElement = root.querySelector(errorElementPath) as HTMLDivElement

		header.value = header.value.trim()
		this.addRow(header)
		this.preventLineBreak(header)
		this.disableSpace(header)

		if (icon.src === pencilSrc) {
			header.removeAttribute('readonly')
			header.focus()
			
			const valueLength = header.value.length;
			header.setSelectionRange(valueLength, valueLength);
			header.style.borderBottom = '1px solid #4b4e50'
			this.changeIcon(icon, checkSrc)
		} else {
			if (!this.lengthCheck(header, errorElement)) return
			header.setAttribute('readonly', 'readonly')
			header.style.borderBottom = '0px'
			this.changeIcon(icon, pencilSrc)
		}
	}

	deleteColumn(root: HTMLDivElement) {
		if (root.querySelector(columnPath) === null || undefined) {
			return
		}
		
		const column = root.querySelector('.column') as HTMLDivElement
		column.remove()
	}

	addCard() {

	}
}

export const columnComponent = new ColumnComponent({
	className: 'columns',
	template: `
		<div class='column'>
			<div class='column__headline'>
				<textarea type='text' maxlength="40" cols='22' rows = '1' class='column__header' readonly>Name</textarea>
				<div class='icons'>
					<img class='icon icon-pencil' src='/dist/img/pencil-svgrepo-com.svg'></img>
					<img class='icon icon-trash' src='/dist/img/trash-2-svgrepo-com.svg'></img>
				</div>
			</div>
			<div class='column__error'></div>

			<button class='column__button'><span>+ Add new card</span></button>
		</div>

		<div class='column'>
			<h4 class='column__header'>Name</h5>
			<button class='column__button'><span>+ Add new card</span></button>
		</div>		
		
		<div class='column'>
			<h4 class='column__header'>Name</h5>
			<button class='column__button'><span>+ Add new card</span></button>
		</div>		
		
		<div class='column'>
			<h4 class='column__header'>Name</h5>
			<button class='column__button'><span>+ Add new card</span></button>
			<button class='column__button'><span>+ Add new card</span></button>
			<button class='column__button'><span>+ Add new card</span></button>
			<button class='column__button'><span>+ Add new card</span></button>
		</div>

		<button class='column__add'>+ Add new column</button>
	`
})