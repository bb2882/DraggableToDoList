export class Drag {
	readonly elementPath: string;
	readonly rowIconsPath: string;

	constructor(elementPath: string, rowIconsPath: string) {
		this.elementPath = elementPath;
		this.rowIconsPath = rowIconsPath;
	}

	dragStart(element: HTMLDivElement) {
		element.classList.add('dragging')
		setTimeout(() => {
			element.classList.add('hidden')
			this.iconsOpacity(0)
		}, 0)
	}

	dragEnd(element: HTMLDivElement) {
		element.classList.remove('dragging')
		element.classList.remove('hidden')
		this.iconsOpacity(1)
	}

	iconsOpacity(num: number) {
		const icons = document.querySelectorAll(`.${this.rowIconsPath}`) as NodeListOf<HTMLImageElement>
		icons.forEach((icon: HTMLImageElement) => {
			icon.style.opacity = `${num}`
		})
	}

	dragOver(event: DragEvent, wrapper: HTMLDivElement) {
		const bottomTask = this.insertAboveTask(wrapper, event.clientY)
		const curTask = document.querySelector('.dragging')
		const lastChild = wrapper.lastElementChild;

		if (!bottomTask) {
			wrapper.insertBefore(curTask!, lastChild)
		} else {
			wrapper.insertBefore(curTask!, bottomTask)
		}

		const scrollThreshold = 50;
		const containerRect = wrapper.getBoundingClientRect();
		const isNearTop = (event.clientY - containerRect.top) < scrollThreshold;
		const isNearBottom = (containerRect.bottom - event.clientY) < scrollThreshold;

		if (isNearTop) {
			// Calculate the scroll speed based on the distance from the top
			const scrollSpeed = (scrollThreshold - (event.clientY - containerRect.top)) / scrollThreshold;
			const scrollAmount = scrollSpeed * 3

			// Scroll the container upwards with a smooth behavior
			wrapper.scrollTo({
				top: wrapper.scrollTop - scrollAmount,
				behavior: 'smooth'
			});
		} else if (isNearBottom) {
			// Calculate the scroll speed based on the distance from the bottom
			const scrollSpeed = (scrollThreshold - (containerRect.bottom - event.clientY)) / scrollThreshold;
			const scrollAmount = scrollSpeed * 3

			// Scroll the container downwards with a smooth behavior
			wrapper.scrollTo({
				top: wrapper.scrollTop + scrollAmount,
				behavior: 'smooth'
			});
		}
	}

	insertAboveTask(wrapper: HTMLDivElement, mouseY: number) {
		const els = wrapper.querySelectorAll(`.${this.elementPath}:not(.dragging)`)

		let closestTask: null | Element = null
		let closestOffset = Number.NEGATIVE_INFINITY

		els.forEach(task => {
			const { top } = task.getBoundingClientRect()

			const offset = mouseY - top - 40

			if (offset < 0 && offset > closestOffset) {
				closestOffset = offset
				closestTask = task
			}
		})

		return closestTask
	}
}