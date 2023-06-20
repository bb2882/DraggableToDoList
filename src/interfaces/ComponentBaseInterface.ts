export interface ComponentBaseInterface {
	className: string,
	template: string,
	render(root: HTMLElement): void
	createSection(template: string, className: string): HTMLDivElement
}