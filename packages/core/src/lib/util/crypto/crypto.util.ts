import * as path from "path";
import * as fs from "fs";
import * as crypto from 'crypto'
import * as process from "process";
import {hasText, leftString, rightString} from "@peacom/model";
import {createCipheriv, createDecipheriv} from "crypto";

let PUBLIC_KEY = ''
const getPublicKey = () => {
  if (!PUBLIC_KEY) {
    if (!process.env['publicKey'] || !hasText(process.env['publicKey'])) {
      throw new Error('Public Key Path is not set in env.')
    }
    if (!fs.existsSync(process.env['publicKey'])) {
      throw new Error('Public Key Path is not existed.')
    }
    PUBLIC_KEY = fs.readFileSync(process.env['publicKey'], "utf8");
  }
  return PUBLIC_KEY
}

export const encryptPublic = (
  data: string
) => {
  const publicKey = getPublicKey();
  const buffer = Buffer.from(data);
  const encrypted = crypto.publicEncrypt(publicKey, buffer);
  return encrypted.toString("base64");
};

export const decryptPrivate = (
  data: string, privateKeyPath: string
) => {
  const absolutePath = path.resolve(privateKeyPath);
  const privateKey = fs.readFileSync(absolutePath, "utf8");
  const buffer = Buffer.from(data, "base64");
  const decrypted = crypto.privateDecrypt(privateKey, buffer);
  return decrypted.toString("utf8");
};


const ALGORITHM = "aes-256-cbc";

export const encryptAESStr = (text: string | number, key: string | null = null) => {
  // const iv = randomBytes(16);
  // const iv = Buffer.from([1, 9, 8, 3, 0, 3, 0, 2, 1, 9, 8, 6, 0, 8, 0, 2])
  const iv = Buffer.from('peacom1234567810')

  const cipher = createCipheriv(
    ALGORITHM,
    key || "ENQudMWJ6AOKyWVTI28291WisR1Cluqb",
    iv
  );

  const encrypted = Buffer.concat([cipher.update(`${text}`), cipher.final()]);
  return `${iv.toString("hex")}${encrypted.toString("hex")}`;
};

export const decryptAESStr = (text: string, key = null) => {
  if (text.length < 32) {
    throw new Error(`Invalid encrypt string ${text}`);
  }
  const iv = leftString(text, 32);
  const content = rightString(text, text.length - 32);
  const decipher = createDecipheriv(
    ALGORITHM,
    key || "ENQudMWJ6AOKyWVTI28291WisR1Cluqb",
    Buffer.from(iv, "hex")
  );
  const decrypted = Buffer.concat([
    decipher.update(Buffer.from(content, "hex")),
    decipher.final()
  ]);

  return decrypted.toString();
};
