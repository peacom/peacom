import {MESSAGE_TYPE, SuggestionActionType} from "@peacom/model";
import {GenerateUrlInput, GenerateUrlOutput, renderTemplateMessage} from "./template.util";
import {getUrlLink} from "../../model/url/Url";
import {v4} from 'uuid'

const generateUrl = async ({
                             urlOrigin,
                             redirectUrl,
                             generateType,
                             content,
                             type
                           }: GenerateUrlInput): Promise<GenerateUrlOutput> => new Promise((res, rej) => {
  const code = v4();
  /**
   * Depend on type, we process for
   * urlOrigin
   * urlLandingPage
   */
  return res({
    link: getUrlLink(code, generateType),
    url: {code, redirectUrl, content, type, click: 0, createdDate: new Date()}
  })
})

describe('template.util.spec.ts', () => {
  it('renderTemplateMessage', async () => {
    const generateUrl = async ({
                                 urlOrigin,
                                 redirectUrl,
                                 generateType,
                                 content,
                                 type
                               }: GenerateUrlInput): Promise<GenerateUrlOutput> => new Promise((res, rej) => {
      const code = v4();
      /**
       * Depend on type, we process for
       * urlOrigin
       * urlLandingPage
       */
      return res({
        link: getUrlLink(code, generateType),
        url: {code, redirectUrl, content, type, click: 0, createdDate: new Date()}
      })
    })

    const rs = await renderTemplateMessage({
      content: {
        type: MESSAGE_TYPE.TEXT,
        message: "This is {{a}} *500#"
      },
      answerKeys: {
        a: 'testing'
      },
      timezone: 'UTC',
      generateUrl
    })
    console.log(rs)
    const rs1 = await renderTemplateMessage({
      content: {
        type: MESSAGE_TYPE.TEXT,
        message: "This is {{a}} with short link https://google.com",
        templateMessageSuggestions: [{
          action: SuggestionActionType.OPEN_URL,
          text: 'abc',
          postbackData: 'http://peacom.co',
          tracking: true
        }],
        shortLink: true
      },
      answerKeys: {
        a: 'bacdef'
      },
      timezone: 'UTC',
      generateUrl
    })
    console.log(JSON.stringify(rs1))
  });
  it('renderTemplateMessage shortLink', async () => {
    const rs1 = await renderTemplateMessage({
      content: {
        type: MESSAGE_TYPE.TEXT,
        message: "{{{message}}}",
        templateMessageSuggestions: [{
          action: SuggestionActionType.OPEN_URL,
          text: 'abc',
          postbackData: 'http://peacom.co',
          tracking: true
        }],
        shortLink: true
      },
      answerKeys: {
        message: 'This is testing message with https://google.com'
      },
      timezone: 'UTC',
      generateUrl
    })
    console.log(JSON.stringify(rs1, null, 2))
  });
  it('renderTemplateMessage whatsapp template', async () => {
    const rs1 = await renderTemplateMessage({
      content: {
        "type": "fb_whatsapp_template",
        "source": 2,
        "context": {
          "bot": {"uri": ""},
          "bulk": {},
          "phone": "84935903392",
          "contact": {"name": "Huyen", "phone": "84935903392", "country": "", "language": null, "avatarUrl": ""},
          "customer": {},
          "extraData": {},
          "bulkContactId": "706561636f6d31323334353637383130276298b86b83899d6016728a1eb410e9"
        },
        "version": "2.0",
        "createVia": "WEB",
        "whatsappTemplateParam": {
          "body": [],
          "type": null,
          "buttons": [{
            "url": "https://dev-mmp.peacom.co/api/url/",
            "data": "3IcHoUicjWZBZEF4xjc5",
            "text": "Visit website Dynamic",
            "type": "URL",
            "index": 0,
            "urlType": "dynamic",
            "isTracking": true,
            "redirectUrl": "https://peacom.co/",
            "redirectUrlType": 1
          }],
          "language": "en_US",
          "createVia": "WEB",
          "templateId": "1253638009307046",
          "mediaMapping": {},
          "variableType": "NUMBER",
          "originalMedia": {},
          "facebookTemplate": {
            "id": "1253638009307046",
            "name": "testing_url",
            "status": "PENDING",
            "category": "MARKETING",
            "language": "en_US",
            "components": [{
              "text": "This is MMP testing URL",
              "type": "BODY",
              "example": {"body_text": [[]], "body_text_named_params": []}
            }, {
              "type": "BUTTONS",
              "buttons": [{
                "url": "https://dev-mmp.peacom.co/api/url/{{1}}",
                "text": "Visit website Dynamic",
                "type": "URL",
                "example": ["sample_variable"],
                "urlType": "dynamic",
                "isTracking": true,
                "urlExample": "https://dev-mmp.peacom.co/api/url/sample_variable",
                "redirectUrl": "https://peacom.co/",
                "redirectUrlType": 1
              }]
            }],
            "sub_category": "CUSTOM",
            "variableType": "NUMBER"
          }
        }
      },
      answerKeys: {
        message: 'This is testing message with https://google.com'
      },
      timezone: 'UTC',
      generateUrl
    })
    console.log(JSON.stringify(rs1, null, 2))
  });
})
