export type Type = 'text' | 'html';

export type Buttons = {
  more: string
  less: string
}

export type Classes = {
  container: string
  content: string
  contentHtml: string
  contentText: string
  button: string
  buttonMore: string
  buttonLess: string
}

export interface ProcessedContent {
  isHTML: boolean;
  displayText: string;
  showButton: boolean;
  buttonTitle: string;
  buttonClass: string;
}
