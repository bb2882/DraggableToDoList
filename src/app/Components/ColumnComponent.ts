import { ComponentBase } from '../../framework/ComponentBase';
import { ComponentConfigInterface } from '../../interfaces/ComponentConfigInterface';

class ColumnComponent extends ComponentBase {
	constructor(config: ComponentConfigInterface) {
		super(config)
	}

	events() {
		return {
			'click .column__icon-pencil': 'changeHeaderName',
			'click .column__icon-trash': 'deleteColumn',
			'click .column__button': 'changeHeader'
		}
	}

	changeIcon(icon: HTMLImageElement, src: string) {
		icon.src = src
	}

	addRow(header: HTMLTextAreaElement) {
		header.addEventListener('input', () => {
			if (header.value.length > 24) {
				header.rows = 2
			} else {
				header.rows = 1 
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
		if ((root.querySelector('.column__header') === null || undefined) || (root.querySelector('.column__icon-pencil') === null || undefined)) {
			return
		}

		const header = root.querySelector('.column__header') as HTMLTextAreaElement
		const icon = root.querySelector('.column__icon-pencil') as HTMLImageElement
		const errorElement = root.querySelector('.column__error') as HTMLDivElement

		this.addRow(header)

		if (icon.src === 'http://127.0.0.1:5500/dist/img/pencil-svgrepo-com.svg') {
			header.removeAttribute('readonly')
			header.focus()
			const valueLength = header.value.length;
			header.setSelectionRange(valueLength, valueLength);
			header.style.borderBottom = '1px solid #2c3134'
			this.changeIcon(icon, 'http://127.0.0.1:5500/dist/img/check.svg')
		} else {
			if (!this.lengthCheck(header, errorElement)) return
			header.setAttribute('readonly', 'readonly')
			header.style.borderBottom = '0px'
			this.changeIcon(icon, 'http://127.0.0.1:5500/dist/img/pencil-svgrepo-com.svg')
		}
	}

	deleteColumn() {

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
				<div class='column__icons'>
					<img class='column__icon column__icon-pencil' src='/dist/img/pencil-svgrepo-com.svg'></img>
					<img class='column__icon column__icon-trash' src='/dist/img/trash-2-svgrepo-com.svg'></img>
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