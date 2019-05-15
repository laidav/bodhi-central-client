export default class SubjectNode {
  constructor({ id, name }) {
    this.id = id;
    this.name = name;
    this.firstChild = null;
    this.rightSibling = null;
  }
}
