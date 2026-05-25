/* eslint-disable @typescript-eslint/no-explicit-any */
import { URL_GENERATE_TYPE, URL_TYPE } from '../../model';
import { renderTemplate } from '../string.util';

const EXCLUDED_KEYS = new Set(['redirect_url']);

async function interpolateWithTracking(
  template: unknown,
  params: Record<string, unknown>,
  urls: any[],
  generateUrlFunction: any
): Promise<unknown> {
  if (typeof template === 'string') {
    return renderTemplate(template, params);
  }

  if (Array.isArray(template)) {
    const results: unknown[] = [];
    for (const item of template) {
      results.push(
        await interpolateWithTracking(item, params, urls, generateUrlFunction)
      );
    }
    return results;
  }

  if (template !== null && typeof template === 'object') {
    const obj = template as Record<string, unknown>;
    const result: Record<string, unknown> = {};

    // Pass 1: resolve all redirect_url entries first so tracking codes are
    // written into params before any parameters field is interpolated.
    for (const [k, v] of Object.entries(obj)) {
      if (k !== 'redirect_url' || typeof v !== 'string') continue;

      const renderedUrl = renderTemplate(v, params);
      const redirectUrlType = obj['redirect_url_type'] || URL_TYPE.ORIGIN;

      let resultUrl;
      if (redirectUrlType !== URL_TYPE.LANDING_PAGE) {
        resultUrl = await generateUrlFunction({
          redirectUrl: renderedUrl,
          type: redirectUrlType,
          generateType: URL_GENERATE_TYPE.REDIRECT,
          urlOrigin: v,
          context: {},
        });
      }

      delete obj['redirect_url_type'];

      if (resultUrl) {
        urls.push(resultUrl.url);
        // tracking code for meta
        (obj as any).parameters[0].text = resultUrl.url?.code;
        // tracking code for alibaba params
        params[`mmp_tracking_code_${(obj as any).index}`] = resultUrl.url?.code;
      }
    }

    // Pass 2: interpolate remaining fields (redirect_url and redirect_url_type excluded).
    for (const [k, v] of Object.entries(obj)) {
      if (EXCLUDED_KEYS.has(k) || k === 'redirect_url_type') continue;

      result[k] = await interpolateWithTracking(
        v,
        params,
        urls,
        generateUrlFunction
      );
    }

    return result;
  }

  return template;
}

export async function renderWhatsappTemplate2(
  template: any,
  answerKeys: Record<string, any>,
  generateUrlFunction: any,
  urls: any[]
) {
  const sendParams = template.sendParams;

  Object.keys(sendParams).forEach((key) => {
    sendParams[key] = renderTemplate(sendParams[key], answerKeys);
  });
  template.sendApi = await interpolateWithTracking(
    template.sendApi,
    sendParams,
    urls,
    generateUrlFunction
  );

  console.log(`sendParams`, sendParams);
  console.log(`template.sendApi`, JSON.stringify(template.sendApi));

  return template;
}

function extractAllButtons(ui: any): Array<any> {
  const {
    components: { cards, buttons },
  } = ui;

  if (cards?.length) {
    return cards.flatMap((card: any) => card.buttons);
  }

  return buttons ?? [];
}

export async function renderWhatsappTemplate(
  template: any,
  answerKeys: Record<string, any>,
  generateUrlFunction: any,
  urls: any[]
) {
  const sendParams = template.sendParams;

  Object.keys(sendParams).forEach((key) => {
    sendParams[key] = renderTemplate(sendParams[key], answerKeys);
  });

  const buttons = extractAllButtons(template.ui);

  for (let i = 0; i < buttons.length; i += 1) {
    const button = buttons[i];
    if (button.redirect_url) {
      const renderedUrl = renderTemplate(button.redirect_url, sendParams);
      const redirectUrlType = button['redirect_url_type'] ?? URL_TYPE.ORIGIN;
      const generateUrlType = URL_GENERATE_TYPE.REDIRECT;

      const generatedUrl = await generateUrlFunction({
        redirectUrl: renderedUrl,
        type: redirectUrlType,
        generateType: URL_GENERATE_TYPE.REDIRECT,
        urlOrigin: button.redirect_url,
        context: {},
      });

      if (generateUrlType) {
        urls.push(generatedUrl.url);
        sendParams[`mmp_tracking_code_${button.index ?? i}`] =
          generatedUrl.url.code;
      }
    }
  }

  console.log(`sendParams`, sendParams);

  return template;
}
