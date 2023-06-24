import {render} from "mustache";

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

export function filterNonAlphaNumeric(str: string) {
  return str.replace(/\W/g, "");
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

export function renderTemplate(string: string, context: any) {
  return render(string, context);
}

export function formatBytes(bytes: number, decimals: number = 2): string {
  if (bytes === 0) return "0 Bytes"

  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]

  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i]
}
