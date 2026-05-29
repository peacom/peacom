/* eslint-disable @typescript-eslint/no-explicit-any */
import { URL_GENERATE_TYPE, URL_TYPE } from '../../model';
import { renderTemplate } from '../string.util';

function extractAllButtons(ui: any): Array<any> {
  const {
    components: { cards, buttons },
  } = ui;

  if (cards?.length) {
    return cards.flatMap((card: any) => card.buttons);
  }

  return buttons ?? [];
}

export async function renderWhatsappTemplate(
  template: any,
  answerKeys: Record<string, any>,
  generateUrlFunction: any,
  urls: any[]
) {
  const sendParams = template.sendParams;

  // answerKeys[key] -> inputted by user from api params
  // renderTemplate(sendParams[key], answerKeys) -> almost case come from web - when sendParams[sample] = "{{extraData.sample}}"
  // sendParams[key] -> use default value
  Object.keys(sendParams).forEach((key) => {
    sendParams[key] =
      answerKeys[key] ||
      renderTemplate(sendParams[key], answerKeys) ||
      sendParams[key];
  });

  const buttons = extractAllButtons(template.ui);

  for (let i = 0; i < buttons.length; i += 1) {
    const button = buttons[i];
    if (button.redirect_url) {
      const renderedUrl = renderTemplate(button.redirect_url, sendParams);
      const redirectUrlType = button['redirect_url_type'] ?? URL_TYPE.ORIGIN;
      const generateUrlType = URL_GENERATE_TYPE.REDIRECT;

      const generatedUrl = await generateUrlFunction({
        redirectUrl: renderedUrl,
        type: redirectUrlType,
        generateType: URL_GENERATE_TYPE.REDIRECT,
        urlOrigin: button.redirect_url,
        context: {},
      });

      if (generateUrlType) {
        urls.push(generatedUrl.url);
        sendParams[`mmp_tracking_code_${button.index ?? i}`] =
          generatedUrl.url.code;
      }
    }
  }

  // support ALIBABA OTP_CODE
  if (template.ui.category === 'AUTHENTICATION') {
    sendParams.verificationCode = sendParams.otp_code;
  }

  console.log(`answerKeys`, answerKeys);
  console.log(`sendParams`, sendParams);

  return template;
}
