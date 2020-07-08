export class DataNode {
    id: number;
    name: string;
    parentId: number;
    parentNode: DataNode;
    childNodes: DataNode[] = [];
    value: number;
    totalValue: number = 0;
    calculatedTotalValue: boolean = false;
    nodeList: { [id:number] : DataNode };
  
  
    constructor(id: number, name: string, parentId: number, value: number, nodeList: { [id:number] : DataNode }) {
      this.id = id;
      this.name = name;
      this.parentId = parentId;
      this.value = value;
  
      if(nodeList[this.parentId] !== undefined) {
        let parentNode = nodeList[this.parentId];
        this.addParentNode(parentNode);
        parentNode.addChildNode(this);
      }
    }
    
    addChildNode(node: DataNode) {
      this.childNodes.push(node);
    }
  
    addParentNode(node: DataNode) {
      this.parentNode = node;
    }
  
  
    getTotalValue(): number {
      if(this.calculatedTotalValue === false) {
        this.calculateTotalValue()
      }
      return this.totalValue;
    }
  
    calculateTotalValue() {
      let totalValue: number = this.value;
      this.childNodes.forEach(childNode => {
        totalValue += childNode.getTotalValue();
      });
      this.totalValue = Math.round(totalValue * 100) / 100;
      this.calculatedTotalValue = true;
    }
  }
  