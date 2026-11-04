import * as https from "https";
import * as tls from "tls";
import {PEACOM_CA, PEACOM_CERTIFICATE} from "./constant";

export const createHttpsServer = (app: any) => {
  const options = {
    key: PEACOM_CERTIFICATE.key,
    cert: PEACOM_CERTIFICATE.cert,
    ca: [PEACOM_CA]
  };
  return https.createServer(options, app);
};

// getCACertificates / setDefaultCACertificates: Node >= 22.19 / 24.5, not yet in the installed @types/node
const nodeTls = tls as typeof tls & {
  getCACertificates?: (type?: "default" | "system" | "bundled" | "extra") => string[];
  setDefaultCACertificates?: (certs: ReadonlyArray<string>) => void;
};

let isPeacomCaInstalled = false;

/**
 * Trust PEACOM_CA for every TLS client of the process (global fetch included).
 * Replaces the former undici Agent passed as fetch dispatcher: an Agent from the undici package (8.x) mixed with
 * the undici bundled in Node (7.x) fails with "invalid onRequestStart method".
 */
export const installPeacomCA = () => {
  if (isPeacomCaInstalled) {
    return;
  }
  isPeacomCaInstalled = true;
  if (!nodeTls.setDefaultCACertificates || !nodeTls.getCACertificates) {
    console.warn(
      `[@peacom/core] Node ${process.version} has no tls.setDefaultCACertificates (Node >= 24.5 required): ` +
      `https calls to Peacom services will not trust PEACOM_CA`
    );
    return;
  }
  const defaultCAs = nodeTls.getCACertificates("default");
  if (!defaultCAs.includes(PEACOM_CA)) {
    nodeTls.setDefaultCACertificates([...defaultCAs, PEACOM_CA]);
  }
};
