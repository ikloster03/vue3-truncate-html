import { IOptions } from 'sanitize-html';
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

// Безопасные настройки санитизации по умолчанию
export const DEFAULT_SANITIZE_OPTIONS: IOptions = {
  allowedTags: [
    'p', 'br', 'strong', 'b', 'em', 'i', 'u', 'span', 'div',
    'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
    'ul', 'ol', 'li',
    'blockquote', 'pre', 'code',
    'a',
  ],
  allowedAttributes: {
    a: ['href', 'title', 'target'],
    '*': ['class', 'style'],
  },
  allowedSchemes: ['http', 'https', 'mailto'],
  allowedSchemesByTag: {
    a: ['http', 'https', 'mailto'],
  },
  allowProtocolRelative: false,
  disallowedTagsMode: 'discard',
  enforceHtmlBoundary: true,
};
