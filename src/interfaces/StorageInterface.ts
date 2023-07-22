export interface StorageComponentInterface {
	setColumn(column: HTMLDivElement): void
	setRow(row: HTMLDivElement): void
	deleteColumn(column: HTMLDivElement): void
	deleteRow(row: HTMLDivElement): void
	saveData(): void
}

export interface ColumnObjectInterface {
	id: string
	value: string
	rows: RowObjectInterface[]
}

export interface RowObjectInterface {
	id: string
	value: string
}