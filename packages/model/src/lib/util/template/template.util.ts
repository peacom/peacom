import {
  MESSAGE_TYPE,
  SuggestionActionType,
  WHATSAPP_BUTTON_URL_TYPE,
  WHATSAPP_TEMPLATE_BUTTON_TYPE,
  WhatsappTemplateButton,
} from '../../model';
import { hasText, renderTemplate } from '../string.util';
import { Url, URL_GENERATE_TYPE, URL_TYPE } from '../../model';
import { objectDeepClone } from '../general.util';
import { DATE_TIME_FORMAT, parseDateTimeByFormat } from '../date';

export interface GenerateUrlInput {
  redirectUrl: string;
  content?: any;
  type: URL_TYPE;
  generateType: URL_GENERATE_TYPE;
  urlOrigin?: string;
  landingPageId?: number;
  context?: any;
}

export interface GenerateUrlOutput {
  url: Url;
  link: string;
}

export type generateUrlFunction = (
  input: GenerateUrlInput
) => Promise<GenerateUrlOutput>;

async function renderWhatsappButton(
  button: WhatsappTemplateButton,
  answerKeys: any,
  urls: Array<Url>,
  generateUrl: generateUrlFunction
) {
  console.log(
    `renderWhatsappButton: button ~> ${JSON.stringify(
      button
    )}, answerKeys ~> ${JSON.stringify(button)}`
  );
  if (!button['isTracking']) {
    if (button.type === WHATSAPP_TEMPLATE_BUTTON_TYPE.FLOW) {
      const flow_action_data = button['flow_action_data'];
      if (flow_action_data && typeof flow_action_data === 'object') {
        Object.keys(flow_action_data).forEach((fk) => {
          flow_action_data[fk] = renderTemplate(
            flow_action_data[fk],
            answerKeys
          );
        });
        button['flow_action_data'] = {
          ...flow_action_data,
          ...(answerKeys?.contact || {}),
        };
      } else {
        button['flow_action_data'] = {
          ...(answerKeys?.contact || {}),
        };
      }
    }

    return {
      ...button,
      data: renderTemplate(button.data || '', answerKeys),
    };
  }

  /*
  Sample
    {
      "url": "https://www.localhost:2001",
      "data": "{{{mmp_url_code}}}",
      "text": "Visit Website Dynamic",
      "type": "URL" | "DYNAMIC_URL",
      "index": 0,
      "urlType": "dynamic",
      "isTracking": true,
      "redirectUrlType": 1 | 2,
      "redirectUrl": "https://tvhay.bz/phim_id=",
      "landingPage": {
        "id": 1,
        "name": "Test Landing Page"
      }
    }
  */
  const { url, redirectUrlType, landingPage } = button;
  let generateResult;
  if (redirectUrlType === URL_TYPE.LANDING_PAGE) {
    generateResult = await generateUrl({
      generateType: URL_GENERATE_TYPE.REDIRECT,
      type: redirectUrlType,
      landingPageId: landingPage?.id,
      redirectUrl: '',
      context: answerKeys,
    });
  } else {
    generateResult = await generateUrl({
      generateType: URL_GENERATE_TYPE.REDIRECT,
      type: redirectUrlType,
      urlOrigin: button['redirectUrl'] || url,
      redirectUrl: button['redirectUrl'] || url,
      context: answerKeys,
    });
  }

  // code will be appended to end of the url
  button.data = generateResult.url.code;

  urls.push(generateResult.url);

  return button;
}

/**
 *
 * @param {Object<{
      "v1": "{{{v1}}}",
      "v4": "{{{v4}}}",
      "code": {
        "type": "URL",
        "params": "{{{code}}}",
        "example": "XYZ123",
        "trackingUrl": "https://www.luckyshrub.com/deal?code="
      },
      "mmp_url_code": {
        "type": "URL",
        "params": "{{{mmp_url_code}}}",
        "example": "mmp_xyz",
        "trackingUrl": "https://www.luckyshrub.com/promotions/"
      }
    }>} alibabaParams
 * @param answerKeys
 * @param urls
 * @param generateUrl
 */
async function renderWhatsappAlibabaParams(
  alibabaParams: any,
  answerKeys: any,
  urls: Array<Url>,
  generateUrl: generateUrlFunction
) {
  const renderParams: Record<string, any> = {};
  for (const k of Object.keys(alibabaParams)) {
    const params = alibabaParams[k];
    if (typeof params === 'string') {
      renderParams[k] = renderTemplate(params, answerKeys);
    }
    if (typeof params === 'object') {
      if (
        (params.type === 'URL' || params.type === 'DYNAMIC_URL') &&
        params.isTracking
      ) {
        const { url, data } = params;
        let redirectUrl = `${url}`;
        if (params.urlType === WHATSAPP_BUTTON_URL_TYPE.DYNAMIC) {
          redirectUrl = `${url}${data}`; //renderTemplate(`${url}${data}`, answerKeys);
        }

        const generateResult = await generateUrl({
          redirectUrl,
          type: URL_TYPE.ORIGIN,
          urlOrigin: url,
          generateType: URL_GENERATE_TYPE.REDIRECT,
          context: answerKeys,
        });

        urls.push(generateResult.url);

        renderParams[k] = generateResult.url.code;
      }
    }
  }

  return renderParams;
}

async function renderAlibabaButton(
  button: WhatsappTemplateButton,
  answerKeys: any,
  urls: Array<Url>,
  generateUrl: generateUrlFunction
) {
  const extraData: any = {};
  if (!button['isTracking']) {
    if (button.type === WHATSAPP_TEMPLATE_BUTTON_TYPE.FLOW) {
      const flow_action_data = button['flow_action_data'];
      if (flow_action_data && typeof flow_action_data === 'object') {
        Object.keys(flow_action_data).forEach((fk) => {
          flow_action_data[fk] = renderTemplate(
            flow_action_data[fk],
            answerKeys
          );
        });
        button['flow_action_data'] = {
          ...flow_action_data,
          ...(answerKeys?.contact || {}),
        };
      } else {
        button['flow_action_data'] = {
          ...(answerKeys?.contact || {}),
        };
      }

      extraData['flow_action_data'] = structuredClone(
        button['flow_action_data']
      );
    }

    // modify button
    button.data = renderTemplate(button.data || '', answerKeys);

    return {
      data: button.data,
      extraData,
    };
  }

  const { url, redirectUrlType, landingPage } = button;
  let generateResult = null;
  if (redirectUrlType === URL_TYPE.LANDING_PAGE) {
    generateResult = await generateUrl({
      generateType: URL_GENERATE_TYPE.REDIRECT,
      type: redirectUrlType,
      landingPageId: landingPage.id,
      redirectUrl: '',
      context: answerKeys,
    });
  } else {
    generateResult = await generateUrl({
      generateType: URL_GENERATE_TYPE.REDIRECT,
      type: redirectUrlType,
      urlOrigin: button['redirectUrl'] || url,
      redirectUrl: button['redirectUrl'] || url,
      context: answerKeys,
    });
  }

  // code will be appended to end of the url
  button.data = generateResult.url.code;

  urls.push(generateResult.url);

  return {
    data: button.data,
    extraData,
  };
}

async function renderWhatsappAlibabaParamsV2(
  waParams: any,
  answerKeys: any,
  urls: Array<Url>,
  generateUrl: generateUrlFunction
) {
  console.log(
    `Render alibaba V2 template params ~> `,
    JSON.stringify(waParams)
  );
  console.log(`Render alibaba V2 answerKeys ~> `, JSON.stringify(answerKeys));
  const result: any = {};
  const { header, body, buttons, carousel } = waParams;

  if (Array.isArray(header) && header.length) {
    for (const value of header) {
      const { alibaba_param_name } = value;
      // header text
      if (value.type === 'TEXT') {
        result[alibaba_param_name] = renderTemplate(value.data, answerKeys);
      } else if (value.type === 'MEDIA') {
        // media
        result[alibaba_param_name] = renderTemplate(
          value.media.url,
          answerKeys
        );
        result['__extraData'] = {
          ...result['__extraData'],
          media: {
            ...value.media,
            alibaba_param_name,
          },
        };
      } else {
        result[alibaba_param_name] = renderTemplate(value.data, answerKeys);
      }
    }
  }

  // body
  if (Array.isArray(body) && body.length) {
    for (const value of body) {
      const { alibaba_param_name } = value;
      result[alibaba_param_name] = renderTemplate(value.data, answerKeys);
    }
  }

  // buttons
  if (Array.isArray(buttons) && buttons.length) {
    for (const button of buttons) {
      const { alibaba_param_name } = button;
      const { data, extraData } = await renderAlibabaButton(
        button,
        answerKeys,
        urls,
        generateUrl
      );
      if (alibaba_param_name) {
        result['__extraData'] = {
          ...result['__extraData'],
          ...extraData,
        };
        result[alibaba_param_name] = data;
      }
    }
  }

  // carousel
  if (Array.isArray(carousel) && carousel.length) {
    for (const card of carousel) {
      if (Array.isArray(card.header) && card.header.length) {
        for (const ch of card.header) {
          // not support text params
          // current support only media
          // result[ch.alibaba_param_name] = renderTemplate(ch.data, answerKeys);
        }
      }
      if (Array.isArray(card.body) && card.body.length) {
        for (const cb of card.body) {
          if (cb.type === 'TEXT') {
            result[cb.alibaba_param_name] = renderTemplate(cb.data, answerKeys);
          }
          if (cb.type === 'MEDIA') {
            result[cb.alibaba_param_name] = renderTemplate(
              cb.media.url,
              answerKeys
            );
          }
        }
      }
      if (Array.isArray(card.buttons) && card.buttons.length) {
        for (const button of card.buttons) {
          const { alibaba_param_name } = button;
          const { data, extraData } = await renderAlibabaButton(
            button,
            answerKeys,
            urls,
            generateUrl
          );
          if (alibaba_param_name) {
            result['__extraData'] = {
              ...result['__extraData'],
              ...extraData,
            };

            result[alibaba_param_name] = data;
          }
        }
      }
    }
  }

  console.log(`Rendered alibaba V2  result ~> `, JSON.stringify(result));

  return result;
}

/**
 * Render template message and format url
 * @param content
 * @param answerKeys
 * @param timezone
 * @param transaction
 * @return {Promise<{urls: *[], content: null}>}
 */
export interface RenderTemplateMessageProp {
  content: any;
  answerKeys: any;
  timezone: string;
  generateUrl: generateUrlFunction;
}

export interface RenderTemplateMessageResult {
  content: any;
  urls: Array<Url>;
}

export const parseMessageAndShortLink = async (
  message: string,
  generateUrl: generateUrlFunction
) => {
  let rs = message;
  const urlRegex = /(((https?:\/\/)|(www\.))\S+)/g;
  const cts = message.matchAll(urlRegex);
  const listUrlSet = new Set<string>();
  for (let i of cts) {
    listUrlSet.add(i[0]);
  }
  const listUrl: Array<string> = [...listUrlSet];
  const urls = [];
  if (listUrl.length) {
    for (let i = 0; i < listUrl.length; i += 1) {
      const t = listUrl[i];
      const urlObj = await generateUrl({
        urlOrigin: t,
        redirectUrl: t,
        content: {},
        type: URL_TYPE.ORIGIN,
        generateType: URL_GENERATE_TYPE.REDIRECT,
      });
      rs = rs.replaceAll(t, urlObj.link);
      urls.push(urlObj.url);
    }
  }
  return { message: rs, urls };
};

export async function renderTemplateMessage({
  content: _content,
  answerKeys,
  timezone,
  generateUrl,
}: RenderTemplateMessageProp) {
  const content = objectDeepClone(_content);
  const rs = { content: null, urls: [] } as RenderTemplateMessageResult;
  if (content) {
    if (content.peacomTemplateMessage) {
      content.peacomTemplateMessage.params = answerKeys;
    } else if (content.mmp) {
      content.mmp.params = answerKeys;
    } else if (content.rcsDotgo || content.rcsTanla || content.rcsIoh) {
      content.context = answerKeys;
    } else if (content.whatsappTemplateParam) {
      // WHATSAPP
      const { header, body, buttons, media, alibabaParams, carousel } =
        content.whatsappTemplateParam;
      // only Alibaba
      if (alibabaParams) {
        if (content.version === '2.0') {
          console.log('Render template message for Alibaba version 2.0');
          content.whatsappTemplateParam.alibabaParams =
            await renderWhatsappAlibabaParamsV2(
              content.whatsappTemplateParam,
              answerKeys,
              rs.urls,
              generateUrl
            );
        } else {
          content.whatsappTemplateParam.alibabaParams =
            await renderWhatsappAlibabaParams(
              alibabaParams,
              answerKeys,
              rs.urls,
              generateUrl
            );
        }
      } else {
        if (Array.isArray(header) && header.length) {
          content.whatsappTemplateParam.header = header.map((value) => {
            if (typeof value === 'string') {
              return renderTemplate(value, answerKeys);
            }
            // new version
            if (value.type === 'TEXT') {
              const renderedValue = renderTemplate(value.data, answerKeys);
              return {
                ...value,
                type: value.type,
                data: renderedValue,
              };
            }
            return {
              ...value, // filename
              type: value.media.format || value.media.type,
              format: value.media.format || value.media.type,
              url: renderTemplate(value.media.url, answerKeys),
            };
          });
        }
        if (Array.isArray(body) && body.length) {
          content.whatsappTemplateParam.body = body.map((value) => {
            if (typeof value === 'string') {
              return renderTemplate(value, answerKeys);
            }
            // new version
            const renderedValue = renderTemplate(value.data, answerKeys);
            return {
              ...value,
              type: value.type,
              data: renderedValue,
            };
          });
        }
        if (Array.isArray(buttons) && buttons.length) {
          content.whatsappTemplateParam.buttons = await Promise.all(
            buttons.map((button) =>
              renderWhatsappButton(button, answerKeys, rs.urls, generateUrl)
            )
          );
        }
        if (media) {
          if (media.url) {
            content.whatsappTemplateParam.media.url = renderTemplate(
              media.url,
              answerKeys
            );
          }
        }
        if (Array.isArray(carousel) && carousel.length) {
          for (const card of carousel) {
            if (card.body && card.body.length) {
              card.body = card.body.map((i: any) => ({
                ...i,
                type: i.type,
                data: renderTemplate(i.data, answerKeys),
              }));
            }
            if (card.header && card.header.length) {
              card.header = card.header.map((i: any) => {
                // support only VIDEO and IMAGE
                return {
                  type: i.media.format,
                  format: i.media.format,
                  contentType: i.media.contentType,
                  url: renderTemplate(i.media.url, answerKeys),
                  data: renderTemplate(i.media.data, answerKeys),
                };
              });
            }
            if (card.buttons && card.buttons.length) {
              card.buttons = await Promise.all(
                card.buttons.map((cb: any) =>
                  renderWhatsappButton(cb, answerKeys, rs.urls, generateUrl)
                )
              );
            }
          }
        }
      }
    } else if (content.zaloZnsTemplateParam) {
      // Zalo ZNS
      const { templateData } = content.zaloZnsTemplateParam;
      if (Array.isArray(templateData)) {
        content.zaloZnsTemplateParam.templateData = templateData.map(
          (item) => ({
            ...item,
            value: renderTemplate(item.value, answerKeys),
          })
        );
      }
    } else if (
      MESSAGE_TYPE.TEXT === content.type ||
      MESSAGE_TYPE.QUICK_REPLY === content.type
    ) {
      const { previewUrl, message, shortLink } = content;
      content.message = renderTemplate(message, answerKeys);
      if (shortLink) {
        const { message, urls } = await parseMessageAndShortLink(
          content.message,
          generateUrl
        );
        content.message = message;
        rs.urls.push(...urls);
      }

      // TODO: Implement insert link to content message after generate link
      if (previewUrl) {
        const { image, title, redirectUrl, position } = previewUrl;
        const generateUrlRs = await generateUrl({
          redirectUrl,
          content: { image, title },
          type: URL_TYPE.ORIGIN,
          generateType: URL_GENERATE_TYPE.PREVIEW_URL,
          urlOrigin: redirectUrl,
          context: answerKeys,
        });
        if (position === 1) {
          content.message = `${generateUrlRs.link}\n${content.message}`;
        } else {
          content.message = `${content.message}\n${generateUrlRs.link}`;
        }
        rs.urls.push(generateUrlRs.url);
      }
    } else if (MESSAGE_TYPE.RICH_CARD === content.type) {
      if (content.richCards && content.richCards.length) {
        for (let i = 0; i < content.richCards.length; i += 1) {
          const richCard = content.richCards[i];
          if (hasText(richCard.title)) {
            richCard.title = renderTemplate(richCard.title, answerKeys);
          }
          if (hasText(richCard.image)) {
            richCard.image = renderTemplate(richCard.image, answerKeys);
          }
          if (hasText(richCard.fileUrl)) {
            richCard.fileUrl = renderTemplate(richCard.fileUrl, answerKeys);
          }
          if (hasText(richCard.description)) {
            richCard.description = renderTemplate(
              richCard.description,
              answerKeys
            );
          }
          if (richCard.suggestions.length) {
            for (let j = 0; j < richCard.suggestions.length; j += 1) {
              const suggestion = richCard.suggestions[j];
              if (hasText(suggestion.postbackData)) {
                if (
                  suggestion.action === SuggestionActionType.OPEN_URL &&
                  suggestion.tracking
                ) {
                  const newUrl = await generateUrl({
                    redirectUrl: suggestion.postbackData,
                    content: null,
                    type: URL_TYPE.ORIGIN,
                    generateType: URL_GENERATE_TYPE.REDIRECT,
                    urlOrigin: suggestion.postbackData,
                    context: answerKeys,
                  });
                  rs.urls.push(newUrl.url);
                  suggestion.postbackData = newUrl.link;
                } else {
                  suggestion.postbackData = renderTemplate(
                    suggestion.postbackData,
                    answerKeys
                  );
                }
              }
              if (hasText(suggestion.text)) {
                suggestion.text = renderTemplate(suggestion.text, answerKeys);
              }
              if (SuggestionActionType.CALENDAR === suggestion.action) {
                if (hasText(suggestion.title)) {
                  suggestion.title = renderTemplate(
                    suggestion.title,
                    answerKeys
                  );
                }
                if (hasText(suggestion.description)) {
                  suggestion.description = renderTemplate(
                    suggestion.description,
                    answerKeys
                  );
                }
                let formatStartDate = '';
                let formatStartTime = '';
                let formatEndDate = '';
                let formatEndTime = '';
                if (hasText(suggestion.startDate)) {
                  formatStartDate = renderTemplate(
                    suggestion.startDate,
                    answerKeys
                  );
                }
                if (hasText(suggestion.startTime)) {
                  formatStartTime = renderTemplate(
                    suggestion.startTime,
                    answerKeys
                  );
                }
                if (hasText(suggestion.endDate)) {
                  formatEndDate = renderTemplate(
                    suggestion.endDate,
                    answerKeys
                  );
                }
                if (hasText(suggestion.endTime)) {
                  formatEndTime = renderTemplate(
                    suggestion.endTime,
                    answerKeys
                  );
                }
                const parseStartTime = parseDateTimeByFormat(
                  `${formatStartDate} ${formatStartTime}`,
                  DATE_TIME_FORMAT,
                  timezone
                ).toString();
                if (parseStartTime === 'Invalid Date') {
                  suggestion.startTime = new Date().toString();
                } else {
                  suggestion.startTime = parseStartTime;
                }
                const parseEndTime = parseDateTimeByFormat(
                  `${formatEndDate} ${formatEndTime}`,
                  DATE_TIME_FORMAT,
                  timezone
                ).toString();
                if (parseEndTime === 'Invalid Date') {
                  suggestion.endTime = new Date().toString();
                } else {
                  suggestion.endTime = parseEndTime;
                }
              }
            }
          }
        }
      }
    } else if (MESSAGE_TYPE.LIST_PICKER === content.type) {
      if (content.receivedMessage) {
        if (hasText(content.receivedMessage.subtitle)) {
          content.receivedMessage.subtitle = renderTemplate(
            content.receivedMessage.subtitle,
            answerKeys
          );
        }
        if (hasText(content.receivedMessage.title)) {
          content.receivedMessage.title = renderTemplate(
            content.receivedMessage.title,
            answerKeys
          );
        }
      }
      if (content.listPicker && content.listPicker.length) {
        for (let i = 0; i < content.listPicker.length; i += 1) {
          const item = content.listPicker[i];
          if (hasText(item.subtitle)) {
            item.subtitle = renderTemplate(item.subtitle, answerKeys);
          }
          if (hasText(item.title)) {
            item.title = renderTemplate(item.title, answerKeys);
          }
          if (hasText(item.value)) {
            item.value = renderTemplate(item.value, answerKeys);
          }
        }
      }
    } else if (MESSAGE_TYPE.ZALO_LIST_PICKER === content.type) {
      if (content.zaloReceivedMessage) {
        if (hasText(content.zaloReceivedMessage.subtitle)) {
          content.zaloReceivedMessage.subtitle = renderTemplate(
            content.zaloReceivedMessage.subtitle,
            answerKeys
          );
        }
        if (hasText(content.zaloReceivedMessage.title)) {
          content.zaloReceivedMessage.title = renderTemplate(
            content.zaloReceivedMessage.title,
            answerKeys
          );
        }
      }
      if (content.zaloListPicker && content.zaloListPicker.length) {
        for (let i = 0; i < content.zaloListPicker.length; i += 1) {
          const item = content.zaloListPicker[i];
          if (hasText(item.subtitle)) {
            item.subtitle = renderTemplate(item.subtitle, answerKeys);
          }
          if (hasText(item.title)) {
            item.title = renderTemplate(item.title, answerKeys);
          }
          if (hasText(item.content)) {
            item.content = renderTemplate(item.content, answerKeys);
          }
        }
      }
    } else if (
      [
        MESSAGE_TYPE.ZALO_TRANSACTION_MESSAGE,
        MESSAGE_TYPE.ZALO_PROMOTION_MESSAGE,
      ].includes(content.type)
    ) {
      if (content.zaloTemplateMessage) {
        const { elements, buttons } = content.zaloTemplateMessage;
        if (elements) {
          const { header, text, table } = elements;
          if (header && hasText(header.content)) {
            header.content = renderTemplate(header.content, answerKeys);
          }
          if (Array.isArray(text)) {
            for (let it = 0; it < text.length; it += 1) {
              const t = text[it];
              if (hasText(t.content)) {
                t.content = renderTemplate(t.content, answerKeys);
              }
            }
          }
          if (Array.isArray(table)) {
            for (let it = 0; it < table.length; it += 1) {
              const t = table[it];
              // only render for custom field
              if (`${t.keyType}` === '3') {
                t.key = renderTemplate(t.key, answerKeys);
              }
              if (hasText(t.value)) {
                t.value = renderTemplate(t.value, answerKeys);
              }
            }
          }
        }
        if (Array.isArray(buttons)) {
          for (let ib = 0; ib < buttons.length; ib += 1) {
            const b = buttons[ib];
            if (hasText(b.title)) {
              b.title = renderTemplate(b.title, answerKeys);
            }
            if (b.payload) {
              if (hasText(b.payload.content)) {
                b.payload.content = renderTemplate(
                  b.payload.content,
                  answerKeys
                );
              }
              if (hasText(b.payload.phone_code)) {
                b.payload.phone_code = renderTemplate(
                  b.payload.phone_code,
                  answerKeys
                );
              }
            }
          }
        }
      }
    } else if (MESSAGE_TYPE.LOCATION === content.type) {
      if (content.location) {
        if (hasText(content.location.latitude)) {
          content.location.latitude = renderTemplate(
            content.location.latitude,
            answerKeys
          );
        }
        if (hasText(content.location.longitude)) {
          content.location.longitude = renderTemplate(
            content.location.longitude,
            answerKeys
          );
        }
        if (hasText(content.location.name)) {
          content.location.name = renderTemplate(
            content.location.name,
            answerKeys
          );
        }
        if (hasText(content.location.address)) {
          content.location.address = renderTemplate(
            content.location.address,
            answerKeys
          );
        }
      }
    } else {
      // Media, File ...
      if (hasText(content.message)) {
        content.message = renderTemplate(content.message, answerKeys);
      }
      if (hasText(content.fileUrl)) {
        content.fileUrl = renderTemplate(content.fileUrl, answerKeys);
      }
    }

    if (
      content.templateMessageSuggestions &&
      content.templateMessageSuggestions.length
    ) {
      for (let i = 0; i < content.templateMessageSuggestions.length; i += 1) {
        const suggestionTemplate = content.templateMessageSuggestions[i];
        if (hasText(suggestionTemplate.postbackData)) {
          if (
            suggestionTemplate.action === SuggestionActionType.OPEN_URL &&
            suggestionTemplate.tracking
          ) {
            const newUrl = await generateUrl({
              redirectUrl: suggestionTemplate.postbackData,
              content: null,
              type: URL_TYPE.ORIGIN,
              generateType: URL_GENERATE_TYPE.REDIRECT,
              urlOrigin: suggestionTemplate.postbackData,
              context: answerKeys,
            });
            rs.urls.push(newUrl.url);
            suggestionTemplate.postbackData = newUrl.link;
          } else {
            suggestionTemplate.postbackData = renderTemplate(
              suggestionTemplate.postbackData,
              answerKeys
            );
          }
        }
        if (hasText(suggestionTemplate.text)) {
          suggestionTemplate.text = renderTemplate(
            suggestionTemplate.text,
            answerKeys
          );
        }
        if (SuggestionActionType.CALENDAR === suggestionTemplate.action) {
          if (hasText(suggestionTemplate.title)) {
            suggestionTemplate.title = renderTemplate(
              suggestionTemplate.title,
              answerKeys
            );
          }
          if (hasText(suggestionTemplate.description)) {
            suggestionTemplate.description = renderTemplate(
              suggestionTemplate.description,
              answerKeys
            );
          }
          let formatStartDate = '';
          let formatStartTime = '';
          let formatEndDate = '';
          let formatEndTime = '';
          if (hasText(suggestionTemplate.startDate)) {
            formatStartDate = renderTemplate(
              suggestionTemplate.startDate,
              answerKeys
            );
          }
          if (hasText(suggestionTemplate.startTime)) {
            formatStartTime = renderTemplate(
              suggestionTemplate.startTime,
              answerKeys
            );
          }
          if (hasText(suggestionTemplate.endDate)) {
            formatEndDate = renderTemplate(
              suggestionTemplate.endDate,
              answerKeys
            );
          }
          if (hasText(suggestionTemplate.endTime)) {
            formatEndTime = renderTemplate(
              suggestionTemplate.endTime,
              answerKeys
            );
          }
          const parseStartTime = parseDateTimeByFormat(
            `${formatStartDate} ${formatStartTime}`,
            DATE_TIME_FORMAT,
            timezone
          ).toString();
          if (parseStartTime === 'Invalid Date') {
            suggestionTemplate.startTime = new Date().toString();
          } else {
            suggestionTemplate.startTime = parseStartTime;
          }
          const parseEndTime = parseDateTimeByFormat(
            `${formatEndDate} ${formatEndTime}`,
            DATE_TIME_FORMAT,
            timezone
          ).toString();
          if (parseEndTime === 'Invalid Date') {
            suggestionTemplate.endTime = new Date().toString();
          } else {
            suggestionTemplate.endTime = parseEndTime;
          }
        }
      }
    }

    /**
     * Render for expire date
     */
    // TODO: We should define common expired for using in other CHANNEL, not only RCS
    if (content.rcsExpireOpts && content.rcsExpireOpts.type === 'EXPIRE_TIME') {
      content.rcsExpireOpts.expireTime = renderTemplate(
        content.rcsExpireOpts.expireTime,
        answerKeys
      );
      if (!content.rcsExpireOpts.expireTime) {
        delete content.rcsExpireOpts;
      }
    }
  }
  rs.content = content;
  return rs;
}
