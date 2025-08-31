import {
  TEA_DETAILS_TAG_NAME,
  TeaDetailsComponent
} from './tea-details.component.js';

if (customElements.get(TEA_DETAILS_TAG_NAME) === undefined) {
  customElements.define(TEA_DETAILS_TAG_NAME, TeaDetailsComponent);
}
