import { FileInfo } from '../../FileInfo';

export enum WhatsappTemplateType {
  TEXT = 1,
  MEDIA = 2,
  LOCATION = 3,
}

export enum WhatsappTemplateButtonType {
  quick_reply = 'quick_reply',
  url = 'url',
}

export interface WhatsappTemplateButton {
  type: WhatsappTemplateButtonType;
  data: string;
}

export interface WhatsappTemplateParam {
  templateId: string;
  language?: string;
  header?: Array<string>;
  body?: Array<string>;
  type: WhatsappTemplateType;
  media?: FileInfo;
  location?: {
    latitude?: number;
    longitude?: number;
    name?: string;
    address?: string;
  };
  buttons?: Array<WhatsappTemplateButton>;
}

/**
 * @link https://developers.facebook.com/docs/whatsapp/business-management-api/message-templates/components#buttons
 */
export type Component = {
  type: 'BODY' | 'HEADER' | 'FOOTER' | 'BUTTONS';
  text: string;
  format: 'IMAGE' | 'DOCUMENT' | 'TEXT' | 'VIDEO' | 'LOCATION';
  example?: {
    header_handle?: string[];
    body_text?: string[][];
    header_text?: string[];
  };
  buttons?: {
    type: 'QUICK_REPLY' | 'URL' | 'PHONE_NUMBER';
    text: string;
    url?: string;
    phone_number?: string;
    example?: string[];
  }[];
};

export interface FacebookWhatsappTemplate {
  id: string;
  name: string;
  status?: string;
  category?: string;
  language?: string;
  components: Component[];
}

export interface WhatsappTemplate extends WhatsappTemplateParam {
  facebookTemplate?: FacebookWhatsappTemplate;
}
