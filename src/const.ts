import { Buttons, Classes } from './types';

export const [TEXT, HTML] = ['text', 'html'];

export const defaultClasses: Classes = {
  container: 'vue-truncate-html',
  content: 'vue-truncate-html__content',
  contentHtml: 'vue-truncate-html__content_html',
  contentText: 'vue-truncate-html__content_text',
  button: 'vue-truncate-html__button',
  buttonMore: 'vue-truncate-html__button_more',
  buttonLess: 'vue-truncate-html__button_less',
};

export const defaultButtons: Buttons = {
  more: 'Read More',
  less: 'Show Less',
};
