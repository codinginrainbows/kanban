export default class KanbanManip {
	static getItems(colunaId) {
		const column = ler().find(column => column.id == colunaId);

		return column.itemss;
	}

	static insertItem(colunaId, content) {
		const data = ler();
		const column = data.find(column => column.id == colunaId);
		
		const item = {
			id: Math.floor(Math.random() * 1000),
			content: content
		};

		column.itemss.push(item);
		salvar(data);

		return item;
	}

	static updateItem(itemId, newProps) {
		const data = ler();
		const [item, currentColumn] = (() => {
			for (const column of data) {
				const item = column.itemss.find(item => item.id == itemId);

				if (item) {
					return [item, column];
				}
			}
		})();

		item.content = newProps.content === undefined ? item.content : newProps.content;

		if (
			newProps.colunaId !== undefined
			&& newProps.position !== undefined
		) {
			const targetColumn = data.find(column => column.id == newProps.colunaId);

			currentColumn.itemss.splice(currentColumn.itemss.indexOf(item), 1);

			targetColumn.itemss.splice(newProps.position, 0, item);
		}

		salvar(data);
	}

	static deletarItem(itemId) {
		const data = ler();

		for (const column of data) {
			const item = column.itemss.find(item => item.id == itemId);

			if (item) {
				column.itemss.splice(column.itemss.indexOf(item), 1);
			}
		}

		salvar(data);
	}
}

function ler() {
	const json = localStorage.getItem("kanban-data");

	if (!json) {
		return [
			{
				id: 1,
				itemss: []
			},
			{
				id: 2,
				itemss: []
			},
			{
				id: 3,
				itemss: []
			},
		];
	}

	return JSON.parse(json);
}

function salvar(data) {
	localStorage.setItem("kanban-data", JSON.stringify(data));
}