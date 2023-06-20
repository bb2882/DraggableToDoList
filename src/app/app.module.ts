import { ComponentBaseInterface } from '../interfaces/ComponentBaseInterface';
import { ModuleConfigInterface } from '../interfaces/ModuleConfigInterface';
import { ModuleInterface } from '../interfaces/ModuleInterface';
import { columnComponent } from './Components/ColumnComponent';

class AppModule implements ModuleInterface {
	readonly components: ComponentBaseInterface[]
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
		columnComponent,
	],
})