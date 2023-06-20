import { ComponentBaseInterface } from './ComponentBaseInterface'

export interface ModuleInterface {
	components: ComponentBaseInterface[]
	start(): void
	initComponents(): void
}