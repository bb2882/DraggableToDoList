import { ComponentBase } from '../framework/core/ComponentBase';
import { ComponentConfigInterface } from '../interfaces/ComponentConfigInterface';

class AppComponent extends ComponentBase {
	constructor(config: ComponentConfigInterface) {
		super(config)
	}
}

export const appComponent = new AppComponent({
	className: 'header',
	template: `
		<div><h4>App component does work</h4></div>
	`,
	styles: "color:red; border: 1px solid blue;"
})