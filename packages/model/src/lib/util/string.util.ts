import {render} from "mustache";
import {v4 as uuidv4} from "uuid";
import {formatDateTimeTZ} from "./date";

export function generateRandomCode(length: number) {
  let text = "";
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < length; i += 1)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

export const hasText = (str: string) => {
  const testStr = `${str || ""}`;
  return !!str && testStr.length > 0;
};

export function markKey(keyStr: string) {
  return `**** ${keyStr.substring(keyStr.length - 4, keyStr.length)}`;
}

export function filterHtmlName(str: string) {
  return str.replace(/&(quot|amp|lt|gt|acute);/g, "");
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
  nbsp: " ",
  cent: "¢",
  pound: "£",
  yen: "¥",
  euro: "€",
  copy: "©",
  reg: "®",
  lt: "<",
  gt: ">",
  quot: '"',
  amp: "&",
  apos: "'"
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

export const filterForNumberOnly = (str: string) => str.replace(/\D+/g, "");

export function isNumberOnly(str: string) {
  const pattern = /^\d+$/;
  return pattern.test(str);
}

export function filterForInvalidCharacter(str: string, replaceCharacter = "_") {
  let rs = str.replace(/[^\p{L}\s]/giu, " ");
  rs = rs.trim();
  rs = rs.replace(/ +/g, replaceCharacter);
  return rs;
}

export function filterNotNumberAndDivideChar(str: string) {
  let rs = str.replace(/\D+/g, " ");
  rs = rs.trim();
  rs = rs.replace(/ +/g, ",");
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

export function filterNonAlphaNumeric(str: string, replaceWith = "") {
  return str.replace(/\W/g, replaceWith);
}

export const leftString = (string: string, count: number) => {
  const str = `${string || ""}`;
  if (str.length > count) {
    return str.substring(0, count);
  }
  return str;
};

export const rightString = (string: string, count: number) => {
  const str = `${string || ""}`;
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
      const infos = text.split("=")
      const dateFormat = infos[0] || "YYYY-MM-DD HH:mm"
      const timezone = infos[1] || "UTC"
      return formatDateTimeTZ(new Date(), timezone, dateFormat);
    };
  },
};

export function renderTemplate(string: string, context: any) {
  return render(string, {
    ...context,
    ...RENDER_FUNCTION
  });
}

export function formatBytes(bytes: number, decimals: number = 2): string {
  if (bytes === 0) return "0 Bytes"

  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]

  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i]
}

export const parseTemplate = (str: string) => {
  const regex = /{{(\w+)}}|{{{(\w+)}}}/g
  const rs = []
  for (const i of str.matchAll(regex)) {
    rs.push({
      template: i[0],
      variable: i[1] || i[2] || i[3]
    })
  }
  return rs;
}

export const parseTemplatePartner = (str: string) => {
  const regex = /{{([a-zA-Z0-9._]+)}}|{{{([a-zA-Z0-9._]+)}}}/g
  let rs = []
  for (const i of str.matchAll(regex)) {
    const found = rs.find((element: any) => element.variable === i[1]);
    if (!found) {
      rs.push({
        template: i[0],
        variable: i[1] || i[2] || i[3]
      })
    }
  }
  return rs;
}

export function templateMessageParamsReplace(message: string, replaceFunc: Function){
  const templatePars = parseTemplatePartner(message);
  let newMessage = message;
  for(let i = 0; i < templatePars.length; i+=1){
    newMessage = newMessage.replace(new RegExp(templatePars[i].template, "g"), replaceFunc(i, templatePars[i]));
  }
  return {
    params: templatePars,
    message: newMessage
  }
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
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
  str = str.replace(/đ/g, "d");
  // Some system encode vietnamese combining accent as individual utf-8 characters
  str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // Huyền sắc hỏi ngã nặng
  str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // Â, Ê, Ă, Ơ, Ư
  return str;
}

export function toNonAccentVietnamese(str: any) {
  str = str.replace(/A|Á|À|Ã|Ạ|Â|Ấ|Ầ|Ẫ|Ậ|Ă|Ắ|Ằ|Ẵ|Ặ/g, "A");
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
  str = str.replace(/E|É|È|Ẽ|Ẹ|Ê|Ế|Ề|Ễ|Ệ/, "E");
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
  str = str.replace(/I|Í|Ì|Ĩ|Ị/g, "I");
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
  str = str.replace(/O|Ó|Ò|Õ|Ọ|Ô|Ố|Ồ|Ỗ|Ộ|Ơ|Ớ|Ờ|Ỡ|Ợ/g, "O");
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
  str = str.replace(/U|Ú|Ù|Ũ|Ụ|Ư|Ứ|Ừ|Ữ|Ự/g, "U");
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
  str = str.replace(/Y|Ý|Ỳ|Ỹ|Ỵ/g, "Y");
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
  str = str.replace(/Đ/g, "D");
  str = str.replace(/đ/g, "d");
  // Some system encode vietnamese combining accent as individual utf-8 characters
  str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // Huyền sắc hỏi ngã nặng
  str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // Â, Ê, Ă, Ơ, Ư
  return str;
}
