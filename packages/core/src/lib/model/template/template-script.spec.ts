import {TEMPLATE_MESSAGE_SCRIPT_DATA_TYPE, TemplateMessageScriptOP, processTemplateScript} from "./";

describe('TemplateScript', () => {
  it("Test compare true/false", async () => {
    console.log(
      processTemplateScript(
        {
          variable: "test",
          op: TemplateMessageScriptOP.HAS_TEXT,
          scriptData: "true",
          dataType: TEMPLATE_MESSAGE_SCRIPT_DATA_TYPE.NUMBER
        },
        {test: '1234'}
      )
    );
  });
  it("Test is not number", async () => {
    expect(processTemplateScript(
      {
        variable: "test",
        op: TemplateMessageScriptOP.IS_NOT_NUMBER,
        scriptData: "",
        dataType: TEMPLATE_MESSAGE_SCRIPT_DATA_TYPE.NUMBER
      },
      {test: '1234'}
    )).toBeFalsy();
    expect(processTemplateScript(
      {
        variable: "test",
        op: TemplateMessageScriptOP.IS_NOT_NUMBER,
        scriptData: "",
        dataType: TEMPLATE_MESSAGE_SCRIPT_DATA_TYPE.NUMBER
      },
      {test: '1abcd'}
    )).toBeTruthy();
    expect(processTemplateScript(
      {
        variable: "test",
        op: TemplateMessageScriptOP.IS_NOT_NUMBER,
        scriptData: "",
        dataType: TEMPLATE_MESSAGE_SCRIPT_DATA_TYPE.NUMBER
      },
      {test: ''}
    )).toBeTruthy();
    expect(processTemplateScript(
      {
        variable: "test",
        op: TemplateMessageScriptOP.IS_NUMBER,
        scriptData: "",
        dataType: TEMPLATE_MESSAGE_SCRIPT_DATA_TYPE.NUMBER
      },
      {test: ''}
    )).toBeFalsy();
  });
  it("Test is phone number", async () => {
    expect(processTemplateScript(
      {
        variable: "test",
        op: TemplateMessageScriptOP.IS_PHONE,
        scriptData: "",
        dataType: TEMPLATE_MESSAGE_SCRIPT_DATA_TYPE.NUMBER
      },
      {test: '0938130683'}
    )).toBeTruthy();
  })
})
