import {
  TEA_VIEWER_TAG_NAME,
  TeaViewerComponent
} from './tea-viewer.component.js';

if (customElements.get(TEA_VIEWER_TAG_NAME) === undefined) {
  customElements.define(TEA_VIEWER_TAG_NAME, TeaViewerComponent);
}
