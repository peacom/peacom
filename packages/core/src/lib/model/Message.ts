export enum MESSAGE_STATUS {
  PENDING = 1,
  SUCCESS = 2,
  FAIL = 3,
  DELIVERED = 4,
  READ = 5,
}

export enum MESSAGE_TYPE {
  TEXT = "text",
  RICH_CARD = "rich_card",
  VIDEO = "video",
  PICTURE = "picture",
  FILE = "file",
  RICH_LINK = "richLink",
  LIST_PICKER = "listPicker",
  QUICK_REPLY = "quickReply",
}
