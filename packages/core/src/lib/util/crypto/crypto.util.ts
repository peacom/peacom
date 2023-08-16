import * as path from "path";
import * as fs from "fs";
import * as crypto from 'crypto'
import * as process from "process";
import {hasText} from "../string.util";

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
