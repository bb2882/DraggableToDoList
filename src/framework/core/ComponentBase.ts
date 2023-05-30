import { ComponentConfigInterface } from '../../interfaces/ComponentConfigInterface';
import { ComponentInterface } from '../../interfaces/ComponentInterface';

export class ComponentBase implements ComponentInterface {
	readonly template: string
	readonly className: string
	readonly styles: string

	constructor(config: ComponentConfigInterface) {
		this.template = config.template
		this.className = config.className
		this.styles = config.styles
	}

	render(root: HTMLDivElement) {
		root.append(this.createSection(this.template, this.className))
	}

	createSection(template: string, className: string) {
		let div = document.createElement('div') as HTMLDivElement
		div.innerHTML = template
		div.classList.add(className);
		div.setAttribute("style", this.styles);
		return div
	}
}