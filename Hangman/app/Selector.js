export class Selector{
  constructor() {}
  getElement(id) {
    return document.getElementById(id);
  }
  getElmentsByCSS(selector) {
    return document.querySelectorAll(selector);
  }
  changeTextById(id,text) {
    return document.getElementById(id).textContent = text;
  }
  changeTextByCSS(selector, text) {
    return document.querySelector(selector).textContent = text;
  }
  createButton() {
    return document.createElement('button');
  }
  appendButton(id,button) {
    return this.getElement(id).append(button);
  }
}