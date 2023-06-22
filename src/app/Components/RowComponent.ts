import { ComponentBase } from '../../framework/ComponentBase';
import { ComponentConfigInterface } from '../../interfaces/ComponentConfigInterface';

class RowComponent extends ComponentBase {
	constructor(config: ComponentConfigInterface) {
		super(config)
	}
}

export const rowComponent = new RowComponent({
	className: 'rows',
	template: `
		<div class='row'>
			<textarea class='row__text'>aaaaaaaaaaa</textarea>

			<div class='icons'>
				<img class='icon icon-pencil' src='/dist/img/pencil-svgrepo-com.svg'></img>
				<img class='icon icon-trash' src='/dist/img/trash-2-svgrepo-com.svg'></img>
			</div>
		</div>
	`
})