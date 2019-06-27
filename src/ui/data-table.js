import { BaseElement } from './base-element';

export class DataTable extends BaseElement {
  constructor(headers, fleet) {
    super();
    this.headers = headers;
    this.fleet = fleet;
  }

  getElementString() {
    let th = '';
    let tr = '';
    let td = '';
    for (const h of this.headers) {
      th += `
      <th class="mdl-data-table__cell--non-numeric">
        ${h}
      </th>
      `;
    }
    console.log('TCL: DataTable -> getElementString -> this.fleet', this.fleet);
    for (const prop of this.fleet) {
      console.log(prop);
    }

    return `
    <table class="mdl-data-table mdl-js-data-table mdl-data-table--selectable mdl-shadow--2dp">
  <thead>
    <tr>
    ${th}
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="mdl-data-table__cell--non-numeric">Acrylic (Transparent)</td>
      <td>25</td>
      <td>$2.90</td>
    </tr>
    <tr>
      <td class="mdl-data-table__cell--non-numeric">Plywood (Birch)</td>
      <td>50</td>
      <td>$1.25</td>
    </tr>
    <tr>
      <td class="mdl-data-table__cell--non-numeric">Laminate (Gold on Blue)</td>
      <td>10</td>
      <td>$2.35</td>
    </tr>
  </tbody>
</table>
    `;
  }
}
