import html from './teas.component.html?raw';

const template = document.createElement('template');
template.innerHTML = `${html}`;

export const TEAS_TAG_NAME = 'app-teas';

export class AppTeasComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot?.appendChild(template.content.cloneNode(true));
    this.init().then((value) => {
      this.createRows(value);
    });
  }

  connectedCallback() {
    window.routerLinkSetup(this.shadowRoot);
  }

  async init() {
    try {
      const response = await fetch(
          'http://localhost:8000/teas',
          {
            method: 'GET',
          }
      );
      if (!response.ok) {
        throw new Error(`Response message: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error(error);
    }
  }

  createRows(teas) {
    if (!("content" in document.createElement('template'))) return;
    const tbody = this.shadowRoot.querySelector('tbody');
    const template = this.shadowRoot.querySelector('#tea-row');
    for (const tea of teas) {
      const clone = template.content.cloneNode(true);
      let td = clone.querySelectorAll('td');
      td[0].textContent = tea?.name;
      td[1].textContent = tea?.typeId;
      td[2].textContent = tea?.origin;
      td[3].textContent = tea?.isAvailable;
      tbody.appendChild(clone);
    }
  }
}
