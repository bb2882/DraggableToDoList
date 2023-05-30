export interface ComponentInterface {
	className: string,
	template: string,
	styles: string,
	render(root: HTMLElement): void
	createSection(template: string, className: string): HTMLDivElement
}