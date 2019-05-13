export default class SubjectNode {
  constructor(subject) {
    this.id = subject.id;
    this.name = subject.name;
    this.firstChildId = subject.first_child_id;
    this.rightSiblingId = subject.right_sibling_id;
    this.firstChild = null;
    this.rightSibling = null;
  }
}
