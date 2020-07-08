import { Component, OnInit } from '@angular/core';
import { DataNode } from '../../DataNode';
import sampleData from '../../assets/sampledata.csv';

@Component({
  selector: 'app-data-list',
  templateUrl: './data-list.component.html',
  styleUrls: ['./data-list.component.scss']
})
export class DataListComponent implements OnInit {
  nodeList: { [id:number] : DataNode } = {};
  rootNode: DataNode;
  listItemChildrenVisible: { [id:number] : boolean } = {};
  constructor() { }

  ngOnInit(): void {
    this.analyseData();
  }

  analyseData(): void {
    sampleData.forEach(item => {
        let dataNode  = new DataNode(item.id, item.name, item.parent_id, item.value, this.nodeList);
        this.nodeList[item.id] = dataNode;
    });
    let firstKey: string = Object.keys(this.nodeList)[0];
    this.rootNode = this.nodeList[firstKey];
    this.rootNode.calculateTotalValue();
    Object.keys(this.nodeList).forEach((key) => {
      this.listItemChildrenVisible[key] = true;
    });
  }

  handleSetChildrenVisibility(id: number, value: boolean) : void {
    this.listItemChildrenVisible[id] = value;
  }

  handleExpandAllItems() : void {
    Object.keys(this.listItemChildrenVisible).forEach((key) => {
      this.listItemChildrenVisible[key] = true;
    });
  }

  handleCollapseAll() : void {
    Object.keys(this.listItemChildrenVisible).forEach((key) => {
      this.listItemChildrenVisible[key] = false;
    });
  }
}