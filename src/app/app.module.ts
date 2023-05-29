import { ComponentInterface } from '../interfaces/ComponentInterface';
import { ModuleConfigInterface } from '../interfaces/ModuleConfigInterface';
import { ModuleInterface } from '../interfaces/ModuleInterface';
import { appComponent } from './appComponent';

class AppModule implements ModuleInterface {
	readonly components: ComponentInterface[]
	constructor(config: ModuleConfigInterface) {
		this.components = config.components
	}

	start() {
		this.initComponents()
	}

	initComponents() {
		let root = document.querySelector('#root') as HTMLDivElement
		this.components.forEach(c => c.render(root))
	}
}

export const appModule = new AppModule({
	components: [
		appComponent,
	],
})