import { BaseElement } from './base-element';

export class Image extends BaseElement {
  constructor(src) {
    super();
    this.src = src;
  }

  //   override same method name in base class
  getElementString() {
    return ` <img src="${this.src}" style="width: 100%;"/> `;
  }
}
