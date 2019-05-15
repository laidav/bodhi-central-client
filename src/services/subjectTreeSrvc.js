import { subjectsList } from "services/constantsSrvc";
import SubjectNode from "models/SubjectNode";

class SubjectTree {
  constructor(subjectsList) {
    const nodeMapper = new Map();

    for (let i = 0; i < subjectsList.length; i++) {
      nodeMapper.set(subjectsList[i].id, new SubjectNode(subjectsList[i]));
    }

    for (let i = 0; i < subjectsList.length; i++) {
      let node = nodeMapper.get(subjectsList[i].id);
      node.firstChild = nodeMapper.get(subjectsList[i].first_child_id) || null;
      node.rightSibling =
        nodeMapper.get(subjectsList[i].right_sibling_id) || null;
    }

    this.root = nodeMapper.get(12);
  }

  getChildren(node) {
    const children = [];

    if (node.firstChild !== null) {
      children.push(node.firstChild);

      let currentNode = node.firstChild.rightSibling;

      while (currentNode !== null) {
        children.push(currentNode);
        currentNode = currentNode.rightSibling;
      }
    }

    return children;
  }
}

export default new SubjectTree(subjectsList);
