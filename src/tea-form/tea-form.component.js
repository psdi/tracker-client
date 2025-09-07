import html from './tea-form.component.html?raw';
import styles from './tea-form.component.scss?raw';
import {TeaType} from "../TeaType";

const template = document.createElement('template');
template.innerHTML = `${html}`;
const css = new CSSStyleSheet();
css.replaceSync(styles);

export const TEA_FORM_TAG_NAME = 'tea-form';

export class TeaFormComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.adoptedStyleSheets = [css];
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    void this.fillNameSelectOptions();
    this.fillTypeSelectOptions();
    this.toggleCustomInputField('select#nameId', 'div.custom-name-row');
  }

  connectedCallback() {
    window.routerLinkSetup(this.shadowRoot);
  }

  fillTypeSelectOptions() {
    const select = this.shadowRoot.querySelector('select#typeId');
    Object.values(TeaType).forEach((type) => {
      let option = document.createElement('option');
      option.value = type.id;
      option.textContent = type.str;
      select.appendChild(option);
    });
  }

  async fillNameSelectOptions() {
    const select = this.shadowRoot.querySelector('select#nameId');
    let names = [];
    try {
      const response = await fetch('/names');
      if (!response.ok) {
        throw new Error(`Response message: ${response.status}`);
      }
      names = await response.json();
    } catch (error) {
      console.error(error);
    }
    names.forEach((name) => {
      let option = document.createElement('option');
      option.value = name.id;
      option.textContent = name.value;
      select.appendChild(option);
    });
  }

  /**
   * @param ref Selector of reference `select` element: if the use selects `other`, show hidden fields
   * @param custom Selector(s) of hidden fields to toggle visibility of
   */
  toggleCustomInputField(ref, custom) {
    const elems = this.shadowRoot.querySelectorAll(custom);
    this.shadowRoot.querySelector(ref).addEventListener('change', (event) => {
      if ((event.target.value === '-' && elems[0].hasAttribute('hidden'))
        || (event.target.value !== '-' && !elems[0].hasAttribute('hidden'))
      ) {
        elems.forEach(elem => elem.toggleAttribute('hidden'));
      }
    });
  }
}
