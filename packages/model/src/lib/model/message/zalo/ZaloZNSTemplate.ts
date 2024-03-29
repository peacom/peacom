
export interface ZaloZnsTemplateInfo {
  templateId: string | number
  templateName: string
  listParams: Array<ZaloZnsParam>,
  previewUrl: string
}

export interface ZaloZnsParam {
  name: string
  require: boolean
  type: 'STRING' | 'DATE' | 'NUMBER'
  maxLength: number
  minLength: number
  acceptNull: boolean
}

export interface ZaloZnsTemmplateParam {
  template: ZaloZnsTemplateInfo;
  templateInfo: ZaloZnsTemplateInfo;
  templateData: Array<{
    name: string,
    value?: string | number,
    param: ZaloZnsParam
  }>
}
