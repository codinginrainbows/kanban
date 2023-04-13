import KanbanManip from "./KanbanManip.js";
import DropZone from "./DropZone.js";
import Item from "./Item.js";

export default class Column {
	constructor(id, title) {
		const topDropZone = DropZone.criarDropZone();

		this.elements = {};
		this.elements.root = Column.criarColuna();
		this.elements.title = this.elements.root.querySelector(".kanban__coluna-titulo");
		this.elements.itemss = this.elements.root.querySelector(".kanban__coluna-items");
		this.elements.addItem = this.elements.root.querySelector(".kanban__add-item");

		this.elements.root.dataset.id = id;
		this.elements.title.textContent = title;
		this.elements.itemss.appendChild(topDropZone);

		this.elements.addItem.addEventListener("click", () => {
			const newItem = KanbanManip.insertItem(id, "");

			this.renderItem(newItem);
		});

		KanbanManip.getItems(id).forEach(item => {
			this.renderItem(item);
		});
	}

	static criarColuna() {
		const range = document.createRange();

		range.selectNode(document.body);

		return range.createContextualFragment(`
			<div class="kanban__coluna">
				<div class="kanban__coluna-titulo"></div>
				<div class="kanban__coluna-items"></div>
				<button class="kanban__add-item" type="button">Adicionar</button>
			</div>
		`).children[0];
	}

	renderItem(data) {
		const item = new Item(data.id, data.content);

		this.elements.itemss.appendChild(item.elements.root);
	}
}
