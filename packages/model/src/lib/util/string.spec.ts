import * as _ from 'lodash';
import {
  alphaNumericToString,
  filterNonAlphaNumeric,
  isNumberOnly,
  leftString, parseTemplate,
  renderTemplate, stringParamsReplace, templateMessageParamsReplace, valueParamsReplace
} from './';

describe('string.util', () => {
  it('isNumber', () => {
    const dateStr = '2022';
    expect(isNumberOnly(dateStr)).toBeTruthy();
    const notOnlyNumber = '2022a';
    expect(isNumberOnly(notOnlyNumber)).toBeFalsy();
  });
  it('leftString', () => {
    const dateStr = '2022';
    expect(leftString(dateStr, 5)).toHaveLength(4);
    expect(leftString(dateStr, 2)).toStrictEqual('20');
  });
  it('alphaNumericToListString html code', () => {
    expect(
      alphaNumericToString(
        '"41A&quot;. \'41B", &quot;41C&quot;'
      )
    ).toEqual(['41A', '41B', '41C']);
  });
  it('alphaNumericToListString 1', () => {
    expect(
      alphaNumericToString(
        '41\'A,41\'\'B,42C'
      )
    ).toEqual(['41A', '41B', '42C']);
  });
  it('alphaNumericToListString 2', () => {
    expect(
      alphaNumericToString(
        '41A 41\'\'B.42C/43d'
      )
    ).toEqual(['41A', '41B', '42C', '43d']);
  });
  it('alphaNumericToListString 3', () => {
    expect(
      alphaNumericToString(
        '39s'
      )
    ).toEqual(['39s']);
  });
  it('render template', () => {
    expect(renderTemplate('{{abc}} {{def}} {{a.b}}', {
      abc: 'testing',
      def: 'peacom', a: {b: "134"}
    })).toEqual('testing peacom 134');
  });
  it('render url', ()=>{
    console.log(renderTemplate('https://google.com?code={{{a.code}}}', {
      a: {code: '1234'}
    }))
  })

  it('render template', () => {
    console.log(renderTemplate('{{sms}}', {
      sms: '655 K1 S 19 43 32 24 30 02 S 38 05 22 21 31 39 S 10 53 03 09 06 16 S 23 52 42 01 51 26 S 06 02 06 48 40 07 S 13 42 48 03 27 17*655 K1 S 10 22 53 04 46 43 S 47 39 09 01 35 05 S 43 01 50 22 30 24 S 03 46 32 06 30 39'
    }));
  });
  it('render template date', () => {
    console.log(renderTemplate('{{#date}}YYYY-MM-DD HH:mm=Asia/Ho_Chi_Minh{{/date}}', {}));
  });
  it('render template date1', () => {
    console.log(renderTemplate('{{#date}}{{/date}}', {}));
  });
  it('render template now', () => {
    console.log(renderTemplate('{{now}}', {}));
  });
  it('filterNonAlphaNumeric', () => {
    console.log(filterNonAlphaNumeric('harmony 003', '_'));
  });

  it('parseMessage', () => {
    const message = '{{v1}} this is testing for template engine parse {{{v2}}} and {v3} and {{v1}}';
    console.log([...parseTemplate(message)]);
  });
  it('stringParamsReplace', () => {
    const message = '{{{startDate}}} 1 {{extraData.name_0}} this is testing for template engine parse {{{extraData.name_1}}}, {{{extraData.name_1}}}';
    const newMessage = stringParamsReplace(message, (i: number) => `[v${i}]`);
    console.log(newMessage);
  });
  it('templateMessageParamsReplace', () => {
    // text
    const rawMessageTex = {
      'templateName': 'test_1',
      'publicId': '111',
      'type': 'text',
      'tanla': {
        'erid': 'c8082c6b-ef26-4567-aab4-9074dee3be3d',
        'reqTime': '2025-06-24 02:11:42',
        'templateId': 'test_template_text'
      },
      'message': 'Hello Sir {{{extraData.name}}} ,\nPlease approve template.\nWe need test api. {{{extraData.name_1}}}        {{{startDate}}} ',
      'partnerId': 31,
      'rcsExpireOpts': { 'type': 'NONE', 'expireTime': '' },
      'telegramGatewayOpts': {},
      'templateMessageSuggestions': [
        {
          'text': 'hi {{{extraData.name}}}',
          'action': 'reply',
          'endDate': '',
          'endTime': '',
          'tracking': true,
          'startDate': '',
          'startTime': '',
          'webviewType': 'FULL',
          'postbackData': 'hi',
          'openUrlApplication': 'BROWSER'
        }, {
          'text': 'hello',
          'action': 'reply',
          'endDate': '',
          'endTime': '',
          'tracking': true,
          'startDate': '',
          'startTime': '',
          'webviewType': 'FULL',
          'postbackData': 'hello',
          'openUrlApplication': 'BROWSER'
        },
        {
          'action': 'CalendarEventAction',
          'postbackData': '23',
          'text': 'ac',
          'tracking': true,
          'startDate': '{{{startDate}}}',
          'startTime': '{{{startTime}}}',
          'endDate': '{{{endDate}}}',
          'endTime': '{{{endTime}}}',
          'openUrlApplication': 'BROWSER',
          'webviewType': 'FULL',
          'title': 'ok',
          'description': '323'
        }
      ]
    };
    // richCard
    const rawMessageRichcard = {
      'type': 'rich_card',
      'richCards': [{
        'id': 'cf95bf11-4061-43b6-b0a8-6fc8ff21b5f3',
        'image': 'https://ap-southeast-1-prod-peacom.s3.ap-southeast-1.amazonaws.com/files/VectorRCS_7bfff808f03942ecb84579cc8f509455.png',
        'title': '',
        'description': 'Hi  {{{extraData.name}}} 🌸\n\nWe’re giving you a 30% Healing Spa voucher to  {{{extraData.name_1}}} and recharge this weekend.\n\n💆‍♀️ Valid for any service\n🗓️ Use before: 12 Dec 2025\n📍 Healing Spa – Your sanctuary in the city\n\nTreat yourself — you’ve earned it 💖',
        'suggestions': [{
          'text': 'Book Appoinment',
          'action': 'reply',
          'endDate': '',
          'endTime': '',
          'tracking': true,
          'startDate': '',
          'startTime': '',
          'webviewType': 'FULL',
          'postbackData': 'Book Appoinment',
          'openUrlApplication': 'BROWSER'
        }]
      }],
      'rcsExpireOpts': { 'type': 'NONE' },
      'rcsRichCardsOpts': { 'type': 'STANDALONE', 'imageAlign': '', 'orientation': 'VERTICAL' },
      'telegramGatewayOpts': {}
    };
    const test = templateMessageParamsReplace(rawMessageRichcard, (i: number) => `[v${i}]`);
    console.log('test', JSON.stringify(test));
  });

  it('user context', () => {
    const params = [{
      'template': '{{{extraData.name}}}',
      'variable': 'extraData.name'
    }, { 'template': '{{{extraData.name_1}}}', 'variable': 'extraData.name_1' }, {
      'template': '{{{startDate}}}',
      'variable': 'startDate'
    }, { 'template': '{{{startTime}}}', 'variable': 'startTime' }, {
      'template': '{{{endTime}}}',
      'variable': 'endTime'
    }];
    const userContext = {
      '1': '1',
      'name': 'Nguyen Tan Duy',
      'age': '29',
      'country': 'VN',
      'startDate': '1234',
      extraData: {
        name: 'le'
      }
    } as any;
    const testValueParams = valueParamsReplace(userContext, params, (i: number) => `v${i}`);
    console.log(testValueParams);
  });
});
