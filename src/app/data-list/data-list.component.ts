import { Component, OnInit } from '@angular/core';
import { DataNode } from '../../DataNode';
import sampleData from '../../assets/sampledata.csv';

@Component({
	selector: 'app-data-list',
	templateUrl: './data-list.component.html',
	styleUrls: ['./data-list.component.scss']
})
export class DataListComponent implements OnInit {
	// contains dictionary of all nodes
	nodeList: { [id: number]: DataNode } = {};
	// the top node in the node tree (has no parent node)
	rootNode: DataNode;
	// the currently selected node (nodes that are not child nodes will not be visible) will be null if there is no selected node
	selectedNode: DataNode = null;
	// list that contains data of which nodes are displaying there children
	listItemChildrenVisible: { [id: number]: boolean } = {};

	constructor() { }

	ngOnInit(): void {
		this.analyseData();
	}


	/**
	 * @description
	 * used to analyse the data in the sampledata.csv
	 * and format it into a effective tree structure
	 */
	private analyseData = (): void => {
		// creates a node and adds it to the list
		sampleData.forEach(item => {
			let dataNode = new DataNode(item.id, item.name, item.parent_id, item.value, this.nodeList);
			this.nodeList[item.id] = dataNode;
		});

		let firstKey: string = Object.keys(this.nodeList)[0];
		this.rootNode = this.nodeList[firstKey];
		// iteratively determines the total value for each node in the tree 
		this.rootNode.calculateTotalValue();
		// initializes the dictionary used to store weather each list item is open 
		Object.keys(this.nodeList).forEach((key) => {
			this.listItemChildrenVisible[key] = true;
		});
	}


	/**
	 * @description
	 * function is passed to child components so they can set the children visibility of other items/nodes
	 * @param id the id of the item that is having it's children's visibility changed
	 * @param value the new visibility value
	 */
	handleSetChildrenVisibility = (id: number, value: boolean): void => {
		this.listItemChildrenVisible[id] = value;
	}


	/**
	 * @description
	 * function is passed to child components so they can set the selected node
	 * @param id the id of the item/node to set as the selected node
	 * @param value the new visibility value
	 */
	handleSetSelectedNode = (id: number) => {
		this.selectedNode = this.nodeList[id];
	}

	/**
	 * @description
	 * clears the selected node and display all the nodes
	 */
	handleClearSelectedNode = () => {
		this.selectedNode = null;
	}


	/**
	 * @description
	 * shows the children for all nodes/items
	 */
	handleExpandAllItems = (): void => {
		Object.keys(this.listItemChildrenVisible).forEach((key) => {
			this.listItemChildrenVisible[key] = true;
		});
	}


	/**
	 * @description
	 * hides the children for all nodes/items
	 */
	handleCollapseAll = (): void => {
		Object.keys(this.listItemChildrenVisible).forEach((key) => {
			this.listItemChildrenVisible[key] = false;
		});
	}
}