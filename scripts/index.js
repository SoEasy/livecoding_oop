const items = [
  'Сделать проектную работу',
  'Полить цветы',
  'Пройти туториал по Реакту',
  'Сделать фронт для своего проекта',
  'Погулять с собакой',
  'Разобраться в замыканиях',
  'Решить задачу на Codewars'
];

class TodoListForm {
  static _template = document.querySelector('#todolist-form-template').content;

  _handleFormSubmit = (e) => {
    e.preventDefault();
    const input = this._view.querySelector('.todolist-form_input');
    const value = input.value;

    this._submitCallback && this._submitCallback(value);
  }

  render(toContainer) {
    this._view = TodoListForm._template.cloneNode(true).children[0];

    this._view.addEventListener('submit', this._handleFormSubmit);

    toContainer.append(this._view);
  }

  onSubmit(callback) {
    this._submitCallback = callback;
  }
}

class TodoListItem {
  static _template = document.querySelector('#todolist-item-template').content;

  constructor(text) {
    this._text = text;
  }

  _handleDelClick = () => {
    this._view.remove();
  }

  _handleCopyClick = () => {
    this._copyCallback && this._copyCallback(this._text);
  }

  onCopy(callback) {
    this._copyCallback = callback;
  }

  render(toContainer) {
    this._view = TodoListItem._template.cloneNode(true).children[0];
    this._view.querySelector('.todolist-item__text').textContent = this._text;
    this._view.querySelector('.todolist-item__del').addEventListener('click', this._handleDelClick);
    this._view.querySelector('.todolist-item__copy').addEventListener('click', this._handleCopyClick);
    toContainer.append(this._view);
  }
}

class TodoList {
  static _template = document.querySelector('#todolist-template').content;

  constructor(items) {
    this._items = items;
  }

  _makeItem = (text) => {
    const itemInstance = new TodoListItem(text);
    itemInstance.render(this._view);
    itemInstance.onCopy(this._makeItem);
  }

  render(toContainer) {
    this._view = TodoList._template.cloneNode(true).children[0];

    const form = new TodoListForm();
    form.render(this._view);

    form.onSubmit(this._makeItem);

    this._items.forEach(item => {
      this._makeItem(item);
    })

    toContainer.append(this._view);
  }
}

const page = document.querySelector('.page');
const List = new TodoList(items);
List.render(page);
