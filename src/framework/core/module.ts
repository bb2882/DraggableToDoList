import { ComponentInterface } from '../../interfaces/ComponentInterface'
import { ModuleConfigInterface } from '../../interfaces/ModuleConfigInterface'
import { ModuleInterface } from '../../interfaces/ModuleInterface'

export class Module implements ModuleInterface {
	readonly components: ComponentInterface[]
	constructor(config: ModuleConfigInterface) {
		this.components = config.components
	}

	start() {
		this.initComponents()
	}

	initComponents() {
		this.components.forEach(c => c.render())
	}
}