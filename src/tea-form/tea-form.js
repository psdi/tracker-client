import {
  TEA_FORM_TAG_NAME,
  TeaFormComponent
} from './tea-form.component';

if (customElements.get(TEA_FORM_TAG_NAME) === undefined) {
  customElements.define(TEA_FORM_TAG_NAME, TeaFormComponent)
}
