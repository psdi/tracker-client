import html from './tea-form.component.html?raw';
import styles from './tea-form.component.scss?raw';
import {TeaType} from "../TeaType";

const template = document.createElement('template');
template.innerHTML = `${html}`;
const css = new CSSStyleSheet();
css.replaceSync(styles);

export const TEA_FORM_TAG_NAME = 'tea-form';
const API_ENDPOINT = '';

export class TeaFormComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.adoptedStyleSheets = [css];
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    // Build form dropdown elements
    void this.fillDropdownElements('select#nameId', 'names');
    void this.fillDropdownElements('select#vendorId', 'vendors');
    void this.fillDropdownElements('select#originId', 'locations');
    this.fillTypeSelectOptions();

    // Set up events for custom text inputs
    this.toggleCustomInputField('select#nameId', 'div.custom-name-row');
    this.toggleCustomInputField('select#originId', 'div.custom-origin-row');
    this.toggleCustomInputField('select#vendorId', 'div.custom-vendor-row');
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

  async fillDropdownElements(selector, resource) {
    if (!selector || !resource) return;
    const select = this.shadowRoot.querySelector(selector);
    let entities = [];
    try {
      const response = await fetch(`${API_ENDPOINT}/${resource}`);
      if (!response.ok) {
        throw new Error(`Response message: ${response.status}`);
      }
      entities = await response.json();
    } catch (error) {
      console.error(error);
    }
    entities.forEach((entity) => {
      let option = document.createElement('option');
      option.value = entity.id;
      option.textContent = entity.value;
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
