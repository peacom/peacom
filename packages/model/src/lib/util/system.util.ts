import {hostname} from "node:os";

//TODO: Should more to core package
export const getHostName = () => {
  return hostname();
}
