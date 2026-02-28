import { LineAction, LineTemplate } from '../../model';
import { hasText, renderTemplate } from '../string.util';

export function renderLineTemplate(
  template: LineTemplate,
  answerKeys: Record<string, any>
) {
  if (template.title && hasText(template.title)) {
    template.title = renderTemplate(template.title, answerKeys);
  }

  if (template.text && hasText(template.text)) {
    template.text = renderTemplate(template.text, answerKeys);
  }

  if (template.thumbnailImageUrl && hasText(template.thumbnailImageUrl)) {
    template.thumbnailImageUrl = renderTemplate(
      template.thumbnailImageUrl,
      answerKeys
    );
  }

  if (template.defaultAction) {
    renderLineAction(template.defaultAction, answerKeys);
  }

  if (template.actions?.length) {
    template.actions.forEach((action) => renderLineAction(action, answerKeys));
  }

  if (template.columns?.length) {
    template.columns.forEach((column) => renderLineColumn(column, answerKeys));
  }
}

function renderLineColumn(
  column: NonNullable<LineTemplate['columns']>[number],
  answerKeys: Record<string, any>
) {
  if (column.title && hasText(column.title)) {
    column.title = renderTemplate(column.title, answerKeys);
  }

  if (column.text && hasText(column.text)) {
    column.text = renderTemplate(column.text, answerKeys);
  }

  if (column.thumbnailImageUrl && hasText(column.thumbnailImageUrl)) {
    column.thumbnailImageUrl = renderTemplate(
      column.thumbnailImageUrl,
      answerKeys
    );
  }

  if (column.imageUrl && hasText(column.imageUrl)) {
    column.imageUrl = renderTemplate(column.imageUrl, answerKeys);
  }

  if (column.defaultAction) {
    renderLineAction(column.defaultAction, answerKeys);
  }

  if (column.action) {
    renderLineAction(column.action, answerKeys);
  }

  if (column.actions?.length) {
    column.actions.forEach((action) => renderLineAction(action, answerKeys));
  }
}

function renderLineAction(action: LineAction, answerKeys: Record<string, any>) {
  if (action.label && hasText(action.label)) {
    action.label = renderTemplate(action.label, answerKeys);
  }

  if (action.data && hasText(action.data)) {
    action.data = renderTemplate(action.data, answerKeys);
  }

  if (action.text && hasText(action.text)) {
    action.text = renderTemplate(action.text, answerKeys);
  }

  if (action.clipboardText && hasText(action.clipboardText)) {
    action.clipboardText = renderTemplate(action.clipboardText, answerKeys);
  }

  if (action.uri && hasText(action.uri)) {
    action.uri = renderTemplate(action.uri, answerKeys);
  }

  if (action.nextMessage) {
    renderUiTemplateMessage(action.nextMessage, answerKeys);
  }
}

function renderUiTemplateMessage(
  message: any,
  answerKeys: Record<string, any>
) {
  // tùy structure của bạn
  if (message.text) {
    message.text = renderTemplate(message.text, answerKeys);
  }

  if (message.lineTemplate) {
    renderLineTemplate(message.lineTemplate.template, answerKeys);
  }
}
