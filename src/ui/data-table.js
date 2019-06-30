import { BaseElement } from './base-element';

export class DataTable extends BaseElement {
  constructor(headers, fleet) {
    super();
    this.headers = headers;
    this.fleet = fleet;
  }

  getElementString() {
    let thTags = '';
    let trTags = '';
    for (const h of this.headers) {
      thTags += `
      <th class="mdl-data-table__cell--non-numeric">
        ${h}
      </th>\n
      `;
    }
    for (const row of this.fleet) {
      trTags += `<tr>`;
      for (const property of this.headers) {
        let field = row[property.toLowerCase()];
        trTags += `
          <td class="mdl-data-table__cell--non-numeric">
          ${field}
          </td>
        `;
      }
      trTags += `</tr>`;
    }

    return `
            <table class="mdl-data-table mdl-js-data-table mdl-shadow--2dp">
                <thead>
                    <tr>
                    ${thTags}
                    </tr>
                </thead>
                <tbody>
                    ${trTags}
                </tbody>
            </table>
        `;
  }
}
