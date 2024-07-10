import * as https from "https";
import {Agent} from "undici";
import {PEACOM_CA, PEACOM_CERTIFICATE} from "./constant";

export const createHttpsServer = (app: any) => {
  const options = {
    key: PEACOM_CERTIFICATE.key,
    cert: PEACOM_CERTIFICATE.cert,
    ca: [PEACOM_CA]
  };
  return https.createServer(options, app);
};

export const sslAgent = new Agent({
  connect: {
    ca: [PEACOM_CA]
  }
})
