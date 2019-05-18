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
    this.nodeMapper = nodeMapper;
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

  dfsTraversal(searcher, startNode) {
    const _depthTraversalRecursive = node => {
      _checkSiblingsRecursive(node.firstChild);
    };

    const _checkSiblingsRecursive = node => {
      searcher.compare(node);

      if (searcher.searchDone) {
        return searcher.results;
      }

      if (node === null) {
        return;
      }

      if (node.firstChild) {
        _depthTraversalRecursive(node);
      }

      node = node.rightSibling;

      _checkSiblingsRecursive(node);
    };

    searcher.compare(startNode);

    _depthTraversalRecursive(startNode);

    searcher.searchDone = true;

    return searcher.searchResults;
  }

  getDepth(refNode) {
    const depthSearch = {
      compare: node => {
        if (node === null) {
          depthSearch.ancestors.pop();
          return;
        }

        if (node === refNode) {
          depthSearch.searchResults = depthSearch.ancestors.length;
          depthSearch.searchDone = true;
        }

        if (node.firstChild) {
          depthSearch.ancestors.push(node);
        }
      },
      ancestors: [],
      searchDone: false,
      searchResults: null
    };

    return this.dfsTraversal(depthSearch, this.root);
  }
}

export default new SubjectTree(subjectsList);
