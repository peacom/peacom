import {MESSAGE_TYPE, SuggestionActionType, WHATSAPP_BUTTON_URL_TYPE, WhatsappTemplateButton} from '../../model/message'
import {hasText, renderTemplate} from "../string.util";
import {Url, URL_GENERATE_TYPE, URL_TYPE} from "../../model/url/Url";
import {objectDeepClone} from "../general.util";
import {DATE_TIME_FORMAT, parseDateTimeByFormat} from "../date";

export interface GenerateUrlInput {
  redirectUrl: string
  content?: any
  type: URL_TYPE
  generateType: URL_GENERATE_TYPE
  urlOrigin?: string
  landingPageId?: number
}


export interface GenerateUrlOutput {
  url: Url
  link: string
}

export type generateUrlFunction = (input: GenerateUrlInput) => Promise<GenerateUrlOutput>

async function renderWhatsappButton(button: WhatsappTemplateButton, answerKeys: any, urlIds: Array<Url>, generateUrl: generateUrlFunction) {
  if (!button['isTracking']) {
    return {
      ...button,
      data: renderTemplate(button.data, answerKeys)
    };
  }

  /*
  Sample
    {
      "url": "https://tvhay.bz/phim_id=",
      "data": "{{{mmp_url_code}}}",
      "text": "Visit Website Dynamic",
      "type": "URL",
      "index": 0,
      "urlType": "dynamic",
      "isTracking": true
    }
  */
  const {url, data, urlType} = button;
  let redirectUrl = url;
  if (urlType === WHATSAPP_BUTTON_URL_TYPE.DYNAMIC) {
    redirectUrl = renderTemplate(`${url}${data}`, answerKeys);
  }
  const {url: internalUrl} = await generateUrl({
    redirectUrl,
    generateType: URL_GENERATE_TYPE.REDIRECT,
    urlOrigin: url, type: URL_TYPE.ORIGIN, content: null
  });

  button.data = internalUrl.code;

  urlIds.push(internalUrl);

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
 * @param urlIds
 * @param generateUrl
 */
async function renderWhatsappAlibabaParams(alibabaParams: any, answerKeys: any, urlIds: Array<Url>, generateUrl: generateUrlFunction) {
  const renderParams: Record<string, any> = {};
  for (const k of Object.keys(alibabaParams)) {
    const params = alibabaParams[k];
    if (typeof params === "string") {
      renderParams[k] = renderTemplate(params, answerKeys);
    }
    if (typeof params === "object") {
      if (params.type === "URL" && params.isTracking) {
        const {url, data} = params;
        let redirectUrl = `${url}`;
        if (params.urlType === WHATSAPP_BUTTON_URL_TYPE.DYNAMIC) {
          redirectUrl = renderTemplate(`${url}${data}`, answerKeys);
        }

        const {
          url: {id, code}
        } = await generateUrl({
          redirectUrl,
          type: URL_TYPE.ORIGIN,
          urlOrigin: url,
          generateType: URL_GENERATE_TYPE.REDIRECT
        });

        urlIds.push(id);

        renderParams[k] = code;
      }
    }
  }

  return renderParams;
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
  content: any
  answerKeys: any,
  timezone: string,
  generateUrl: generateUrlFunction
}

export interface RenderTemplateMessageResult {
  content: any
  urls: Array<Url>
}

export async function renderTemplateMessage({
                                              content: _content,
                                              answerKeys,
                                              timezone,
                                              generateUrl
                                            }: RenderTemplateMessageProp) {
  const content = objectDeepClone(_content);
  const rs = {content: null, urls: []} as RenderTemplateMessageResult;
  if (content) {
    if (content.peacomTemplateMessage) {
      content.peacomTemplateMessage.params = answerKeys;
    } else if (content.whatsappTemplateParam) {
      // WHATSAPP
      const {header, body, buttons, media, alibabaParams, carousel} =
        content.whatsappTemplateParam;
      // only Alibaba
      if (alibabaParams) {
        content.whatsappTemplateParam.alibabaParams =
          await renderWhatsappAlibabaParams(alibabaParams, answerKeys, rs.urls, generateUrl);
      } else {
        if (Array.isArray(header) && header.length) {
          content.whatsappTemplateParam.header = header.map((value) => {
            if (typeof value === "string") {
              return renderTemplate(value, answerKeys);
            }
            // new version
            if (value.type === "TEXT") {
              return {
                type: value.type,
                data: renderTemplate(value.data, answerKeys)
              };
            }
            return {
              type: value.media.format || value.media.type,
              format: value.media.format || value.media.type,
              url: renderTemplate(value.media.url, answerKeys)
            };
          });
        }
        if (Array.isArray(body) && body.length) {
          content.whatsappTemplateParam.body = body.map((value) => {
            if (typeof value === "string") {
              return renderTemplate(value, answerKeys);
            }
            // new version
            return {
              type: value.type,
              data: renderTemplate(value.data, answerKeys)
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
                type: i.type,
                data: renderTemplate(i.data, answerKeys)
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
                  data: renderTemplate(i.media.data, answerKeys)
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
      const {templateData} = content.zaloZnsTemplateParam;
      if (Array.isArray(templateData)) {
        content.zaloZnsTemplateParam.templateData = templateData.map(
          (item) => ({
            ...item,
            value: renderTemplate(item.value, answerKeys)
          })
        );
      }
    } else if (
      MESSAGE_TYPE.TEXT === content.type ||
      MESSAGE_TYPE.QUICK_REPLY === content.type
    ) {
      const {previewUrl, message} = content;
      content.message = renderTemplate(message, answerKeys);
      // TODO: Implement insert link to content message after generate link
      if (previewUrl) {
        const {image, title, redirectUrl, position} = previewUrl;
        const generateUrlRs = await generateUrl(
          {
            redirectUrl,
            content: {image, title},
            type: URL_TYPE.ORIGIN,
            generateType: URL_GENERATE_TYPE.PREVIEW_URL,
            urlOrigin: redirectUrl
          }
        );
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
                const renderPostback = renderTemplate(
                  suggestion.postbackData,
                  answerKeys
                );
                if (
                  suggestion.action === SuggestionActionType.OPEN_URL &&
                  suggestion.tracking
                ) {
                  const newUrl = await generateUrl({
                    redirectUrl: renderPostback,
                    content: null,
                    type: URL_TYPE.ORIGIN,
                    generateType: URL_GENERATE_TYPE.REDIRECT,
                    urlOrigin: suggestion.postbackData
                  });
                  rs.urls.push(newUrl.url);
                  suggestion.postbackData = newUrl.link;
                } else {
                  suggestion.postbackData = renderPostback;
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
                let formatStartDate = "";
                let formatStartTime = "";
                let formatEndDate = "";
                let formatEndTime = "";
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
                if (parseStartTime === "Invalid Date") {
                  suggestion.startTime = new Date().toString();
                } else {
                  suggestion.startTime = parseStartTime;
                }
                const parseEndTime = parseDateTimeByFormat(
                  `${formatEndDate} ${formatEndTime}`,
                  DATE_TIME_FORMAT,
                  timezone
                ).toString();
                if (parseEndTime === "Invalid Date") {
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
        MESSAGE_TYPE.ZALO_PROMOTION_MESSAGE
      ].includes(content.type)
    ) {
      if (content.zaloTemplateMessage) {
        const {elements, buttons} = content.zaloTemplateMessage;
        if (elements) {
          const {header, text, table} = elements;
          if (header && hasText(header.content)) {
            header.content = renderTemplate(header.content, answerKeys);
          }
          if (Array.isArray(text)) {
            for (let it = 0; it < text.length; it += 1) {
              const t = text[it];
              if (hasText(t.content)) {
                t.content = renderTemplate(header.content, answerKeys);
              }
            }
          }
          if (Array.isArray(table)) {
            for (let it = 0; it < table.length; it += 1) {
              const t = table[it];
              // only render for custom field
              if (`${t.keyType}` === "3") {
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
          const renderPostback = renderTemplate(
            suggestionTemplate.postbackData,
            answerKeys
          );
          if (
            suggestionTemplate.action === SuggestionActionType.OPEN_URL &&
            suggestionTemplate.tracking
          ) {
            const newUrl = await generateUrl({
              redirectUrl: renderPostback,
              content: null,
              type: URL_TYPE.ORIGIN,
              generateType: URL_GENERATE_TYPE.REDIRECT,
              urlOrigin: suggestionTemplate.postbackData
            });
            rs.urls.push(newUrl.url);
            suggestionTemplate.postbackData = newUrl.link;
          } else {
            suggestionTemplate.postbackData = renderPostback;
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
          let formatStartDate = "";
          let formatStartTime = "";
          let formatEndDate = "";
          let formatEndTime = "";
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
          if (parseStartTime === "Invalid Date") {
            suggestionTemplate.startTime = new Date().toString();
          } else {
            suggestionTemplate.startTime = parseStartTime;
          }
          const parseEndTime = parseDateTimeByFormat(
            `${formatEndDate} ${formatEndTime}`,
            DATE_TIME_FORMAT,
            timezone
          ).toString();
          if (parseEndTime === "Invalid Date") {
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
    if (content.rcsExpireOpts && content.rcsExpireOpts.type === "EXPIRE_TIME") {
      content.rcsExpireOpts.expireTime = renderTemplate(
        content.rcsExpireOpts.expireTime,
        answerKeys
      );
    }
  }
  rs.content = content;
  return rs;
}
