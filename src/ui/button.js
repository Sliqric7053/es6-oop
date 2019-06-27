import { BaseElement } from './base-element';

export class Button extends BaseElement {
  constructor(title) {
    super();
    this.title = title;
  }

  //   override same method name in base class
  getElementString() {
    return `
            <button class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent">
            ${this.title}
            </button>
      `;
  }
}
