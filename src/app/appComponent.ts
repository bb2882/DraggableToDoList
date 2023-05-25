import { WFMComponent } from '../framework/index';
import { ComponentConfigInterface } from '../interfaces/ComponentConfigInterface';

class AppComponent extends WFMComponent {
	constructor(config: ComponentConfigInterface) {
		super(config)
	}
}

export const appComponent = new AppComponent({
	selector: 'app-root',
	template: `
		<div><h4>App component does work</h4></div>
	`
})