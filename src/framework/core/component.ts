import { ComponentConfigInterface } from '../../interfaces/ComponentConfigInterface';
import { ComponentInterface } from '../../interfaces/ComponentInterface';

export class Component implements ComponentInterface {
	readonly template: string
	readonly class: string
	readonly styles: string

	constructor(config: ComponentConfigInterface) {
		this.template = config.template
		this.class = config.class
		this.styles = config.styles
	}

	render(root: HTMLDivElement) {
		root.append(this.createSection())
	}

	createSection() {
		let div = document.createElement('div') as HTMLDivElement
		div.innerHTML = this.template
		div.classList.add(this.class);
		div.setAttribute("style", this.styles);
		return div
	}


}