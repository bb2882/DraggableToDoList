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
			'click .column__icon-pencil': 'changeTextareaName',
			'click .column__icon-trash': 'deleteElement',
			'click .column__button': 'addCard'
		}
	}

	addCard() {

	}
}

export const columnComponent = new ColumnComponent({
	className: 'columns',
	template: `
		<div class='column'>
			<div class='column__headline'>
				<textarea type='text' maxlength="45" cols='23' rows = '1' class='column__header' readonly>Name</textarea>
				<div class='icons column__icons'>
					<img class='icon icon-pencil column__icon-pencil' src='/dist/img/pencil-svgrepo-com.svg'></img>
					<img class='icon icon-trash column__icon-trash' src='/dist/img/trash-2-svgrepo-com.svg'></img>
				</div>
			</div>
			<div class='error-element column__error'></div>

			<button class='column__button'><span>+ Add new card</span></button>
		</div>

				<div class='column'>
			<div class='column__headline'>
				<textarea type='text' maxlength="45" cols='23' rows = '1' class='column__header' readonly>Name</textarea>
				<div class='icons column__icons'>
					<img class='icon icon-pencil column__icon-pencil' src='/dist/img/pencil-svgrepo-com.svg'></img>
					<img class='icon icon-trash column__icon-trash' src='/dist/img/trash-2-svgrepo-com.svg'></img>
				</div>
			</div>
			<div class='error-element column__error'></div>

			<button class='column__button'><span>+ Add new card</span></button>
		</div>

				<div class='column'>
			<div class='column__headline'>
				<textarea type='text' maxlength="45" cols='23' rows = '1' class='column__header' readonly>Name</textarea>
				<div class='icons column__icons'>
					<img class='icon icon-pencil column__icon-pencil' src='/dist/img/pencil-svgrepo-com.svg'></img>
					<img class='icon icon-trash column__icon-trash' src='/dist/img/trash-2-svgrepo-com.svg'></img>
				</div>
			</div>
			<div class='error-element column__error'></div>

			<button class='column__button'><span>+ Add new card</span></button>
		</div>

				<div class='column'>
			<div class='column__headline'>
				<textarea type='text' maxlength="45" cols='23' rows = '1' class='column__header' readonly>Name</textarea>
				<div class='icons column__icons'>
					<img class='icon icon-pencil column__icon-pencil' src='/dist/img/pencil-svgrepo-com.svg'></img>
					<img class='icon icon-trash column__icon-trash' src='/dist/img/trash-2-svgrepo-com.svg'></img>
				</div>
			</div>
			<div class='error-element column__error'></div>

			<button class='column__button'><span>+ Add new card</span></button>
			<button class='column__button'><span>+ Add new card</span></button>
			<button class='column__button'><span>+ Add new card</span></button>
			<button class='column__button'><span>+ Add new card</span></button>
		</div>

		<button class='column__add'>+ Add new column</button>
	`,
	elementPath: '.column',
	textareaPath: '.column__header',
	pencilPath: '.column__icon-pencil',
	pencilSrc: 'http://127.0.0.1:5500/dist/img/pencil-svgrepo-com.svg',
	checkSrc: 'http://127.0.0.1:5500/dist/img/check.svg',
	errorElementPath: '.column__error',
	textareaLineLength: 23,
	
})

// const columnPath = '.column'
// const headerPath = '.column__header'
// const pencilPath = '.icon-pencil'
// const pencilSrc = 'http://127.0.0.1:5500/dist/img/pencil-svgrepo-com.svg'
// const checkSrc = 'http://127.0.0.1:5500/dist/img/check.svg'
// const errorElementPath = '.column__error'