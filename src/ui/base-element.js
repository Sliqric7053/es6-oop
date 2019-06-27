export class BaseElement {
  constructor() {
    this.element = null;
  }

  appendToElement(el) {
    this.createElement();
    el.insertAdjacentHTML('beforeend', this.element);
    // this.enableMdlJS(); // enables animations on MDL (seems to work fine without it)
  }

  createElement() {
    let s = this.getElementString();
    this.element = s;
  }

  getElementString() {
    console.log(`I'm overidden`);
    throw 'Please override getElementString() in BaseElement';
  }

  enableMdlJS() {
    componentHandler.upgradeElement(this.element[0]);
  }
}
