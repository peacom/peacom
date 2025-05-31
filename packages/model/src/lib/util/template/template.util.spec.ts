import {MESSAGE_TYPE, SuggestionActionType} from "@peacom/model";
import {GenerateUrlInput, GenerateUrlOutput, renderTemplateMessage} from "./template.util";
import {getUrlLink} from "../../model/url/Url";
import {v4} from 'uuid'

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
        message: "This is {{a}}"
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
        message: "This is {{a}}",
        templateMessageSuggestions: [{
          action: SuggestionActionType.OPEN_URL,
          text: 'abc',
          postbackData: 'http://peacom.co',
          tracking: true
        }]
      },
      answerKeys: {
        a: 'bacdef'
      },
      timezone: 'UTC',
      generateUrl
    })
    console.log(JSON.stringify(rs1))
  });
})
