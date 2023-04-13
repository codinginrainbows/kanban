import Column from "./Column.js";

export default class Fases {
	constructor(root) {
		const removeItems = document.querySelector(".clear_kanban");
		
		removeItems.addEventListener("click", () => {
			localStorage.clear()
			window.location.reload()
		});

		this.root = root;

		Fases.columns().forEach(column => {
			const colunaView = new Column(column.id, column.title);

			this.root.appendChild(colunaView.elements.root);
		});
	}

	static columns() {
		return [
			{
				id: 1,
				title: "Projeto"
			},
			{
				id: 2,
				title: "Implementação"
			},
			{
				id: 3,
				title: "Testes"
			}
		];
	}
}
