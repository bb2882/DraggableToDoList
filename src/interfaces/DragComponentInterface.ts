export interface DragComponentInterface {
	elementPath: string,
	iconsPath: string,
	dragStart(element: HTMLDivElement): void,
	dragEnd(element: HTMLDivElement): void,
	iconsOpacity(num: number): void,
	dragOver(event: DragEvent, wrapper: HTMLDivElement): void,
	insertAboveTask(wrapper: HTMLDivElement, mouseY: number): null | Element,
}