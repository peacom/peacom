import {Application} from "@peacom/model";
import {getApplicationBroadcastQueueName} from "@peacom/core";

describe('broadcast-queue.spec', () => {
  it('getApplicationBroadcastQueueName', () => {
    console.log(getApplicationBroadcastQueueName(Application.WECOM_CUSTOMER));
    console.log(getApplicationBroadcastQueueName(Application.TELEGRAM));
  })
})
