export type SmsCharset = "GSM 03.38" | "Unicode";

export interface SmsPartsInfo {
  smsCount: number;
  charsLeft: number;
  charSet: SmsCharset;
  parts: string[];
  totalChars: number;
}

const charset7bit: Record<string, number> = {
  "@": 1, "£": 1, "$": 1, "¥": 1, "è": 1, "é": 1, "ù": 1, "ì": 1, "ò": 1,
  "Ç": 1, "\n": 1, "Ø": 1, "ø": 1, "\r": 1, "Å": 1, "å": 1, "Δ": 1,
  "_": 1, "Φ": 1, "Γ": 1, "Λ": 1, "Ω": 1, "Π": 1, "Ψ": 1, "Σ": 1,
  "Θ": 1, "Ξ": 1, "Æ": 1, "æ": 1, "ß": 1, "É": 1, " ": 1, "!": 1,
  "\"": 1, "#": 1, "¤": 1, "%": 1, "&": 1, "'": 1, "(": 1, ")": 1,
  "*": 1, "+": 1, ",": 1, "-": 1, ".": 1, "/": 1,
  "0": 1, "1": 1, "2": 1, "3": 1, "4": 1,
  "5": 1, "6": 1, "7": 1, "8": 1, "9": 1,
  ":": 1, ";": 1, "<": 1, "=": 1, ">": 1, "?": 1, "¡": 1,
  "A": 1, "B": 1, "C": 1, "D": 1, "E": 1, "F": 1, "G": 1,
  "H": 1, "I": 1, "J": 1, "K": 1, "L": 1, "M": 1,
  "N": 1, "O": 1, "P": 1, "Q": 1, "R": 1, "S": 1,
  "T": 1, "U": 1, "V": 1, "W": 1, "X": 1, "Y": 1, "Z": 1,
  "Ä": 1, "Ö": 1, "Ñ": 1, "Ü": 1, "§": 1, "¿": 1,
  "a": 1, "b": 1, "c": 1, "d": 1, "e": 1, "f": 1, "g": 1,
  "h": 1, "i": 1, "j": 1, "k": 1, "l": 1, "m": 1,
  "n": 1, "o": 1, "p": 1, "q": 1, "r": 1, "s": 1,
  "t": 1, "u": 1, "v": 1, "w": 1, "x": 1, "y": 1, "z": 1,
  "ä": 1, "ö": 1, "ñ": 1, "ü": 1, "à": 1,

  // escape chars (2 septets)
  "\f": 2, "^": 2, "{": 2, "}": 2, "\\": 2,
  "[": 2, "~": 2, "]": 2, "|": 2, "€": 2,
};


function isUnicode(content: string): boolean {
  for (const c of content) {
    if (!charset7bit[c]) {
      return true;
    }
  }
  return false;
}

function getTotalLengthGSM(content: string): number {
  let length = 0;
  for (const c of content) {
    length += charset7bit[c] ?? 0;
  }
  return length;
}

export function getSmsPartsInfo(content?: string): SmsPartsInfo {
  if (!content) {
    return {
      smsCount: 0,
      charsLeft: 160,
      charSet: "GSM 03.38",
      parts: [],
      totalChars: 0
    };
  }

  const unicode = isUnicode(content);
  const chars = [...content];

  // ===== GSM =====
  if (!unicode) {
    const totalLength = getTotalLengthGSM(content);

    if (totalLength <= 160) {
      return {
        smsCount: 1,
        charsLeft: 160 - totalLength,
        charSet: "GSM 03.38",
        parts: [content],
        totalChars: content.length
      };
    }

    const maxLength = 153;
    const parts: string[] = [];
    let currentLength = 0;
    let part = "";

    for (const c of chars) {
      const cLen = charset7bit[c] ?? 0;

      if (currentLength + cLen <= maxLength) {
        part += c;
        currentLength += cLen;
      } else {
        parts.push(part);
        part = c;
        currentLength = cLen;
      }
    }

    if (part) parts.push(part);

    return {
      smsCount: parts.length,
      charsLeft: maxLength - getTotalLengthGSM(parts[parts.length - 1]),
      charSet: "GSM 03.38",
      parts,
      totalChars: part.length
    };
  }

  // ===== Unicode =====
  if (content.length <= 70) {
    return {
      smsCount: 1,
      charsLeft: 70 - content.length,
      charSet: "Unicode",
      parts: [content],
      totalChars: content.length
    };
  }

  const maxLength = 67;
  const smsCount = Math.ceil(content.length / maxLength);
  const parts: string[] = [];

  for (let i = 0; i < smsCount; i++) {
    parts.push(content.substring(i * maxLength, i * maxLength + maxLength));
  }

  return {
    smsCount: parts.length,
    charsLeft: maxLength - parts[parts.length - 1].length,
    charSet: "Unicode",
    parts,
    totalChars: content.length,
  };
}
