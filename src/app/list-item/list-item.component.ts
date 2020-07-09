import { Component, OnInit, Input } from '@angular/core';
import { DataNode } from '../../DataNode';

@Component({
	selector: 'app-list-item',
	templateUrl: './list-item.component.html',
	styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent implements OnInit {
	@Input() dataNode: DataNode;
	@Input() indent: number;
	@Input() setChildrenVisibility: Function;
	@Input() setSelectedNode: Function;
	@Input() listItemChildrenVisible: { [id: number]: boolean };

	constructor() { }

	ngOnInit(): void {
	}


	/**
	 * @description
	 * handles toggling of children visibility 
	 */
	handleToggleChildren = (): void => {
		// only bother toggling children if there are children to hide and show
		if (this.dataNode.childNodes.length > 0) {
			this.setChildrenVisibility(this.dataNode.id, !this.childrenVisible);
		}
	}


	/**
	 * @description
	 * expands all children and it
	 */
	handleExpandAllChildren = (): void => {
		this.setHierarchyVisible(this.dataNode);
	}

	/**
	 * @description
	 * recursively sets children to visible for all nodes bellow given node in hierarchy
	 * @param node the current node to set it's children set as 
	 */
	private setHierarchyVisible = (node : DataNode) : void => {
		this.setChildrenVisibility(node.id, true);

		node.childNodes.forEach((node) => {
			this.setHierarchyVisible(node);
		});
	}


	/**
	 * @description
	 * returns the current visibility of the items children
	 */
	get childrenVisible(): boolean {
		return this.listItemChildrenVisible[this.dataNode.id];
	}


	/**
	 * @description
	 * returns if the select button should be shown for this list item
	 */
	get showSelectButton() : boolean {
		if(this.dataNode.childNodes.length === 0 || this.dataNode.parentNode === undefined) {
			return false;
		}
		return true;
	}
}