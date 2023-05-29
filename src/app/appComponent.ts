import { Component } from '../framework/core/component';
import { ComponentConfigInterface } from '../interfaces/ComponentConfigInterface';

class AppComponent extends Component {
	constructor(config: ComponentConfigInterface) {
		super(config)
	}
}

export const appComponent = new AppComponent({
	class: 'header',
	template: `
		<div><h4>App component does work</h4></div>
	`,
	styles: "color:red; border: 1px solid blue;"
})