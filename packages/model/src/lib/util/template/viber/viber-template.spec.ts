import { GenerateUrlInput, GenerateUrlOutput, Url, URL_TYPE } from '@peacom/model';
import { renderViberTemplate } from './viber-template';

describe('template.util.spec.ts', () => {
  it('renderTemplateMessage', async () => {
    const template = {
      'rawMessage': {
        'templateId': 160,
        'ttl': '21600',
        'type': 'text',
        'richCards': [],
        'viberRateType': 'TRANSACTIONAL',
        'viberTemplate': {
          'params': [
            {
              'name': 'name',
              'type': 'TEXT',
              'example': 'Peter',
              'mmpMapping': '{{mmp_name}}'
            }
          ],
          'locales': [
            {
              'lang': 'en',
              'template': 'Hello {{name}}, test'
            }
          ],
          'templateId': 'a42921a4-f301-4ebb-a1dc-d48f238ab9c7'
        },
        'viberDeviceType': 'ALL',
        'viberRichCardType': null,
        'message': 'Template error: Invalid template! Template should be a "string" but "undefined" was given as the first argument for mustache#render(template, view, partials)'
      },
      'publicId': 'da19871a-2de8-49f7-9eb6-c15781384246',
      'id': 198
    };
    console.log(JSON.stringify(renderViberTemplate({
      generateUrl(input: GenerateUrlInput): Promise<GenerateUrlOutput> {
        return Promise.resolve({
          url: {
            code: '',
            redirectUrl: '',
            createdDate: new Date(),
            content: {},
            type: URL_TYPE.LANDING_PAGE,
            click: 1
          } as Url,
          link: ''
        });
      }, timezone: '',
      content: template.rawMessage,
      answerKeys: {
        mmp_name: 'le canh'
      }
    }), null, 2));
  });
});
