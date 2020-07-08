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
  @Input() setChildrenVisibility : Function;
  @Input() listItemChildrenVisible : { [id:number] : boolean };
  
  constructor() { }

  ngOnInit(): void {
  }

  handleToggleChildren() : void {
    // only bother toggling children if there are children to hide and show
    if(this.dataNode.childNodes.length > 0) {
      this.setChildrenVisibility(this.dataNode.id, !this.childrenVisible);
    }
  }

  handleCollapseOthers() : void {
    let idsToKeepVisible = [this.dataNode.id];
    this.getParentIds(this.dataNode.parentNode, idsToKeepVisible)

    Object.keys(this.listItemChildrenVisible).forEach((key) => {
      if(idsToKeepVisible.includes(parseInt(key))) {
        this.setChildrenVisibility(key, true);
      }
      else {
        this.setChildrenVisibility(key, false);
      }
    });
  }

  getParentIds(node : DataNode, idList: number[]) : void {
    idList.push(node.parentId)
    if(node.parentNode !== undefined) {
      this.getParentIds(node.parentNode, idList)
    }
  }


  get childrenVisible() : boolean {
    return this.listItemChildrenVisible[this.dataNode.id];
  }

}
