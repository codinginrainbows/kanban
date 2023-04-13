import DropZone from "./DropZone.js";
import KanbanManip from "./KanbanManip.js";

export default class Item {
	constructor(id, content) {
		const bottomDropZone = DropZone.criarDropZone();

		this.elements = {};
		this.elements.root = Item.criarInput();
		this.elements.input = this.elements.root.querySelector(".kanban__item-input");

		this.elements.root.dataset.id = id;
		this.elements.input.textContent = content;
		this.content = content;
		this.elements.root.appendChild(bottomDropZone);

		const onBlur = () => {
			const newContent = this.elements.input.textContent.trim();

			this.content = newContent;

			KanbanManip.updateItem(id, {
				content: this.content
			});
		};

		this.elements.input.addEventListener("blur", onBlur);
		
		this.elements.root.addEventListener("dblclick", () => {
			KanbanManip.deletarItem(id);
			this.elements.input.removeEventListener("blur", onBlur);
			this.elements.root.parentElement.removeChild(this.elements.root);
		});

		this.elements.root.addEventListener("dragstart", e => {
			e.dataTransfer.setData("text/plain", id);
		});

		this.elements.input.addEventListener("drop", e => {
			e.preventDefault();
		});
	}

	static criarInput() {
		const range = document.createRange();

		range.selectNode(document.body);

		return range.createContextualFragment(`
			<div class="kanban__item" draggable="true">
				<div class="kanban__item-input" contenteditable></div>
			</div>
		`).children[0];
	}
}
