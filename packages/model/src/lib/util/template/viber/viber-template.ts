import { renderTemplate, RenderTemplateMessageProp } from '@peacom/model';


// @ts-ignore
/**
 * Render Viber Template.
 *  - Mapping MMP Param to Viber Param
 *  - Render viber template
 * @param _content:
 * {
 *   "ttl": "21600",
 *   "type": "text",
 *   "richCards": [],
 *   "viberRateType": "TRANSACTIONAL",
 *   "viberTemplate": {
 *     "params": [
 *       {
 *         "name": "name",
 *         "type": "TEXT",
 *         "example": "Peter",
 *         "mmpMapping": "mmp_name"
 *       }
 *     ],
 *     "locales": [
 *       {
 *         "lang": "en",
 *         "template": "Hello {{name}}, test"
 *       }
 *     ],
 *     "templateId": "a42921a4-f301-4ebb-a1dc-d48f238ab9c7"
 *   },
 *   "viberDeviceType": "ALL",
 *   "viberRichCardType": null
 * }
 * @param answerKeys
 * @param timezone
 * @param generateUrl
 */
export const renderViberTemplate = ({
                                      content,
                                      answerKeys, // mmp params
                                      timezone,
                                      generateUrl
                                    }: RenderTemplateMessageProp) => {
  const rs = {
    params: {} as any,
    locales: [],
    content
  };
  const { viberTemplate } = content;
  const { params, locales } = viberTemplate;
  if (params.length > 0) {
    params.forEach((t: any) => {
      rs.params[`${t.name as string}`] = renderTemplate(t.mmpMapping, answerKeys);
      return;
    });
  }
  rs.content.viberTemplate.locales = locales.map((t: any) => {
    return {
      lang: t.lang,
      template: renderTemplate(t.template, rs.params)
    };
  });
  return rs;
};
