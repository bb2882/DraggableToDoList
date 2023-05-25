import { WFMModule } from '../framework/index';
import { ModuleConfigInterface } from '../interfaces/ModuleConfigInterface';
import { appComponent } from './appComponent';

class AppModule extends WFMModule {
	constructor(config: ModuleConfigInterface) {
		super(config)
	}
}

export const appModule = new AppModule({
	components: [
		appComponent
	],
})