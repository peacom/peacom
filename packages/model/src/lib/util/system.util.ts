import {hostname} from "node:os";

export const getHostName = () => {
  return hostname();
}
