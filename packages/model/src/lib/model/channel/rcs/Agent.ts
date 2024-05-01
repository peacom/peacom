import {AgentUseCase, BillingCategory, HostingRegion} from "@peacom/model";

export interface Agent {
  name: string
  displayName: string
}

export interface Phone {
  number: string
}

export interface PhoneEntry {
  phoneNumber: Phone
  label: string
}

export interface EmailEntry {
  address: string
  label: string
}

export interface WebEntry {
  uri: string
  label: string
}

export interface RcsBusinessMessagingAgentBillingConfig {
  billingCategory: BillingCategory
}

export interface RCSAgent {
  description: string
  logoUri: string,
  heroUri: string,
  phoneNumbers: Array<PhoneEntry>
  emails: Array<EmailEntry>
  websites: Array<WebEntry>
  privacy: WebEntry
  termsConditions: WebEntry
  color: string
  billingConfig: RcsBusinessMessagingAgentBillingConfig
  agentUseCase: AgentUseCase
  hostingRegion: HostingRegion
}
