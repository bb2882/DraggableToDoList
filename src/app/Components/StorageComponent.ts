import { StorageComponentInterface, ColumnObjectInterface, RowObjectInterface } from '../../interfaces/StorageInterface';

export class Storage implements StorageComponentInterface{
	static arr: ColumnObjectInterface[] = [];

	setColumn(column: HTMLDivElement) {
		const textarea = column.querySelector('textarea') as HTMLTextAreaElement;

		let obj: ColumnObjectInterface = {
			id: column.id,
			value: textarea.value,
			rows: [],
		};

		textarea.addEventListener('input', () => {
			obj.value = textarea.value;
			this.saveData();
		});

		Storage.arr.push(obj);
		this.saveData();
	}

	setRow(row: HTMLDivElement) {
		const textarea = row.querySelector('textarea') as HTMLTextAreaElement;
		const parentId = (row.closest('.column') as HTMLDivElement).id;
		const parentObj = Storage.arr.find((object: ColumnObjectInterface) => object.id === parentId) as ColumnObjectInterface
		
		//finding index to place the row after drag
		const rows = Array.from(row.parentNode?.querySelectorAll('.row')!)
		const foundIndex = rows.findIndex((obj) => obj.id === row.id);
		
		if (parentObj) {
			let obj: RowObjectInterface = {
				id: row.id,
				value: textarea.value,
			};

			textarea.addEventListener('input', () => {
				obj.value = textarea.value;
				this.saveData();
			});

			parentObj.rows.splice(foundIndex, 0, obj);
			this.saveData();
		} else {
			console.error("Parent object not found for the given parentId:", parentId);
		}
	}

	deleteColumn(column: HTMLDivElement) {
		const item = Storage.arr.find(object => object.id === column.id)

		if (item) {
			Storage.arr.splice(Storage.arr.indexOf(item),1)
			this.saveData()
		}
	}

	deleteRow(row: HTMLDivElement) {
		const indexToRemove = Storage.arr.findIndex(obj => {
			return obj.rows.some(item => item.id === row.id);
		});

		if (indexToRemove !== -1) {
			const objToUpdate = Storage.arr[indexToRemove];
			const filteredRows = objToUpdate.rows.filter(item => item.id !== row.id);
			objToUpdate.rows = filteredRows;
			this.saveData();
		}
	}

	saveData() {
		localStorage.setItem('data', JSON.stringify(Storage.arr));
	}

}