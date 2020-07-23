class ClassName {
  static _template = document.querySelector('#template-id').content;

  constructor() {
  }

  render = (container) => {
    this._view = TodoList._template.cloneNode(true).children[0];
  }

}
