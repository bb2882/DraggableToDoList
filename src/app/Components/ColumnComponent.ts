import { ComponentBase } from '../../framework/ComponentBase';
import { ComponentConfigInterface } from '../../interfaces/ComponentConfigInterface';
import { rowComponent } from './RowComponent';

class ColumnComponent extends ComponentBase {
	constructor(config: ComponentConfigInterface) {
		super(config)
	}
	
	addCard(element: HTMLDivElement) {
		rowComponent.render(element)
	}
}

export const columnComponent = new ColumnComponent({
	className: 'columns',
	template: `
			<div class='column__headline'>
				<textarea type='text' maxlength="45" cols='23' rows = '1' class='column__header' placeholder='Enter header for column' readonly></textarea>
				<div class='icons column__icons'>
					<img class='icon icon-pencil column__icon-pencil' src='/dist/img/pencil-svgrepo-com.svg'></img>
					<img class='icon icon-trash column__icon-trash' src='/dist/img/trash-2-svgrepo-com.svg'></img>
				</div>
			</div>
			<div class='error-element column__error'></div>

	`,
	elementPath: 'column',
	textareaPath: 'column__header',
	pencilPath: 'column__icon-pencil',
	pencilSrc: 'http://127.0.0.1:5500/dist/img/pencil-svgrepo-com.svg',
	checkSrc: 'http://127.0.0.1:5500/dist/img/check.svg',
	errorElementPath: 'column__error',
	textareaLineLength: 23,
	addElementPath : 'column__add',
	addElementText: '+ Add new column'
	
})

// const columnPath = '.column'
// const headerPath = '.column__header'
// const pencilPath = '.icon-pencil'
// const pencilSrc = 'http://127.0.0.1:5500/dist/img/pencil-svgrepo-com.svg'
// const checkSrc = 'http://127.0.0.1:5500/dist/img/check.svg'
// const errorElementPath = '.column__error'