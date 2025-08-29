import {
  TEAS_TAG_NAME,
  AppTeasComponent
} from './teas.component.js';

if (customElements.get(TEAS_TAG_NAME) === undefined) {
  customElements.define(TEAS_TAG_NAME, AppTeasComponent);
}
