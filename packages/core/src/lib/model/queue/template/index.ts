import { Application, PARTNER } from '@peacom/model';
import { ViberTemplateQueue } from './ViberTemplateQueue';

export * from './ViberTemplateQueue';

export enum TemplateAction {
  CREATE, DELETE
}

const getTemplateViberQueueOut = (action: TemplateAction): ViberTemplateQueue => {
  switch (action) {
    case TemplateAction.CREATE:
      return ViberTemplateQueue.CREATE;
    case TemplateAction.DELETE:
      return ViberTemplateQueue.DELETE;
    default:
      return ViberTemplateQueue.CREATE;
  }
};

export const getTemplateOutQueue = (applicationId: Application, partner: PARTNER, action: TemplateAction) => {
  if (applicationId === Application.VIBER && partner === PARTNER.VIBER) {
    return getTemplateViberQueueOut(action);
  }
  return null;
};
