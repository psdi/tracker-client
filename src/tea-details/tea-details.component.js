import html from './tea-details.component.html?raw';
import styles from './tea-details.component.scss?raw';
import {TeaType} from "../TeaType";

const template = document.createElement('template');
template.innerHTML = `${html}`;
const css = new CSSStyleSheet();
css.replaceSync(styles);

export const TEA_DETAILS_TAG_NAME = 'tea-details';

export class TeaDetailsComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.adoptedStyleSheets = [css];
    this.shadowRoot?.appendChild(template.content.cloneNode(true));

    const match = /\/tea\/(\d+)/.exec(window.location.pathname);
    const id = match[1] || undefined;

    this.init(id).then((tea) => this.setValues(tea));
  }

  connectedCallback() {
    window.routerLinkSetup(this.shadowRoot);
  }

  async init(teaId) {
    if (teaId === undefined) return;
    try {
      const response = await fetch(`/teas/${teaId}`);
      if (!response.ok) {
        throw new Error(`Response message: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error(error);
    }
  }

  setValues(tea) {
    const details = this.shadowRoot.querySelector('#single-tea-details');
    const teaKey = Object.keys(TeaType).find(key => TeaType[key].id === tea?.typeId);
    details.querySelector('#name').textContent = tea?.name;
    details.querySelector('#type').textContent = TeaType[teaKey]?.str || 'unknown';
    details.querySelector('#origin').textContent = tea?.origin;
    details.querySelector('#harvest-year').textContent = tea?.harvestYear || 'unknown';
    details.querySelector('#vendor').textContent = tea?.vendor;
    details.querySelector('#amount').textContent = `${tea?.amount} g`;
    details.querySelector('#alias').textContent = tea?.alias || 'none';
    details.querySelector('#remarks').textContent = tea?.remarks || 'none';
  }
}
