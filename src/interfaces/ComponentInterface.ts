export interface ComponentInterface {
	class: string,
	template: string,
	styles: string,
	render(root: HTMLElement): void
	createSection(): void
}