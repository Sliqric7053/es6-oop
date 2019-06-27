import { BaseElement } from './base-element';

export class TitleBar extends BaseElement {
  constructor(title) {
    super();
    this.title = title;
    this.links = [];
  }

  addLink(title, href) {
    this.links.push({ title, href });
  }

  //   override same method name in base class
  getElementString() {
    let links = '';
    for (const link of this.links) {
      links += `<a class="mdl-navigation__link" href="${link.href}">${
        link.title
      }</a>\n`;
    }
    // return ``;
    return `
    <!-- Uses a header that contracts as the page scrolls down. -->
    <style>
    .demo-layout-waterfall .mdl-layout__header-row .mdl-navigation__link:last-of-type  {
    padding-right: 0;
    }
    </style>

    <div class="demo-layout-waterfall mdl-layout mdl-js-layout">
        <header class="mdl-layout__header mdl-layout__header--waterfall">
            <!-- Top row, always visible -->
            <div class="mdl-layout__header-row">
            <!-- Title -->
            <span class="mdl-layout-title">${this.title}</span>
            <div class="mdl-layout-spacer"></div>
            <div class="mdl-textfield mdl-js-textfield mdl-textfield--expandable
                        mdl-textfield--floating-label mdl-textfield--align-right">
                <label class="mdl-button mdl-js-button mdl-button--icon"
                    for="waterfall-exp">
                <i class="material-icons">search</i>
                </label>
                <div class="mdl-textfield__expandable-holder">
                <input class="mdl-textfield__input" type="text" name="sample"
                        id="waterfall-exp">
                </div>
            </div>
            </div>
            <!-- Bottom row, not visible on scroll -->
            <div class="mdl-layout__header-row">
            <div class="mdl-layout-spacer"></div>
            <!-- Navigation -->
            <nav class="mdl-navigation">
                ${links}
            </nav>
            </div>
        </header>
        <div class="mdl-layout__drawer">
            <span class="mdl-layout-title">${this.title}</span>
            <nav class="mdl-navigation">
        ${links}
            </nav>
        </div>
        <main class="mdl-layout__content">
            <div class="page-content"><!-- Your content goes here --></div>
        </main>
     </div>
    `;
  }
}
