import * as _ from 'lodash';
import { render } from 'mustache';
import { v4 as uuidv4 } from 'uuid';
import { formatDateTimeTZ } from './date';
import { MESSAGE_TYPE, SuggestionActionType } from '../model';
import { objectDeepClone } from './general.util';

export function generateRandomCode(length: number) {
  let text = '';
  const possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < length; i += 1)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

export const hasText = (str?: string) => {
  const testStr = `${str || ''}`;
  return !!str && testStr.length > 0;
};

export function markKey(keyStr: string) {
  return `**** ${keyStr.substring(keyStr.length - 4, keyStr.length)}`;
}

export function filterHtmlName(str: string) {
  return str.replace(/&(quot|amp|lt|gt|acute);/g, '');
}

export function alphaNumericToString(str: string) {
  if (!hasText(str)) {
    return [];
  }
  return (
    filterHtmlName(str)
      .split(/[ _\-,./;]/)
      .filter((t) => hasText(t))
      .map((t) => filterNonAlphaNumeric(t))
      .filter((t) => hasText(t))
  );
}

const htmlEntities: Record<string, string> = {
  nbsp: ' ',
  cent: '¢',
  pound: '£',
  yen: '¥',
  euro: '€',
  copy: '©',
  reg: '®',
  lt: '<',
  gt: '>',
  quot: '"',
  amp: '&',
  apos: '\''
};

export function unescapeHTML(str: string) {
  return str.replace(/&([^;]+);/g, (entity, entityCode: string) => {
    let match;

    if (entityCode in htmlEntities) {
      return htmlEntities[entityCode];
    }
    // eslint-disable-next-line no-cond-assign
    if ((match = entityCode.match(/^#x([\da-fA-F]+)$/))) {
      return String.fromCharCode(parseInt(match[1], 16));
    }
    // eslint-disable-next-line no-cond-assign
    if ((match = entityCode.match(/^#(\d+)$/))) {
      // eslint-disable-next-line no-bitwise
      return String.fromCharCode(~~match[1]);
    }
    return entity;
  });
}

export const filterForNumberOnly = (str: string) => str.replace(/\D+/g, '');

export function isNumberOnly(str: string) {
  const pattern = /^\d+$/;
  return pattern.test(str);
}

export function filterForInvalidCharacter(str: string, replaceCharacter = '_') {
  let rs = str.replace(/[^\p{L}\s]/giu, ' ');
  rs = rs.trim();
  rs = rs.replace(/ +/g, replaceCharacter);
  return rs;
}

export function filterNotNumberAndDivideChar(str: string) {
  let rs = str.replace(/\D+/g, ' ');
  rs = rs.trim();
  rs = rs.replace(/ +/g, ',');
  return rs;
}

export function stringNumberToList(str: string) {
  return filterNotNumberAndDivideChar(str)
    .split(/[ _\-,]/)
    .filter((t) => hasText(t))
    .map((t) => Number(t));
}

export function htmlEncode(rawStr: string) {
  return rawStr.replace(/[\u00A0-\u9999<>&]/g, (i) => {
    return `&#${i.charCodeAt(0)};`;
  });
}

export function filterNonAlphaNumeric(str: string, replaceWith = '') {
  return str.replace(/\W/g, replaceWith);
}

export const leftString = (string: string, count: number) => {
  const str = `${string || ''}`;
  if (str.length > count) {
    return str.substring(0, count);
  }
  return str;
};

export const rightString = (string: string, count: number) => {
  const str = `${string || ''}`;
  if (str.length > count) {
    return str.substring(str.length - count);
  }
  return str;
};

export function alphaNumericToListString(str: string) {
  if (!hasText(str)) {
    return [];
  }
  return str
    .split(/[ _\-,]/)
    .map((t) => filterNonAlphaNumeric(t))
    .filter((t) => hasText(t));
}

const RENDER_FUNCTION = {
  uuid: () => uuidv4(),
  url: () => {
    return (text: string, render: any) => {
      return encodeURIComponent(render(text));
    };
  },
  now: () => new Date().getTime(),
  date: () => {
    return (text: string) => {
      const infos = text.split('=');
      const dateFormat = infos[0] || 'YYYY-MM-DD HH:mm';
      const timezone = infos[1] || 'UTC';
      return formatDateTimeTZ(new Date(), timezone, dateFormat);
    };
  }
};

export function renderTemplate(string: string, context: any) {
  try {
    return render(string, {
      ...context,
      ...RENDER_FUNCTION
    });
  } catch (e: any) {
    return `Template error: ${e.message}`;
  }
}

export function formatBytes(bytes: number, decimals: number = 2): string {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

export const parseTemplate = (str: string) => {
  const regex = /{{(\w+)}}|{{{(\w+)}}}/g;
  const rs = [];
  for (const i of str.matchAll(regex)) {
    rs.push({
      template: i[0],
      variable: i[1] || i[2] || i[3]
    });
  }
  return rs;
};

export const parseTemplatePartner = (str: string) => {
  const regex = /{{([a-zA-Z0-9._]+)}}|{{{([a-zA-Z0-9._]+)}}}/g;
  let rs = [];
  for (const i of str.matchAll(regex)) {
    const found = rs.find((element: any) => element.variable === i[1]);
    if (!found) {
      rs.push({
        template: i[0],
        variable: i[1] || i[2] || i[3]
      });
    }
  }
  return rs;
};

export function stringParamsReplace(message: string, replaceFunc: Function) {
  const templatePars = parseTemplatePartner(message);
  let newMessage = message;
  for (let i = 0; i < templatePars.length; i += 1) {
    newMessage = newMessage.replace(new RegExp(templatePars[i].template, 'g'), replaceFunc(i, templatePars[i]));
  }
  return {
    params: templatePars,
    message: newMessage
  };
}

export function templateMessageParamsReplace(rawMessage: any, replaceFunc: Function) {
  let newRawMessage = objectDeepClone(rawMessage);
  const { type } = rawMessage;
  const templateParams = [] as any;
  const addParams = (params: Array<any>) => {
    params.forEach(t => {
      const exist = templateParams.find((item: any) => item.variable === t.variable);
      if (!exist) {
        templateParams.push(t);
      }
    });

  };

  const scanSuggestions = (suggestions: Array<any>) => {
    for (let s = 0; s < suggestions.length; s += 1) {
      const sg = suggestions[s];
      if (hasText(sg.text)) {
        const sgTextParams = parseTemplatePartner(sg.text);
        addParams(sgTextParams);
      }
      if (hasText(sg.postbackData)) {
        const sgPostDataParams = parseTemplatePartner(sg.postbackData);
        addParams(sgPostDataParams);
      }
      if (SuggestionActionType.CALENDAR === sg.action) {
        if (hasText(sg.startTime)) {
          const sgCalendarStartTimeParams = parseTemplatePartner(sg.startTime);
          addParams(sgCalendarStartTimeParams);
        }
        if (hasText(sg.endTime)) {
          const sgCalendarEndTimeParams = parseTemplatePartner(sg.endTime);
          addParams(sgCalendarEndTimeParams);
        }
        if (hasText(sg.startDate)) {
          const sgCalendarStartDateParams = parseTemplatePartner(sg.startDate);
          addParams(sgCalendarStartDateParams);
        }
        if (hasText(sg.endDate)) {
          const sgCalendarEndDateParams = parseTemplatePartner(sg.endDate);
          addParams(sgCalendarEndDateParams);
        }
        if (hasText(sg.title)) {
          const sgCalendarTitleParams = parseTemplatePartner(sg.title);
          addParams(sgCalendarTitleParams);
        }
        if (hasText(sg.description)) {
          const sgCalendarDescriptionParams = parseTemplatePartner(sg.description);
          addParams(sgCalendarDescriptionParams);
        }
      }
    }
  };
  switch (type) {
    case MESSAGE_TYPE.TEXT:
      const textParams = parseTemplatePartner(rawMessage.message);
      addParams(textParams);
      break;
    case MESSAGE_TYPE.PICTURE:
    case MESSAGE_TYPE.FILE:
    case MESSAGE_TYPE.VIDEO:
      const fileUrlParams = parseTemplatePartner(rawMessage.fileUrl);
      addParams(fileUrlParams);
      if (rawMessage.thumbnailUrl) {
        const thumbnailUrlParams = parseTemplatePartner(rawMessage.thumbnailUrl);
        addParams(thumbnailUrlParams);
      }
      break;
    case MESSAGE_TYPE.RICH_CARD:
      const { richCards = [] } = rawMessage;
      for (let r = 0; r < richCards.length; r += 1) {
        const rc = richCards[r];
        if (hasText(rc.title)) {
          const rcTitleParams = parseTemplatePartner(rc.title);
          addParams(rcTitleParams);
        }
        if (hasText(rc.description)) {
          const rcDescriptionParams = parseTemplatePartner(rc.description);
          addParams(rcDescriptionParams);
        }
        if (hasText(rc.image) || hasText(rc.fileUrl)) {
          const rcImageParams = parseTemplatePartner(rc.image || rc.fileUrl);
          addParams(rcImageParams);
        }
        if (rc.suggestions && rc.suggestions.length) {
          scanSuggestions(rc.suggestions);
        }
      }
  }
  if (
    (rawMessage.suggestions && rawMessage.suggestions.length) ||
    (rawMessage.templateMessageSuggestions &&
      rawMessage.templateMessageSuggestions.length)
  ) {
    scanSuggestions(
      rawMessage.suggestions || rawMessage.templateMessageSuggestions
    );
  }

  const replaceString = (strMessage: string) => {
    let newStringMessage = strMessage;
    for (let t = 0; t < templateParams.length; t += 1) {
      newStringMessage = newStringMessage.replace(new RegExp(templateParams[t].template, 'g'), replaceFunc(t, templateParams[t]));
    }
    return newStringMessage;
  };

  const replaceSuggestions = (suggestions: Array<any>) => {
    for (let s = 0; s < suggestions.length; s += 1) {
      const suggestion = suggestions[s];
      if (hasText(suggestion.text)) {
        suggestion.text = replaceString(suggestion.text);
      }
      if (hasText(suggestion.postbackData)) {
        suggestion.postbackData = replaceString(suggestion.postbackData);
      }
      if (SuggestionActionType.CALENDAR === suggestion.action) {
        if (hasText(suggestion.startTime)) {
          suggestion.startTime = replaceString(suggestion.startTime);
        }
        if (hasText(suggestion.endTime)) {
          suggestion.endTime = replaceString(suggestion.endTime);
        }
        if (hasText(suggestion.startDate)) {
          suggestion.startDate = replaceString(suggestion.startDate);
        }
        if (hasText(suggestion.endDate)) {
          suggestion.endDate = replaceString(suggestion.endDate);
        }
        if (hasText(suggestion.title)) {
          suggestion.title = replaceString(suggestion.title);
        }
        if (hasText(suggestion.description)) {
          suggestion.description = replaceString(suggestion.description);
        }
      }
    }
  };
  switch (type) {
    case MESSAGE_TYPE.TEXT:
      newRawMessage.message = replaceString(newRawMessage.message);
      break;
    case MESSAGE_TYPE.PICTURE:
    case MESSAGE_TYPE.FILE:
    case MESSAGE_TYPE.VIDEO:
      newRawMessage.fileUrl = replaceString(newRawMessage.fileUrl);
      if (newRawMessage.thumbnailUrl) {
        newRawMessage.thumbnailUrl = replaceString(newRawMessage.thumbnailUrl);
      }
      break;
    case MESSAGE_TYPE.RICH_CARD:
      const { richCards = [] } = newRawMessage;
      for (let r = 0; r < richCards.length; r += 1) {
        const richCard = richCards[r];
        if (hasText(richCard.title)) {
          richCard.title = replaceString(richCard.title);
        }
        if (hasText(richCard.description)) {
          richCard.description = replaceString(richCard.description);
        }
        if (hasText(richCard.image)) {
          richCard.image = replaceString(richCard.image);
        }
        if (hasText(richCard.fileUrl)) {
          richCard.fileUrl = replaceString(richCard.fileUrl);
        }
        if (richCard.suggestions && richCard.suggestions.length) {
          replaceSuggestions(richCard.suggestions);
        }
      }
  }
  if (
    (newRawMessage.suggestions && newRawMessage.suggestions?.length) ||
    (newRawMessage.templateMessageSuggestions &&
      newRawMessage.templateMessageSuggestions.length)
  ) {
    replaceSuggestions(newRawMessage.suggestions || newRawMessage.templateMessageSuggestions);
  }
  return {
    rawMessage: newRawMessage,
    params: templateParams
  };
}

export function valueParamsReplace(context: any, params: Array<any>, replaceFunc: Function) {
  const newParams = {} as any;
  for (let i = 0; i < params.length; i += 1) {
    const key = replaceFunc(i, newParams[i]);
    newParams[key] = _.get(context, params[i].variable, '');
  }
  return newParams;
}

// This function converts the string to lowercase, then perform the conversion
export function toLowerCaseNonAccentVietnamese(str: any) {
  str = str.toLowerCase();
//     We can also use this instead of from line 11 to line 17
//     str = str.replace(/\u00E0|\u00E1|\u1EA1|\u1EA3|\u00E3|\u00E2|\u1EA7|\u1EA5|\u1EAD|\u1EA9|\u1EAB|\u0103|\u1EB1|\u1EAF|\u1EB7|\u1EB3|\u1EB5/g, "a");
//     str = str.replace(/\u00E8|\u00E9|\u1EB9|\u1EBB|\u1EBD|\u00EA|\u1EC1|\u1EBF|\u1EC7|\u1EC3|\u1EC5/g, "e");
//     str = str.replace(/\u00EC|\u00ED|\u1ECB|\u1EC9|\u0129/g, "i");
//     str = str.replace(/\u00F2|\u00F3|\u1ECD|\u1ECF|\u00F5|\u00F4|\u1ED3|\u1ED1|\u1ED9|\u1ED5|\u1ED7|\u01A1|\u1EDD|\u1EDB|\u1EE3|\u1EDF|\u1EE1/g, "o");
//     str = str.replace(/\u00F9|\u00FA|\u1EE5|\u1EE7|\u0169|\u01B0|\u1EEB|\u1EE9|\u1EF1|\u1EED|\u1EEF/g, "u");
//     str = str.replace(/\u1EF3|\u00FD|\u1EF5|\u1EF7|\u1EF9/g, "y");
//     str = str.replace(/\u0111/g, "d");
  str = str.replace(/[àáạảãâầấậẩẫăằắặẳẵ]/g, 'a');
  str = str.replace(/[èéẹẻẽêềếệểễ]/g, 'e');
  str = str.replace(/[ìíịỉĩ]/g, 'i');
  str = str.replace(/[òóọỏõôồốộổỗơờớợởỡ]/g, 'o');
  str = str.replace(/[ùúụủũưừứựửữ]/g, 'u');
  str = str.replace(/[ỳýỵỷỹ]/g, 'y');
  str = str.replace(/đ/g, 'd');
  // Some system encode vietnamese combining accent as individual utf-8 characters
  str = str.replace(/[\u0300\u0301\u0303\u0309\u0323]/g, ''); // Huyền sắc hỏi ngã nặng
  str = str.replace(/[\u02C6\u0306\u031B]/g, ''); // Â, Ê, Ă, Ơ, Ư
  return str;
}

export function toNonAccentVietnamese(str: any) {
  str = str.replace(/[AÁÀÃẠÂẤẦẪẬĂẮẰẴẶ]/g, 'A');
  str = str.replace(/[àáạảãâầấậẩẫăằắặẳẵ]/g, 'a');
  str = str.replace(/[EÉÈẼẸÊẾỀỄỆ]/, 'E');
  str = str.replace(/[èéẹẻẽêềếệểễ]/g, 'e');
  str = str.replace(/[IÍÌĨỊ]/g, 'I');
  str = str.replace(/[ìíịỉĩ]/g, 'i');
  str = str.replace(/[OÓÒÕỌÔỐỒỖỘƠỚỜỠỢ]/g, 'O');
  str = str.replace(/[òóọỏõôồốộổỗơờớợởỡ]/g, 'o');
  str = str.replace(/[UÚÙŨỤƯỨỪỮỰ]/g, 'U');
  str = str.replace(/[ùúụủũưừứựửữ]/g, 'u');
  str = str.replace(/[YÝỲỸỴ]/g, 'Y');
  str = str.replace(/[ỳýỵỷỹ]/g, 'y');
  str = str.replace(/Đ/g, 'D');
  str = str.replace(/đ/g, 'd');
  // Some system encode vietnamese combining accent as individual utf-8 characters
  str = str.replace(/[\u0300\u0301\u0303\u0309\u0323]/g, ''); // Huyền sắc hỏi ngã nặng
  str = str.replace(/[\u02C6\u0306\u031B]/g, ''); // Â, Ê, Ă, Ơ, Ư
  return str;
}
