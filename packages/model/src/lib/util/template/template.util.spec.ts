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
        message: "This is {{a}} *500#",
        isEnableShortLink: true
      },
      answerKeys: {
        bot: { uri: '' },
        phone: '84789811922',
        bulkContactId: 14369244,
        extraData: {
          website: 'https://vietlott.vn/vi/trung-thuong/ket-qua-trung-thuong/655.html'
        },
        bulk: { expiredDate: undefined },
        contact: {
          phone: '84789811922',
          name: 'hoa test',
          language: null,
          avatarUrl: '',
          country: ''
        }
      },
      timezone: 'UTC',
      generateUrl,
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
    try {
      const rs1 = await renderTemplateMessage({
        content: {
          type: MESSAGE_TYPE.TEXT,
          message: "{{message}}",
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
    } catch (e) {
      console.error(e)
    }

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
  it('renderTemplateMessage zalo template', async () => {
    const rs1 = await renderTemplateMessage({
      content: {

        "type": "zalo_zns_template",
        "source": 2,
        "zaloZnsTemplateParam": {
          "template": {
            "status": "ENABLE",
            "templateId": 473867,
            "createdTime": 1754019517400,
            "templateName": "Nhắc Hội viên tạo Mật khẩu",
            "templateQuality": "UNDEFINED"
          },
          "templateData": [
            {
              "name": "Name",
              "param": {
                "name": "Name",
                "type": "STRING",
                "require": true,
                "maxLength": 50,
                "minLength": 0,
                "acceptNull": false
              },
              "value": ""
            },
            {
              "name": "FFP_Num",
              "param": {
                "name": "FFP_Num",
                "type": "STRING",
                "require": true,
                "maxLength": 30,
                "minLength": 0,
                "acceptNull": false
              },
              "value": ""
            }
          ],
          "templateInfo": {
            "reason": "Template đã được duyệt",
            "status": "ENABLE",
            "timeout": 7200000,
            "listParams": [
              {
                "name": "Name",
                "type": "STRING",
                "require": true,
                "maxLength": 50,
                "minLength": 0,
                "acceptNull": false
              },
              {
                "name": "FFP_Num",
                "type": "STRING",
                "require": true,
                "maxLength": 30,
                "minLength": 0,
                "acceptNull": false
              }
            ],
            "previewUrl": "https://account.zalo.cloud/znspreview/haZ11H9fi7bhOZyGd_FJXw==",
            "templateId": 473867,
            "listButtons": [
              {
                "type": 0,
                "title": "Đặt mật khẩu  ngay",
                "content": "https://www.vietnamairlines.com/vn/vi/lotusmiles/forgot-password-new"
              }
            ],
            "templateTag": "CUSTOMER_CARE",
            "templateName": "Nhắc Hội viên tạo Mật khẩu",
            "templateQuality": "null",
            "applyTemplateQuota": false
          }
        },
        "context": {
          "Name": "Khoa",
          "FFP_Num": "123"
        }
      },
      answerKeys: {
        "Name": "Khoa",
        "FFP_Num": "123"
      },
      timezone: 'UTC',
      generateUrl
    })
    console.log(JSON.stringify(rs1, null, 2))
  });
})
