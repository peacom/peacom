import {FileInfo} from "../../FileInfo";


export enum WhatsappTemplateType {
  TEXT = 1,
  MEDIA = 2
}

export enum WhatsappTemplateButtonType {
  quick_reply = "quick_reply",
  url = "url"
}

export interface WhatsappTemplateButton {
  type: WhatsappTemplateButtonType
  data: string
}

export interface WhatsappTemplateParam {
  templateId: string,
  language?: string
  header?: Array<string>
  body?: Array<string>
  type: WhatsappTemplateType
  media?: FileInfo
  buttons?: Array<WhatsappTemplateButton>
}
