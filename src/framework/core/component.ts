import { ComponentConfigInterface } from '../../interfaces/ComponentConfigInterface';
import { ComponentInterface } from '../../interfaces/ComponentInterface';

export class Component implements ComponentInterface {
	readonly template: string
	readonly selector: string

	constructor(config: ComponentConfigInterface) {
		this.template = config.template
		this.selector = config.selector
	}

	render() {
		let docSelector = document.querySelector(this.selector) as HTMLElement
		docSelector.innerHTML = this.template
	}
}