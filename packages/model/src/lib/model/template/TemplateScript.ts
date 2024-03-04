import {hasText, isNumberOnly} from "../../util/string.util";
import {isPhoneValid} from "../../util/phone.util";
import {
  MAPPING_OPERATOR,
  MAPPING_OPERATOR_TYPE,
  OperatorType,
  TEMPLATE_MESSAGE_SCRIPT_DATA_TYPE,
  TemplateMessageScriptOP
} from './Template'

const isPhone = (str: string) => {
  let rs = true;
  try {
    isPhoneValid(str);
  } catch (e) {
    rs = false;
  }
  return rs;
};

const SUPPORT_CONTEXT_FUNCTION = {
  hasText: hasText,
  [MAPPING_OPERATOR[TemplateMessageScriptOP.EMPTY]]: (str: any) => !hasText(str),
  isNumber: isNumberOnly,
  isNotNumber: (str: string) => !isNumberOnly(str),
  isNotPhone: (str: string) => !isPhone(str),
  isPhone
};

interface TemplateScriptProp {
  variable: string
  op: TemplateMessageScriptOP
  scriptData: string
  dataType: TEMPLATE_MESSAGE_SCRIPT_DATA_TYPE
}

const buildTemplateScript = ({variable, op, scriptData, dataType}: TemplateScriptProp) => {
  if (op !== TemplateMessageScriptOP.CUSTOM) {
    const data =
      dataType === TEMPLATE_MESSAGE_SCRIPT_DATA_TYPE.NUMBER
        ? scriptData
        : `"${scriptData}"`;
    if (MAPPING_OPERATOR_TYPE[op] === OperatorType.COMPARISON) {
      return `return this.${variable} ${MAPPING_OPERATOR[op]} ${data}`;
    }
    if (MAPPING_OPERATOR_TYPE[op] === OperatorType.FUNCTION_MULTIPLE_ARGS) {
      return `return this.${MAPPING_OPERATOR[op]}(this.${variable}, ${data})`;
    }
    return `return this.${MAPPING_OPERATOR[op]}(this.${variable})`;
  }
  return `return ${variable}`;
};

export const processTemplateScript = (
  {variable, op, scriptData, dataType}: TemplateScriptProp,
  context = {}
) => {
  const functionStr = buildTemplateScript({variable, op, scriptData, dataType});
  // console.log("processQuestionScript: ", functionStr, context);
  const runningContext = {
    ...context,
    ...SUPPORT_CONTEXT_FUNCTION,
    run: function run(str: string) {
      // eslint-disable-next-line no-new-func
      return new Function(str).bind(this);
    }
  };
  return runningContext.run(functionStr)();
};
