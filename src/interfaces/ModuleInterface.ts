import { ComponentInterface } from './ComponentInterface'

export interface ModuleInterface {
	components: ComponentInterface[]
	start(): void
	initComponents(): void
}